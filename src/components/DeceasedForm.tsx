import React from 'react';
import { Deceased } from '../types/inheritance';
import { useLanguage } from '../contexts/LanguageContext';
import { User, DollarSign } from 'lucide-react';

interface DeceasedFormProps {
  deceased: Deceased;
  onUpdateDeceased: (deceased: Deceased) => void;
}

export const DeceasedForm: React.FC<DeceasedFormProps> = ({ deceased, onUpdateDeceased }) => {
  const { t } = useLanguage();
  
  const updateField = (field: keyof Deceased, value: string | number) => {
    onUpdateDeceased({
      ...deceased,
      [field]: value
    });
  };

  const netEstate = Math.max(0, deceased.totalEstate - deceased.debts - deceased.funeralExpenses - deceased.wasiyyah);
  const maxWasiyyah = netEstate * (1/3);

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-6">
        <User className="w-6 h-6 text-islamic-600" />
        <h2 className="text-xl font-semibold text-gray-800">{t('deceased.title')}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('deceased.gender')}
          </label>
          <select
            value={deceased.gender}
            onChange={(e) => updateField('gender', e.target.value as 'male' | 'female')}
            className="input-field"
          >
            <option value="male">{t('deceased.male')}</option>
            <option value="female">{t('deceased.female')}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('deceased.totalEstate')}
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="number"
              min="0"
              step="0.01"
              value={deceased.totalEstate}
              onChange={(e) => updateField('totalEstate', parseFloat(e.target.value) || 0)}
              className="input-field pl-10"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('deceased.debts')}
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="number"
              min="0"
              step="0.01"
              value={deceased.debts}
              onChange={(e) => updateField('debts', parseFloat(e.target.value) || 0)}
              className="input-field pl-10"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('deceased.funeralExpenses')}
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="number"
              min="0"
              step="0.01"
              value={deceased.funeralExpenses}
              onChange={(e) => updateField('funeralExpenses', parseFloat(e.target.value) || 0)}
              className="input-field pl-10"
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('deceased.wasiyyah')}
            <span className="text-xs text-gray-500 ml-2">
              ({t('deceased.wasiyyahNote').replace('{amount}', `$${maxWasiyyah.toFixed(2)}`)})
            </span>
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="number"
              min="0"
              max={maxWasiyyah}
              step="0.01"
              value={deceased.wasiyyah}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                updateField('wasiyyah', Math.min(value, maxWasiyyah));
              }}
              className="input-field pl-10"
              placeholder="0.00"
            />
          </div>
          {deceased.wasiyyah > maxWasiyyah && (
            <p className="text-red-500 text-xs mt-1">
              {t('deceased.wasiyyahError')}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 p-4 bg-islamic-50 rounded-lg">
        <h3 className="font-medium text-islamic-800 mb-2">{t('deceased.summary')}</h3>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>{t('deceased.totalEstateLabel')}</span>
            <span>${deceased.totalEstate.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-red-600">
            <span>{t('deceased.lessDebts')}</span>
            <span>-${deceased.debts.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-red-600">
            <span>{t('deceased.lessFuneral')}</span>
            <span>-${deceased.funeralExpenses.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-red-600">
            <span>{t('deceased.lessWasiyyah')}</span>
            <span>-${deceased.wasiyyah.toFixed(2)}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-semibold text-islamic-800">
            <span>{t('deceased.netEstate')}</span>
            <span>${netEstate.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};