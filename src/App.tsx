import React, { useState } from 'react';
import { Deceased, Heir } from './types/inheritance';
import { InheritanceCalculator } from './utils/inheritanceCalculator';
import { DeceasedForm } from './components/DeceasedForm';
import { HeirForm } from './components/HeirForm';
import { InheritanceResults } from './components/InheritanceResults';
import { LanguageToggle } from './components/LanguageToggle';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { Calculator, Fuel as Mosque, Info } from 'lucide-react';

function AppContent() {
  const { t } = useLanguage();
  
  const [deceased, setDeceased] = useState<Deceased>({
    gender: 'male',
    totalEstate: 100000,
    debts: 0,
    funeralExpenses: 0,
    wasiyyah: 0
  });

  const [heirs, setHeirs] = useState<Heir[]>([]);
  const [showResults, setShowResults] = useState(false);

  const calculateInheritance = () => {
    if (heirs.length === 0) {
      alert('Please add at least one heir to calculate inheritance.');
      return;
    }

    setShowResults(true);
  };

  const calculator = new InheritanceCalculator(deceased, heirs);
  const results = showResults ? calculator.calculate() : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-islamic-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-islamic-100 rounded-lg">
                <Mosque className="w-8 h-8 text-islamic-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{t('header.title')}</h1>
                <p className="text-sm text-gray-600">{t('header.subtitle')}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Info className="w-4 h-4" />
                <span>{t('header.basedOn')}</span>
              </div>
              <LanguageToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Forms */}
          <div className="space-y-8">
            <DeceasedForm 
              deceased={deceased} 
              onUpdateDeceased={setDeceased} 
            />
            
            <HeirForm 
              heirs={heirs} 
              onUpdateHeirs={setHeirs} 
            />

            <div className="flex gap-4">
              <button
                onClick={calculateInheritance}
                className="btn-primary flex items-center gap-2 flex-1"
              >
                <Calculator className="w-4 h-4" />
                {t('buttons.calculate')}
              </button>
              
              {showResults && (
                <button
                  onClick={() => setShowResults(false)}
                  className="btn-secondary"
                >
                  {t('buttons.reset')}
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="lg:sticky lg:top-8">
            {showResults && results ? (
              <InheritanceResults results={results} />
            ) : (
              <div className="card text-center">
                <div className="py-12">
                  <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-500 mb-2">
                    {t('placeholder.ready')}
                  </h3>
                  <p className="text-gray-400">
                    {t('placeholder.description')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="font-semibold text-gray-800 mb-3">{t('education.fixedShares.title')}</h3>
            <p className="text-sm text-gray-600">
              {t('education.fixedShares.description')}
            </p>
          </div>
          
          <div className="card">
            <h3 className="font-semibold text-gray-800 mb-3">{t('education.residuary.title')}</h3>
            <p className="text-sm text-gray-600">
              {t('education.residuary.description')}
            </p>
          </div>
          
          <div className="card">
            <h3 className="font-semibold text-gray-800 mb-3">{t('education.principles.title')}</h3>
            <p className="text-sm text-gray-600">
              {t('education.principles.description')}
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p className="mb-2">
              {t('footer.disclaimer')}
            </p>
            <p>
              {t('footer.verse')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;