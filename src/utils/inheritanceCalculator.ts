import { Deceased, Heir, InheritanceResult, CalculationSummary } from '../types/inheritance';

export class InheritanceCalculator {
  private deceased: Deceased;
  private heirs: Heir[];

  constructor(deceased: Deceased, heirs: Heir[]) {
    this.deceased = deceased;
    this.heirs = heirs.filter(heir => heir.isAlive && heir.count > 0);
  }

  calculate(): CalculationSummary {
    const netEstate = this.calculateNetEstate();
    const results: InheritanceResult[] = [];
    const notes: string[] = [];

    // Step 1: Calculate fixed shares (Fara'id)
    const fixedShares = this.calculateFixedShares(netEstate);
    results.push(...fixedShares);

    // Step 2: Calculate Asabah (residuary heirs)
    const totalFixedAmount = fixedShares.reduce((sum, result) => sum + result.amount, 0);
    const remainingAmount = netEstate - totalFixedAmount;

    if (remainingAmount > 0) {
      const asabahResults = this.calculateAsabah(remainingAmount);
      results.push(...asabahResults);
    }

    // Step 3: Handle special cases and adjustments
    const adjustedResults = this.handleSpecialCases(results, netEstate);

    const totalDistributed = adjustedResults.reduce((sum, result) => sum + result.amount, 0);

    return {
      netEstate,
      totalDistributed,
      remainingAmount: netEstate - totalDistributed,
      results: adjustedResults,
      notes
    };
  }

  private calculateNetEstate(): number {
    return Math.max(0, this.deceased.totalEstate - this.deceased.debts - this.deceased.funeralExpenses - this.deceased.wasiyyah);
  }

  private calculateFixedShares(netEstate: number): InheritanceResult[] {
    const results: InheritanceResult[] = [];

    for (const heir of this.heirs) {
      const share = this.getFixedShare(heir);
      if (share > 0) {
        results.push({
          heir,
          share,
          amount: (share * netEstate),
          basis: this.getShareBasis(heir)
        });
      }
    }

    return results;
  }

  private getFixedShare(heir: Heir): number {
    const { relationship, gender, count } = heir;

    // Spouse shares
    if (relationship === 'spouse') {
      const hasChildren = this.hasDirectDescendants();
      if (gender === 'male') { // Husband
        return hasChildren ? 1/4 : 1/2;
      } else { // Wife
        return hasChildren ? 1/8 : 1/4;
      }
    }

    // Parent shares
    if (relationship === 'father') {
      const hasChildren = this.hasDirectDescendants();
      return hasChildren ? 1/6 : 0; // Father gets residue if no children
    }

    if (relationship === 'mother') {
      const hasChildren = this.hasDirectDescendants();
      const hasSiblings = this.hasSiblings();
      
      if (hasChildren || hasSiblings) {
        return 1/6;
      } else {
        return 1/3;
      }
    }

    // Children shares
    if (relationship === 'daughter') {
      const sons = this.getHeirsByRelationship('son');
      if (sons.length === 0) {
        // No sons present
        return count === 1 ? 1/2 : 2/3;
      }
      return 0; // Will be calculated in Asabah
    }

    // Sibling shares (when no direct descendants or father)
    if (!this.hasDirectDescendants() && !this.hasLivingFather()) {
      if (relationship === 'sister_full') {
        const brothersFull = this.getHeirsByRelationship('brother_full');
        if (brothersFull.length === 0) {
          return count === 1 ? 1/2 : 2/3;
        }
        return 0; // Will be calculated in Asabah
      }

      if (relationship === 'sister_paternal') {
        const brothersPaternal = this.getHeirsByRelationship('brother_paternal');
        const sistersFull = this.getHeirsByRelationship('sister_full');
        
        if (brothersPaternal.length === 0 && sistersFull.length === 0) {
          return count === 1 ? 1/2 : 2/3;
        }
        return 0;
      }

      if (relationship === 'brother_maternal' || relationship === 'sister_maternal') {
        const maternalSiblings = this.getMaternalSiblings();
        const totalMaternalSiblings = maternalSiblings.reduce((sum, heir) => sum + heir.count, 0);
        
        if (totalMaternalSiblings === 1) {
          return 1/6;
        } else if (totalMaternalSiblings > 1) {
          return 1/3 / totalMaternalSiblings;
        }
      }
    }

    // Grandparents
    if (relationship === 'grandfather_paternal' && !this.hasLivingFather()) {
      return this.hasDirectDescendants() ? 1/6 : 0;
    }

    if (relationship === 'grandmother_paternal' || relationship === 'grandmother_maternal') {
      if (!this.hasLivingMother()) {
        const grandmothers = this.getGrandmothers();
        return 1/6 / grandmothers.length;
      }
    }

    return 0;
  }

  private calculateAsabah(remainingAmount: number): InheritanceResult[] {
    const results: InheritanceResult[] = [];
    const asabahHeirs = this.getAsabahHeirs();

    if (asabahHeirs.length === 0) {
      return results;
    }

    // Calculate shares based on Asabah priority and gender ratios
    const totalShares = this.calculateAsabahShares(asabahHeirs);
    
    for (const heir of asabahHeirs) {
      const shares = this.getAsabahShareCount(heir);
      const amount = (shares / totalShares) * remainingAmount;
      
      results.push({
        heir,
        share: amount / (this.calculateNetEstate()),
        amount,
        basis: 'Asabah (Residuary Inheritance)'
      });
    }

    return results;
  }

  private getAsabahHeirs(): Heir[] {
    const asabahOrder = [
      'son',
      'son_of_son',
      'father',
      'grandfather_paternal',
      'brother_full',
      'brother_paternal',
      'uncle_paternal',
      'cousin_paternal'
    ];

    for (const relationship of asabahOrder) {
      const heirs = this.getHeirsByRelationship(relationship);
      if (heirs.length > 0) {
        // Include daughters with sons for Asabah
        if (relationship === 'son') {
          const daughters = this.getHeirsByRelationship('daughter');
          return [...heirs, ...daughters];
        }
        return heirs;
      }
    }

    return [];
  }

  private calculateAsabahShares(heirs: Heir[]): number {
    return heirs.reduce((total, heir) => {
      return total + this.getAsabahShareCount(heir);
    }, 0);
  }

  private getAsabahShareCount(heir: Heir): number {
    // Male gets 2 shares, female gets 1 share in Asabah
    const sharePerPerson = heir.gender === 'male' ? 2 : 1;
    return heir.count * sharePerPerson;
  }

  private handleSpecialCases(results: InheritanceResult[], netEstate: number): InheritanceResult[] {
    // Handle Awl (increase) and Radd (return) cases
    const totalAmount = results.reduce((sum, result) => sum + result.amount, 0);
    
    if (totalAmount > netEstate) {
      // Awl case - proportionally reduce shares
      const ratio = netEstate / totalAmount;
      return results.map(result => ({
        ...result,
        amount: result.amount * ratio,
        share: result.share * ratio
      }));
    }

    return results;
  }

  private hasDirectDescendants(): boolean {
    return this.getHeirsByRelationship('son').length > 0 || 
           this.getHeirsByRelationship('daughter').length > 0 ||
           this.getHeirsByRelationship('son_of_son').length > 0 ||
           this.getHeirsByRelationship('daughter_of_son').length > 0;
  }

  private hasLivingFather(): boolean {
    return this.getHeirsByRelationship('father').length > 0;
  }

  private hasLivingMother(): boolean {
    return this.getHeirsByRelationship('mother').length > 0;
  }

  private hasSiblings(): boolean {
    const siblingTypes = ['brother_full', 'sister_full', 'brother_paternal', 'sister_paternal', 'brother_maternal', 'sister_maternal'];
    return siblingTypes.some(type => this.getHeirsByRelationship(type).length > 0);
  }

  private getHeirsByRelationship(relationship: string): Heir[] {
    return this.heirs.filter(heir => heir.relationship === relationship);
  }

  private getMaternalSiblings(): Heir[] {
    return this.heirs.filter(heir => 
      heir.relationship === 'brother_maternal' || heir.relationship === 'sister_maternal'
    );
  }

  private getGrandmothers(): Heir[] {
    return this.heirs.filter(heir => 
      heir.relationship === 'grandmother_paternal' || heir.relationship === 'grandmother_maternal'
    );
  }

  private getShareBasis(heir: Heir): string {
    const basisMap: Record<string, string> = {
      'spouse': 'Quran 4:12',
      'father': 'Quran 4:11',
      'mother': 'Quran 4:11',
      'daughter': 'Quran 4:11',
      'sister_full': 'Quran 4:176',
      'sister_paternal': 'Quran 4:176',
      'brother_maternal': 'Quran 4:12',
      'sister_maternal': 'Quran 4:12',
      'grandmother_paternal': 'Hadith - Sahih',
      'grandmother_maternal': 'Hadith - Sahih'
    };

    return basisMap[heir.relationship] || 'Islamic Jurisprudence';
  }
}