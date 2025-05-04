import React, { useState } from 'react';
import { User, EsportsProfile } from '../../types';
import Input from '../common/Input';
import Button from '../common/Button';
import Card, { CardContent } from '../common/Card';
import { generateId, validateUrl } from '../../utils/validators';
import { AlertCircle, CheckCircle2, X, ExternalLink, Gamepad2 } from 'lucide-react';

interface EsportsProfilesFormProps {
  user: Partial<User>;
  updateUser: (data: Partial<User>) => void;
}

const EsportsProfilesForm: React.FC<EsportsProfilesFormProps> = ({ user, updateUser }) => {
  const [esportsProfiles, setEsportsProfiles] = useState<EsportsProfile[]>(user.esportsProfiles || []);
  const [platform, setPlatform] = useState('');
  const [username, setUsername] = useState('');
  const [url, setUrl] = useState('');
  const [validating, setValidating] = useState(false);
  const [error, setError] = useState('');

  const availablePlatforms = [
    'Steam',
    'Epic Games',
    'Battle.net',
    'Faceit',
    'ESEA',
    'GamersClub',
    'League of Legends',
    'Valorant',
    'EA/Origin',
    'Ubisoft Connect',
    'PlayStation Network',
    'Xbox Live',
    'Nintendo Switch',
    'Outro'
  ];

  const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPlatform(e.target.value);
    setError('');
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setError('');
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setError('');
  };

  const validateEsportsProfile = () => {
    // Validation
    if (!platform) {
      setError('Por favor, selecione uma plataforma');
      return;
    }
    
    if (!username) {
      setError('Por favor, insira seu nome de usuário');
      return;
    }
    
    if (!url) {
      setError('Por favor, insira a URL do perfil');
      return;
    }
    
    if (!validateUrl(url)) {
      setError('Por favor, insira uma URL válida');
      return;
    }
    
    // Check if this platform is already connected
    if (esportsProfiles.some(profile => 
      profile.platform === platform && profile.username === username
    )) {
      setError(`Você já conectou esta conta de ${platform}`);
      return;
    }
    
    // Simulate validating esports profile
    setValidating(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      const newProfile: EsportsProfile = {
        id: generateId(),
        platform,
        username,
        url,
        status: 'pending'
      };
      
      const updatedProfiles = [...esportsProfiles, newProfile];
      setEsportsProfiles(updatedProfiles);
      updateUser({ esportsProfiles: updatedProfiles });
      
      // Reset form
      setPlatform('');
      setUsername('');
      setUrl('');
      
      // Simulate AI analysis after a delay
      setTimeout(() => {
        const analyzedProfiles = updatedProfiles.map(profile => {
          if (profile.id === newProfile.id) {
            return {
              ...profile,
              status: 'verified',
              relevanceScore: Math.floor(Math.random() * 100)
            };
          }
          return profile;
        });
        
        setEsportsProfiles(analyzedProfiles);
        updateUser({ esportsProfiles: analyzedProfiles });
      }, 2500);
      
      setValidating(false);
    }, 1500);
  };

  const removeEsportsProfile = (profileId: string) => {
    const updatedProfiles = esportsProfiles.filter(profile => profile.id !== profileId);
    setEsportsProfiles(updatedProfiles);
    updateUser({ esportsProfiles: updatedProfiles });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle2 size={16} className="text-green-500" />;
      case 'rejected':
        return <X size={16} className="text-red-500" />;
      case 'pending':
      case 'analyzing':
      default:
        return (
          <div className="w-4 h-4 relative flex items-center justify-center">
            <div className="absolute w-full h-full border-2 border-gray-400 border-t-green-500 rounded-full animate-spin"></div>
          </div>
        );
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'verified':
        return 'Verificado';
      case 'rejected':
        return 'Rejeitado';
      case 'analyzing':
        return 'Analisando';
      case 'pending':
        default:
        return 'Pendente';
    }
  };

  const getRelevanceColor = (score?: number) => {
    if (!score) return 'bg-gray-300';
    if (score >= 80) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Vincular Perfis de Esports</h3>
      <p className="text-gray-600 text-sm">
        Compartilhe seus perfis de jogos para nos ajudar a entender suas atividades em esports e validar sua identidade como fã dedicado.
      </p>
      
      <div className="border rounded-lg p-6 border-gray-300 bg-gray-50">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Plataforma de Jogos
          </label>
          <select
            value={platform}
            onChange={handlePlatformChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Selecione uma plataforma</option>
            {availablePlatforms.map(platform => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <Input
            label="Nome de Usuário/Gamertag"
            placeholder="Seu nome de usuário nesta plataforma"
            value={username}
            onChange={handleUsernameChange}
            fullWidth
          />
        </div>
        
        <div className="mb-4">
          <Input
            label="URL do Perfil"
            placeholder="https://exemplo.com/perfil"
            value={url}
            onChange={handleUrlChange}
            fullWidth
          />
        </div>
        
        <Button
          onClick={validateEsportsProfile}
          isLoading={validating}
          fullWidth
        >
          {validating ? 'Validando...' : 'Vincular Perfil'}
        </Button>
        
        {error && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <AlertCircle size={14} className="mr-1" />
            {error}
          </p>
        )}
      </div>
      
      {esportsProfiles.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Perfis de Jogos Vinculados</h4>
          <div className="space-y-3">
            {esportsProfiles.map((profile) => (
              <Card key={profile.id} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center mb-2 sm:mb-0">
                      <div className="text-gray-600 mr-3">
                        <Gamepad2 size={20} />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h5 className="text-sm font-medium text-gray-800 mr-2">
                            {profile.platform}
                          </h5>
                          <div className="flex items-center text-xs font-medium">
                            {getStatusIcon(profile.status)}
                            <span className="ml-1">{getStatusText(profile.status)}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">{profile.username}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <a
                        href={profile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-600 mr-3"
                        aria-label={`Visitar o perfil de ${profile.username}`}
                      >
                        <ExternalLink size={18} />
                      </a>
                      <button
                        onClick={() => removeEsportsProfile(profile.id)}
                        className="text-gray-400 hover:text-red-500"
                        aria-label={`Remover o perfil de ${profile.username}`}
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                  
                  {profile.status === 'verified' && profile.relevanceScore !== undefined && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex items-center">
                        <div className="flex-grow">
                          <p className="text-xs text-gray-500 mb-1">Pontuação de Relevância em Esports</p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                            <div
                              className={`h-2 rounded-full ${getRelevanceColor(profile.relevanceScore)}`}
                              style={{ width: `${profile.relevanceScore}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="ml-4">
                          <span className={`inline-block text-white text-xs font-medium px-2 py-0.5 rounded ${getRelevanceColor(profile.relevanceScore)}`}>
                            {profile.relevanceScore}%
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      <div className="border-t border-gray-200 pt-4 mt-6">
        <p className="text-sm text-gray-500">
          Vincular seus perfis de esports nos ajuda a validar sua atividade em jogos e engajamento com esports. Nosso sistema de IA analisa a relevância de seus perfis para esports e FURIA.
        </p>
      </div>
    </div>
  );
};

export default EsportsProfilesForm;