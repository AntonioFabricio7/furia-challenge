import React, { useState } from 'react';
import { User, SocialProfile } from '../../types';
import Input from '../common/Input';
import Button from '../common/Button';
import Card, { CardContent } from '../common/Card';
import { generateId, validateUrl } from '../../utils/validators';
import { Instagram, Twitter, Twitch, Youtube, Facebook, CheckCircle2, X, ExternalLink, AlertCircle } from 'lucide-react';

interface SocialMediaFormProps {
  user: Partial<User>;
  updateUser: (data: Partial<User>) => void;
}

const SocialMediaForm: React.FC<SocialMediaFormProps> = ({ user, updateUser }) => {
  const [socialProfiles, setSocialProfiles] = useState<SocialProfile[]>(user.socialProfiles || []);
  const [platform, setPlatform] = useState('');
  const [username, setUsername] = useState('');
  const [url, setUrl] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState('');

  const availablePlatforms = [
    { id: 'instagram', name: 'Instagram', icon: <Instagram size={20} /> },
    { id: 'twitter', name: 'Twitter/X', icon: <Twitter size={20} /> },
    { id: 'facebook', name: 'Facebook', icon: <Facebook size={20} /> },
    { id: 'youtube', name: 'YouTube', icon: <Youtube size={20} /> },
    { id: 'twitch', name: 'Twitch', icon: <Twitch size={20} /> }
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

  const connectSocialProfile = () => {
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
    if (socialProfiles.some(profile => profile.platform === platform)) {
      setError(`Você já conectou sua conta de ${availablePlatforms.find(p => p.id === platform)?.name}`);
      return;
    }
    
    // Simulate connecting to social media
    setConnecting(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      const newProfile: SocialProfile = {
        id: generateId(),
        platform,
        username,
        url,
        connected: true,
        status: 'pending'
      };
      
      const updatedProfiles = [...socialProfiles, newProfile];
      setSocialProfiles(updatedProfiles);
      updateUser({ socialProfiles: updatedProfiles });
      
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
              insights: {
                engagement: Math.floor(Math.random() * 100),
                furiaInteractions: Math.floor(Math.random() * 50),
                esportsContent: Math.floor(Math.random() * 100)
              }
            };
          }
          return profile;
        });
        
        setSocialProfiles(analyzedProfiles);
        updateUser({ socialProfiles: analyzedProfiles });
      }, 3000);
      
      setConnecting(false);
    }, 1500);
  };

  const removeSocialProfile = (profileId: string) => {
    const updatedProfiles = socialProfiles.filter(profile => profile.id !== profileId);
    setSocialProfiles(updatedProfiles);
    updateUser({ socialProfiles: updatedProfiles });
  };

  const getPlatformIcon = (platformId: string) => {
    const platform = availablePlatforms.find(p => p.id === platformId);
    return platform ? platform.icon : <AlertCircle size={20} />;
  };

  const getPlatformName = (platformId: string) => {
    const platform = availablePlatforms.find(p => p.id === platformId);
    return platform ? platform.name : platformId;
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

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Conectar Redes Sociais</h3>
      <p className="text-gray-600 text-sm">
        Conecte suas contas de redes sociais para enriquecer seu perfil de fã. Isso nos ajuda a analisar suas interações com esports e oferecer experiências mais personalizadas.
      </p>
      
      <div className="border rounded-lg p-6 border-gray-300 bg-gray-50">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Plataforma Social
          </label>
          <select
            value={platform}
            onChange={handlePlatformChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Selecione uma plataforma</option>
            {availablePlatforms.map(platform => (
              <option key={platform.id} value={platform.id}>
                {platform.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <Input
            label="Nome de Usuário"
            placeholder="Seu nome de usuário nesta plataforma"
            value={username}
            onChange={handleUsernameChange}
            fullWidth
          />
        </div>
        
        <div className="mb-4">
          <Input
            label="URL do Perfil"
            placeholder="https://exemplo.com/usuario"
            value={url}
            onChange={handleUrlChange}
            fullWidth
          />
        </div>
        
        <Button
          onClick={connectSocialProfile}
          isLoading={connecting}
          fullWidth
        >
          {connecting ? 'Conectando...' : 'Conectar Conta'}
        </Button>
        
        {error && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <AlertCircle size={14} className="mr-1" />
            {error}
          </p>
        )}
      </div>
      
      {socialProfiles.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Contas Conectadas</h4>
          <div className="space-y-3">
            {socialProfiles.map((profile) => (
              <Card key={profile.id} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center mb-2 sm:mb-0">
                      <div className="text-gray-600 mr-3">
                        {getPlatformIcon(profile.platform)}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h5 className="text-sm font-medium text-gray-800 mr-2">
                            {getPlatformName(profile.platform)}
                          </h5>
                          <div className="flex items-center text-xs font-medium">
                            {getStatusIcon(profile.status)}
                            <span className="ml-1">{getStatusText(profile.status)}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">@{profile.username}</p>
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
                        onClick={() => removeSocialProfile(profile.id)}
                        className="text-gray-400 hover:text-red-500"
                        aria-label={`Remover o perfil de ${profile.username}`}
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                  
                  {profile.status === 'verified' && profile.insights && (
                    <div className="mt-3 pt-3 border-t border-gray-200 grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-xs text-gray-500">Engajamento</p>
                        <p className="font-semibold text-gray-700">{profile.insights.engagement}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Interações com FURIA</p>
                        <p className="font-semibold text-gray-700">{profile.insights.furiaInteractions}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Conteúdo de Esports</p>
                        <p className="font-semibold text-gray-700">{profile.insights.esportsContent}%</p>
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
          Conectar suas contas de redes sociais nos permite analisar suas interações com esports usando IA. Isso nos ajuda a entender seus interesses e engajamento com o conteúdo da FURIA.
        </p>
      </div>
    </div>
  );
};

export default SocialMediaForm;