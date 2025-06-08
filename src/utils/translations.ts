export const translations = {
  en: {
    header: {
      title: "Islamic Inheritance Calculator",
      subtitle: "Calculate inheritance according to Islamic law (Shariah)",
      basedOn: "Based on Quran & Sunnah"
    },
    deceased: {
      title: "Deceased Information",
      gender: "Gender",
      male: "Male",
      female: "Female",
      totalEstate: "Total Estate Value",
      debts: "Outstanding Debts",
      funeralExpenses: "Funeral Expenses",
      wasiyyah: "Wasiyyah (Will/Bequest)",
      wasiyyahNote: "Maximum: {amount} - 1/3 of net estate",
      wasiyyahError: "Wasiyyah cannot exceed 1/3 of the net estate according to Islamic law",
      summary: "Estate Summary",
      totalEstateLabel: "Total Estate:",
      lessDebts: "Less: Debts:",
      lessFuneral: "Less: Funeral Expenses:",
      lessWasiyyah: "Less: Wasiyyah:",
      netEstate: "Net Inheritable Estate:"
    },
    heirs: {
      title: "Heirs Information",
      addHeirs: "Add Heirs",
      currentHeirs: "Current Heirs",
      gender: "Gender",
      husband: "Male (Husband)",
      wife: "Female (Wife)",
      count: "Count",
      isAlive: "Is Alive",
      categories: {
        immediate: "Immediate Family",
        parents: "Parents",
        children: "Children",
        siblings: "Siblings",
        grandparents: "Grandparents",
        grandchildren: "Grandchildren",
        extended: "Extended Family"
      },
      relationships: {
        spouse: "Spouse (Husband/Wife)",
        father: "Father",
        mother: "Mother",
        son: "Son",
        daughter: "Daughter",
        brother_full: "Full Brother",
        sister_full: "Full Sister",
        brother_paternal: "Paternal Half-Brother",
        sister_paternal: "Paternal Half-Sister",
        brother_maternal: "Maternal Half-Brother",
        sister_maternal: "Maternal Half-Sister",
        grandfather_paternal: "Paternal Grandfather",
        grandmother_paternal: "Paternal Grandmother",
        grandmother_maternal: "Maternal Grandmother",
        son_of_son: "Son of Son (Grandson)",
        daughter_of_son: "Daughter of Son (Granddaughter)",
        uncle_paternal: "Paternal Uncle",
        cousin_paternal: "Paternal Cousin"
      }
    },
    results: {
      title: "Inheritance Distribution",
      summary: "Distribution Summary",
      netEstate: "Net Estate:",
      totalDistributed: "Total Distributed:",
      remaining: "Remaining:",
      individualShares: "Individual Shares",
      share: "Share:",
      each: "each",
      basis: "Basis:",
      remainingTitle: "Remaining Estate",
      remainingText: "There is {amount} remaining in the estate. This may be distributed to the nearest male relatives (Asabah) or returned to the state treasury (Bayt al-Mal) according to Islamic jurisprudence.",
      importantNotes: "Important Notes",
      notes: [
        "This calculation follows the principles of Islamic inheritance law (Mirath)",
        "Debts and funeral expenses must be paid before distribution",
        "Wasiyyah (will) cannot exceed 1/3 of the net estate",
        "Consult with Islamic scholars for complex cases or verification",
        "Local laws may require additional considerations"
      ]
    },
    buttons: {
      calculate: "Calculate Inheritance",
      reset: "Reset"
    },
    education: {
      fixedShares: {
        title: "Fixed Shares (Fara'id)",
        description: "Certain heirs receive fixed portions as specified in the Quran, including spouses, parents, and in some cases, siblings and children."
      },
      residuary: {
        title: "Residuary Inheritance (Asabah)",
        description: "Male relatives inherit the remainder of the estate after fixed shares are distributed, following a specific order of priority."
      },
      principles: {
        title: "Islamic Principles",
        description: "The distribution follows divine guidance from the Quran and authentic Hadith, ensuring justice and wisdom in inheritance matters."
      }
    },
    footer: {
      disclaimer: "This calculator provides guidance based on Islamic inheritance law. For complex cases or legal matters, please consult with qualified Islamic scholars.",
      verse: "\"Allah instructs you concerning your children...\" - Quran 4:11"
    },
    placeholder: {
      ready: "Ready to Calculate",
      description: "Fill in the deceased information and add heirs to see the inheritance distribution."
    }
  },
  ar: {
    header: {
      title: "حاسبة الميراث الإسلامي",
      subtitle: "احسب الميراث وفقاً للشريعة الإسلامية",
      basedOn: "مبني على القرآن والسنة"
    },
    deceased: {
      title: "معلومات المتوفى",
      gender: "الجنس",
      male: "ذكر",
      female: "أنثى",
      totalEstate: "إجمالي قيمة التركة",
      debts: "الديون المستحقة",
      funeralExpenses: "مصاريف الجنازة",
      wasiyyah: "الوصية",
      wasiyyahNote: "الحد الأقصى: {amount} - ثلث صافي التركة",
      wasiyyahError: "لا يمكن أن تتجاوز الوصية ثلث صافي التركة وفقاً للشريعة الإسلامية",
      summary: "ملخص التركة",
      totalEstateLabel: "إجمالي التركة:",
      lessDebts: "ناقص: الديون:",
      lessFuneral: "ناقص: مصاريف الجنازة:",
      lessWasiyyah: "ناقص: الوصية:",
      netEstate: "صافي التركة القابلة للوراثة:"
    },
    heirs: {
      title: "معلومات الورثة",
      addHeirs: "إضافة الورثة",
      currentHeirs: "الورثة الحاليون",
      gender: "الجنس",
      husband: "ذكر (زوج)",
      wife: "أنثى (زوجة)",
      count: "العدد",
      isAlive: "على قيد الحياة",
      categories: {
        immediate: "الأسرة المباشرة",
        parents: "الوالدان",
        children: "الأطفال",
        siblings: "الأشقاء",
        grandparents: "الأجداد",
        grandchildren: "الأحفاد",
        extended: "الأسرة الممتدة"
      },
      relationships: {
        spouse: "الزوج/الزوجة",
        father: "الأب",
        mother: "الأم",
        son: "الابن",
        daughter: "البنت",
        brother_full: "الأخ الشقيق",
        sister_full: "الأخت الشقيقة",
        brother_paternal: "الأخ لأب",
        sister_paternal: "الأخت لأب",
        brother_maternal: "الأخ لأم",
        sister_maternal: "الأخت لأم",
        grandfather_paternal: "الجد لأب",
        grandmother_paternal: "الجدة لأب",
        grandmother_maternal: "الجدة لأم",
        son_of_son: "ابن الابن (الحفيد)",
        daughter_of_son: "بنت الابن (الحفيدة)",
        uncle_paternal: "العم",
        cousin_paternal: "ابن العم"
      }
    },
    results: {
      title: "توزيع الميراث",
      summary: "ملخص التوزيع",
      netEstate: "صافي التركة:",
      totalDistributed: "إجمالي الموزع:",
      remaining: "المتبقي:",
      individualShares: "الأنصبة الفردية",
      share: "النصيب:",
      each: "لكل واحد",
      basis: "الأساس:",
      remainingTitle: "التركة المتبقية",
      remainingText: "يوجد {amount} متبقي في التركة. قد يتم توزيعه على أقرب الأقارب الذكور (العصبة) أو إرجاعه إلى بيت المال وفقاً للفقه الإسلامي.",
      importantNotes: "ملاحظات مهمة",
      notes: [
        "هذا الحساب يتبع مبادئ قانون الميراث الإسلامي (الميراث)",
        "يجب دفع الديون ومصاريف الجنازة قبل التوزيع",
        "لا يمكن أن تتجاوز الوصية ثلث صافي التركة",
        "استشر العلماء المسلمين في الحالات المعقدة أو للتحقق",
        "قد تتطلب القوانين المحلية اعتبارات إضافية"
      ]
    },
    buttons: {
      calculate: "احسب الميراث",
      reset: "إعادة تعيين"
    },
    education: {
      fixedShares: {
        title: "الأنصبة المقدرة (الفرائض)",
        description: "يحصل بعض الورثة على أنصبة ثابتة كما هو محدد في القرآن، بما في ذلك الأزواج والوالدين وفي بعض الحالات الأشقاء والأطفال."
      },
      residuary: {
        title: "الميراث بالتعصيب (العصبة)",
        description: "يرث الأقارب الذكور ما تبقى من التركة بعد توزيع الأنصبة المقدرة، وفقاً لترتيب أولوية محدد."
      },
      principles: {
        title: "المبادئ الإسلامية",
        description: "يتبع التوزيع التوجيه الإلهي من القرآن والحديث الصحيح، مما يضمن العدالة والحكمة في أمور الميراث."
      }
    },
    footer: {
      disclaimer: "توفر هذه الحاسبة إرشادات مبنية على قانون الميراث الإسلامي. للحالات المعقدة أو الأمور القانونية، يرجى استشارة علماء مسلمين مؤهلين.",
      verse: "\"يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ...\" - القرآن 4:11"
    },
    placeholder: {
      ready: "جاهز للحساب",
      description: "املأ معلومات المتوفى وأضف الورثة لرؤية توزيع الميراث."
    }
  }
};