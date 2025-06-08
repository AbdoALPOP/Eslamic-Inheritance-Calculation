import React from 'react';
import { CalculationSummary } from '../types/inheritance';
import { useLanguage } from '../contexts/LanguageContext';
import { Calculator, BookOpen, AlertCircle } from 'lucide-react';

interface InheritanceResultsProps {
  results: CalculationSummary;
}

export const InheritanceResults: React.FC<InheritanceResultsProps> = ({ results }) => {
  const { t } = useLanguage();
  
  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;
  const formatPercentage = (share: number) => `${(share * 100).toFixed(2)}%`;

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-6 h-6 text-islamic-600" />
        <h2 className="text-xl font-semibold text-gray-800">{t('results.title')}</h2>
      </div>

      {/* Summary */}
      <div className="mb-6 p-4 bg-islamic-50 rounded-lg">
        <h3 className="font-semibold text-islamic-800 mb-3">{t('results.summary')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-600">{t('results.netEstate')}</span>
            <div className="font-semibold text-islamic-800">{formatCurrency(results.netEstate)}</div>
          </div>
          <div>
            <span className="text-gray-600">{t('results.totalDistributed')}</span>
            <div className="font-semibold text-islamic-800">{formatCurrency(results.totalDistributed)}</div>
          </div>
          <div>
            <span className="text-gray-600">{t('results.remaining')}</span>
            <div className={`font-semibold ${results.remainingAmount > 0 ? 'text-orange-600' : 'text-islamic-800'}`}>
              {formatCurrency(results.remainingAmount)}
            </div>
          </div>
        </div>
      </div>

      {/* Individual Results */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800">{t('results.individualShares')}</h3>
        {results.results.map((result, index) => {
          const label = t(`heirs.relationships.${result.heir.relationship}`);
          const countText = result.heir.count > 1 ? ` (${result.heir.count})` : '';

          return (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-gray-800">{label}{countText}</h4>
                  <p className="text-sm text-gray-600">{t('results.share')} {formatPercentage(result.share)}</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-islamic-600 text-lg">
                    {formatCurrency(result.amount)}
                  </div>
                  {result.heir.count > 1 && (
                    <div className="text-xs text-gray-500">
                      {formatCurrency(result.amount / result.heir.count)} {t('results.each')}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <BookOpen className="w-3 h-3" />
                <span>{t('results.basis')} {result.basis}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Warnings and Notes */}
      {results.remainingAmount > 0 && (
        <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-orange-800">{t('results.remainingTitle')}</h4>
              <p className="text-sm text-orange-700 mt-1">
                {t('results.remainingText').replace('{amount}', formatCurrency(results.remainingAmount))}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Important Notes */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">{t('results.importantNotes')}</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          {t('results.notes').map((note: string, index: number) => (
            <li key={index}>• {note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};