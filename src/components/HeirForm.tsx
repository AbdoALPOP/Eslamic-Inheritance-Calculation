import React from 'react';
import { Heir, RelationshipType } from '../types/inheritance';
import { useLanguage } from '../contexts/LanguageContext';
import { Plus, Minus, Users } from 'lucide-react';

interface HeirFormProps {
  heirs: Heir[];
  onUpdateHeirs: (heirs: Heir[]) => void;
}

const relationshipOptions: { value: RelationshipType; category: string }[] = [
  { value: 'spouse', category: 'immediate' },
  { value: 'father', category: 'parents' },
  { value: 'mother', category: 'parents' },
  { value: 'son', category: 'children' },
  { value: 'daughter', category: 'children' },
  { value: 'brother_full', category: 'siblings' },
  { value: 'sister_full', category: 'siblings' },
  { value: 'brother_paternal', category: 'siblings' },
  { value: 'sister_paternal', category: 'siblings' },
  { value: 'brother_maternal', category: 'siblings' },
  { value: 'sister_maternal', category: 'siblings' },
  { value: 'grandfather_paternal', category: 'grandparents' },
  { value: 'grandmother_paternal', category: 'grandparents' },
  { value: 'grandmother_maternal', category: 'grandparents' },
  { value: 'son_of_son', category: 'grandchildren' },
  { value: 'daughter_of_son', category: 'grandchildren' },
  { value: 'uncle_paternal', category: 'extended' },
  { value: 'cousin_paternal', category: 'extended' },
];

export const HeirForm: React.FC<HeirFormProps> = ({ heirs, onUpdateHeirs }) => {
  const { t } = useLanguage();
  
  const addHeir = (relationship: RelationshipType) => {
    const newHeir: Heir = {
      id: Date.now().toString(),
      relationship,
      gender: getDefaultGender(relationship),
      count: 1,
      isAlive: true,
    };
    onUpdateHeirs([...heirs, newHeir]);
  };

  const updateHeir = (id: string, updates: Partial<Heir>) => {
    const updatedHeirs = heirs.map(heir =>
      heir.id === id ? { ...heir, ...updates } : heir
    );
    onUpdateHeirs(updatedHeirs);
  };

  const removeHeir = (id: string) => {
    onUpdateHeirs(heirs.filter(heir => heir.id !== id));
  };

  const getDefaultGender = (relationship: RelationshipType): 'male' | 'female' => {
    const maleRelationships = ['father', 'son', 'brother_full', 'brother_paternal', 'brother_maternal', 'grandfather_paternal', 'son_of_son', 'uncle_paternal', 'cousin_paternal'];
    const femaleRelationships = ['mother', 'daughter', 'sister_full', 'sister_paternal', 'sister_maternal', 'grandmother_paternal', 'grandmother_maternal', 'daughter_of_son'];
    
    if (maleRelationships.includes(relationship)) return 'male';
    if (femaleRelationships.includes(relationship)) return 'female';
    return 'male'; // Default for spouse
  };

  const groupedOptions = relationshipOptions.reduce((acc, option) => {
    if (!acc[option.category]) {
      acc[option.category] = [];
    }
    acc[option.category].push(option);
    return acc;
  }, {} as Record<string, typeof relationshipOptions>);

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-6 h-6 text-islamic-600" />
        <h2 className="text-xl font-semibold text-gray-800">{t('heirs.title')}</h2>
      </div>

      {/* Add Heir Section */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-3">{t('heirs.addHeirs')}</h3>
        <div className="grid gap-4">
          {Object.entries(groupedOptions).map(([category, options]) => (
            <div key={category}>
              <h4 className="text-sm font-medium text-gray-600 mb-2">{t(`heirs.categories.${category}`)}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {options.map(option => (
                  <button
                    key={option.value}
                    onClick={() => addHeir(option.value)}
                    className="text-left p-3 border border-gray-200 rounded-lg hover:border-islamic-300 hover:bg-islamic-50 transition-colors duration-200"
                    disabled={heirs.some(heir => heir.relationship === option.value && ['father', 'mother', 'spouse'].includes(option.value))}
                  >
                    <span className="text-sm font-medium text-gray-800">{t(`heirs.relationships.${option.value}`)}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Heirs */}
      {heirs.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">{t('heirs.currentHeirs')}</h3>
          <div className="space-y-4">
            {heirs.map(heir => {
              const relationshipLabel = t(`heirs.relationships.${heir.relationship}`);
              
              return (
                <div key={heir.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-800">{relationshipLabel}</h4>
                    <button
                      onClick={() => removeHeir(heir.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {heir.relationship === 'spouse' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t('heirs.gender')}
                        </label>
                        <select
                          value={heir.gender}
                          onChange={(e) => updateHeir(heir.id, { gender: e.target.value as 'male' | 'female' })}
                          className="input-field"
                        >
                          <option value="male">{t('heirs.husband')}</option>
                          <option value="female">{t('heirs.wife')}</option>
                        </select>
                      </div>
                    )}
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('heirs.count')}
                      </label>
                      <input
                        type="number"
                        min="1"
                        max={heir.relationship === 'spouse' ? 4 : 20}
                        value={heir.count}
                        onChange={(e) => updateHeir(heir.id, { count: parseInt(e.target.value) || 1 })}
                        className="input-field"
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={heir.isAlive}
                          onChange={(e) => updateHeir(heir.id, { isAlive: e.target.checked })}
                          className="mr-2 h-4 w-4 text-islamic-600 focus:ring-islamic-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">{t('heirs.isAlive')}</span>
                      </label>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};