import React, { useState } from 'react';
import { User } from '../../types';
import Button from '../common/Button';
import { Plus, X } from 'lucide-react';

interface InterestsFormProps {
  user: Partial<User>;
  updateUser: (data: Partial<User>) => void;
}

const InterestsForm: React.FC<InterestsFormProps> = ({ user, updateUser }) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(user.interests || []);
  const [customInterest, setCustomInterest] = useState('');
  const [error, setError] = useState('');

  // Common gaming and esports interests
  const predefinedInterests = [
    'Counter-Strike',
    'CS2',
    'League of Legends',
    'Dota 2',
    'Valorant',
    'Rainbow Six Siege',
    'Apex Legends',
    'Fortnite',
    'Call of Duty',
    'PUBG',
    'Rocket League',
    'FIFA',
    'Overwatch',
    'Hearthstone',
    'Teamfight Tactics',
    'StarCraft II',
    'World of Warcraft',
    'Jogos de Luta',
    'Jogos de Cartas Colecionáveis',
    'Esports Mobile',
    'Eventos de Esports',
    'Roupas da FURIA',
    'Hardware para Jogos',
    'Streaming',
    'Cosplay'
  ];

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => {
      if (prev.includes(interest)) {
        return prev.filter(i => i !== interest);
      } else {
        return [...prev, interest];
      }
    });
  };

  const addCustomInterest = () => {
    if (!customInterest.trim()) {
      setError('Por favor, insira um interesse');
      return;
    }
    
    if (customInterest.length < 2) {
      setError('O interesse deve ter pelo menos 2 caracteres');
      return;
    }
    
    if (selectedInterests.includes(customInterest)) {
      setError('Este interesse já foi adicionado');
      return;
    }
    
    setSelectedInterests(prev => [...prev, customInterest]);
    setCustomInterest('');
    setError('');
  };

  const removeInterest = (interest: string) => {
    setSelectedInterests(prev => prev.filter(i => i !== interest));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCustomInterest();
    }
  };

  // Update parent component when interests change
  React.useEffect(() => {
    updateUser({ interests: selectedInterests });
  }, [selectedInterests, updateUser]);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Seus Interesses em Jogos</h3>
      <p className="text-gray-600 text-sm">
        Selecione seus interesses em jogos e esports para nos ajudar a personalizar sua experiência como fã da FURIA.
      </p>
      
      <div className="mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Interesses Selecionados ({selectedInterests.length})</h4>
          
          {selectedInterests.length === 0 ? (
            <p className="text-gray-500 text-sm">Nenhum interesse selecionado ainda. Por favor, selecione pelo menos um interesse.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {selectedInterests.map(interest => (
                <div 
                  key={interest}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {interest}
                  <button 
                    onClick={() => removeInterest(interest)}
                    className="ml-2 text-green-700 hover:text-green-900"
                    aria-label={`Remover ${interest}`}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Adicionar Interesse Personalizado</h4>
        <div className="flex">
          <input
            type="text"
            value={customInterest}
            onChange={e => setCustomInterest(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite seu interesse"
            className={`flex-grow p-2 border ${
              error ? 'border-red-500' : 'border-gray-300'
            } rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500`}
          />
          <Button 
            onClick={addCustomInterest}
            className="rounded-l-none"
            leftIcon={<Plus size={16} />}
          >
            Adicionar
          </Button>
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
      
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Interesses Populares</h4>
        <div className="flex flex-wrap gap-2">
          {predefinedInterests.map(interest => (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedInterests.includes(interest)
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4 mt-6">
        <p className="text-sm text-gray-500">
          Seus interesses nos ajudam a entender quais conteúdos e eventos serão mais relevantes para você.
        </p>
      </div>
    </div>
  );
};

export default InterestsForm;