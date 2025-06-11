import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import Card, { CardContent, CardHeader } from '../components/common/Card';
import { User as UserType } from '../types';
import { User, MapPin, Heart, FileText, Share2, Award, Edit3, LogOut } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<Partial<UserType> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user data from localStorage
    const userData = localStorage.getItem('userData');
    
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Redirect to registration if no user data found
      navigate('/cadastro');
    }
    
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('userData');
    
    // Redirect to home
    navigate('/');
  };

  if (loading) {
    return (
      <Layout title="Perfil" showBackButton>
        <div className="container mx-auto px-4 py-12 flex justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-green-500 rounded-full border-t-transparent"></div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout title="Perfil" showBackButton>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Nenhum Dado de Usuário Encontrado</h2>
            <p className="mb-6">Por favor, complete o cadastro para acessar seu perfil.</p>
            <Button onClick={() => navigate('/cadastro')}>Cadastrar Agora</Button>
          </div>
        </div>
      </Layout>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <Layout title="Meu Perfil" showBackButton>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile header */}
          <div className="bg-gray-900 text-white rounded-lg overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start">
                <div className="bg-gray-700 h-24 w-24 rounded-full flex items-center justify-center text-3xl font-bold mb-4 sm:mb-0 sm:mr-6">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'F'}
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl font-bold mb-2">{user.name || 'Fã da FURIA'}</h1>
                  <p className="text-gray-300 mb-2">{user.email || ''}</p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                    <span className="bg-green-500 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Fã Verificado
                    </span>
                    <span className="bg-gray-700 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Membro desde {formatDate(user.createdAt) || 'Hoje'}
                    </span>
                    {user.documents && user.documents.some(doc => doc.status === 'verified') && (
                      <span className="bg-blue-500 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Identidade Verificada
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:bg-opacity-10 mr-2"
                  onClick={() => navigate('/cadastro')}
                  leftIcon={<Edit3 size={16} />}
                >
                  Editar Perfil
                </Button>
                <Button
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:bg-opacity-10"
                  onClick={handleLogout}
                  leftIcon={<LogOut size={16} />}
                >
                  Sair
                </Button>
              </div>
            </div>
          </div>
          
          {/* Profile content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <User size={18} className="text-gray-500 mr-2" />
                  <h2 className="text-lg font-medium">Informações Pessoais</h2>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Nome Completo</p>
                    <p>{user.name || 'Não informado'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">E-mail</p>
                    <p>{user.email || 'Não informado'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">CPF</p>
                    <p>{user.cpf || 'Não informado'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Telefone</p>
                    <p>{user.phone || 'Não informado'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Data de Nascimento</p>
                    <p>{formatDate(user.birthdate) || 'Não informado'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <MapPin size={18} className="text-gray-500 mr-2" />
                  <h2 className="text-lg font-medium">Endereço</h2>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {user.address ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Rua e Número</p>
                      <p>{user.address.street} {user.address.number}</p>
                    </div>
                    {user.address.complement && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Complemento</p>
                        <p>{user.address.complement}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-500">Bairro</p>
                      <p>{user.address.neighborhood || 'Não informado'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Cidade/Estado</p>
                      <p>{user.address.city}, {user.address.state}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">CEP</p>
                      <p>{user.address.zipCode || 'Não informado'}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">Nenhum endereço informado</p>
                )}
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center">
                <Heart size={18} className="text-gray-500 mr-2" />
                <h2 className="text-lg font-medium">Interesses</h2>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {user.interests && user.interests.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                      {interest}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">Nenhum interesse informado</p>
              )}
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <FileText size={18} className="text-gray-500 mr-2" />
                  <h2 className="text-lg font-medium">Documentos</h2>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {user.documents && user.documents.length > 0 ? (
                  <div className="space-y-4">
                    {user.documents.map((document) => (
                      <div key={document.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{document.type}</p>
                          <p className="text-sm text-gray-500">Enviado em {formatDate(document.uploadDate)}</p>
                        </div>
                        <div className={`text-sm font-medium ${
                          document.status === 'verified' ? 'text-green-500' : 
                          document.status === 'rejected' ? 'text-red-500' : 'text-yellow-500'
                        }`}>
                          {document.status === 'verified' ? 'Verificado' : 
                           document.status === 'rejected' ? 'Rejeitado' : 'Pendente'}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">Nenhum documento enviado</p>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Award size={18} className="text-gray-500 mr-2" />
                  <h2 className="text-lg font-medium">Perfis de Esports</h2>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {user.esportsProfiles && user.esportsProfiles.length > 0 ? (
                  <div className="space-y-4">
                    {user.esportsProfiles.map((profile) => (
                      <div key={profile.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{profile.platform}</p>
                          <p className="text-sm text-gray-500">{profile.username}</p>
                        </div>
                        <div className="flex items-center">
                          {profile.relevanceScore !== undefined && (
                            <span className={`text-xs font-medium px-2 py-0.5 rounded mr-2 ${
                              profile.relevanceScore >= 80 ? 'bg-green-100 text-green-800' : 
                              profile.relevanceScore >= 50 ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {profile.relevanceScore}%
                            </span>
                          )}
                          <span className={`text-sm font-medium ${
                            profile.status === 'verified' ? 'text-green-500' : 
                            profile.status === 'rejected' ? 'text-red-500' : 'text-yellow-500'
                          }`}>
                            {profile.status === 'verified' ? 'Verificado' : 
                             profile.status === 'rejected' ? 'Rejeitado' : 'Pendente'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">Nenhum perfil de esports vinculado</p>
                )}
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center">
                <Share2 size={18} className="text-gray-500 mr-2" />
                <h2 className="text-lg font-medium">Redes Sociais</h2>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {user.socialProfiles && user.socialProfiles.length > 0 ? (
                <div className="space-y-4">
                  {user.socialProfiles.map((profile) => (
                    <div key={profile.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <div className="mb-2 sm:mb-0">
                        <p className="font-medium capitalize">{profile.platform}</p>
                        <p className="text-sm text-gray-500">@{profile.username}</p>
                      </div>
                      <div className="flex items-center">
                        <div className={`text-sm font-medium mr-4 ${
                          profile.status === 'verified' ? 'text-green-500' : 
                          profile.status === 'rejected' ? 'text-red-500' : 'text-yellow-500'
                        }`}>
                          {profile.status === 'verified' ? 'Verificado' : 
                           profile.status === 'rejected' ? 'Rejeitado' : 'Pendente'}
                        </div>
                        <a 
                          href={profile.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                        >
                          Ver Perfil
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">Nenhuma rede social conectada</p>
              )}
            </CardContent>
          </Card>
          
          <div className="text-center">
            <Button
              onClick={() => navigate('/painel')}
              className="mr-4"
            >
              Ver Painel
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/cadastro')}
              leftIcon={<Edit3 size={16} />}
            >
              Editar Perfil
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;