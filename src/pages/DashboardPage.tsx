import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Card, { CardContent, CardHeader } from '../components/common/Card';
import Button from '../components/common/Button';
import { User, SocialProfile, EsportsProfile, InsightData } from '../types';
import { 
  User as UserIcon, 
  CheckCircle2, 
  AlertTriangle, 
  Award, 
  Share2, 
  FileText, 
  Gamepad2, 
  BarChart3,
  PieChart,
  Calendar,
  ShoppingBag
} from 'lucide-react';

interface Match {
  opponent: string;
  tournament: string;
  date: string;
  time: string;
  type: string;
}

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<Partial<User> | null>(null);
  const [loading, setLoading] = useState(true);
  
  const upcomingMatches: Match[] = [
    {
      opponent: "Team Liquid",
      tournament: "ESL Pro League Temporada 20",
      date: "15/03/2025",
      time: "16:00",
      type: "CS2"
    },
    {
      opponent: "NAVI",
      tournament: "BLAST Premier Finais de Primavera",
      date: "20/03/2025",
      time: "14:30",
      type: "CS2"
    },
    {
      opponent: "Cloud9",
      tournament: "IEM Dallas 2025",
      date: "25/03/2025",
      time: "13:00",
      type: "CS2"
    }
  ];

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/cadastro');
    }
    
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <Layout title="Painel">
        <div className="container mx-auto px-4 py-12 flex justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-green-500 rounded-full border-t-transparent"></div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout title="Painel">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Nenhum Dado de Usuário Encontrado</h2>
            <p className="mb-6">Por favor, complete o cadastro para acessar seu painel.</p>
            <Button onClick={() => navigate('/cadastro')}>Cadastrar Agora</Button>
          </div>
        </div>
      </Layout>
    );
  }

  const calculateVerificationScore = () => {
    let score = 0;
    const total = 3;
    
    if (user.documents && user.documents.some(doc => doc.status === 'verified')) {
      score += 1;
    }
    
    if (user.socialProfiles && user.socialProfiles.some(profile => profile.status === 'verified')) {
      score += 1;
    }
    
    if (user.esportsProfiles && user.esportsProfiles.some(profile => profile.status === 'verified')) {
      score += 1;
    }
    
    return Math.round((score / total) * 100);
  };

  const generateEngagementData = () => {
    const platforms: SocialProfile[] = user.socialProfiles || [];
    
    if (platforms.length === 0 || !platforms.some(p => p.insights)) {
      return [
        { label: 'Redes Sociais', value: 25, color: 'bg-blue-500' },
        { label: 'Eventos', value: 30, color: 'bg-purple-500' },
        { label: 'Conteúdo', value: 20, color: 'bg-yellow-500' },
        { label: 'Merchandise', value: 25, color: 'bg-red-500' }
      ];
    }
    
    const engagementData: InsightData[] = [];
    
    platforms.forEach(platform => {
      if (platform.insights) {
        let color = 'bg-gray-500';
        
        switch (platform.platform) {
          case 'instagram':
            color = 'bg-purple-500';
            break;
          case 'twitter':
            color = 'bg-blue-500';
            break;
          case 'facebook':
            color = 'bg-blue-700';
            break;
          case 'youtube':
            color = 'bg-red-500';
            break;
          case 'twitch':
            color = 'bg-purple-600';
            break;
        }
        
        engagementData.push({
          label: platform.platform,
          value: platform.insights.engagement,
          color
        });
      }
    });
    
   

 return engagementData;
  };

  const getContentInterestData = () => {
    const interests = user.interests || [];
    
    if (interests.length === 0) {
      return [
        { label: 'CS2', value: 35, color: 'bg-green-500' },
        { label: 'Valorant', value: 25, color: 'bg-red-500' },
        { label: 'LOL', value: 20, color: 'bg-blue-500' },
        { label: 'Outros', value: 20, color: 'bg-gray-500' }
      ];
    }
    
    const contentData: InsightData[] = [];
    const colors = ['bg-green-500', 'bg-blue-500', 'bg-red-500', 'bg-yellow-500', 'bg-purple-500', 'bg-indigo-500'];
    
    interests.slice(0, 5).forEach((interest, index) => {
      contentData.push({
        label: interest,
        value: Math.floor(Math.random() * 30) + 10,
        color: colors[index % colors.length]
      });
    });
    
    if (interests.length > 5) {
      contentData.push({
        label: 'Outros',
        value: Math.floor(Math.random() * 20) + 5,
        color: 'bg-gray-500'
      });
    }
    
    return contentData;
  };

  const getEngagementScore = () => {
    const socialProfiles = user.socialProfiles || [];
    const esportsProfiles = user.esportsProfiles || [];
    
    let score = 0;
    let total = 0;
    
    socialProfiles.forEach(profile => {
      if (profile.insights) {
        score += profile.insights.engagement;
        score += profile.insights.furiaInteractions;
        total += 100;
        total += 50;
      }
    });
    
    esportsProfiles.forEach(profile => {
      if (profile.relevanceScore !== undefined) {
        score += profile.relevanceScore;
        total += 100;
      }
    });
    
    if (user.documents && user.documents.length > 0) {
      score += 50;
      total += 50;
    }
    
    if (user.interests && user.interests.length > 0) {
      score += Math.min(user.interests.length * 10, 50);
      total += 50;
    }
    
    return total > 0 ? Math.round((score / total) * 100) : 50;
  };

  const verificationScore = calculateVerificationScore();
  const engagementScore = getEngagementScore();
  const engagementData = generateEngagementData();
  const contentInterestData = getContentInterestData();

  const sortedEngagementData = [...engagementData].sort((a, b) => b.value - a.value);
  const sortedContentData = [...contentInterestData].sort((a, b) => b.value - a.value);

  return (
    <Layout title="Painel de Fã">
      <div className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">
                  Bem-vindo, {user.name?.split(' ')[0] || 'Fã'}!
                </h1>
                <p className="text-gray-300">
                  Aqui está uma visão geral do seu perfil de fã da FURIA e seu engajamento
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:bg-opacity-10"
                  onClick={() => navigate('/perfil')}
                  leftIcon={<UserIcon size={16} />}
                >
                  Ver Perfil
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="bg-gray-800 border-none text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Verificação</h3>
                    <div className="p-2 rounded-full bg-green-100">
                      <CheckCircle2 size={20} className="text-green-600" />
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-300">Verificado</span>
                      <span className="text-sm font-medium">{verificationScore}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          verificationScore >= 75 ? 'bg-green-500' : 
                          verificationScore >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${verificationScore}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    {verificationScore < 100 ? 'Conclua a verificação para desbloquear todos os benefícios' : 'Conta totalmente verificada'}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-none text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Nível de Fã</h3>
                    <div className="p-2 rounded-full bg-yellow-100">
                      <Award size={20} className="text-yellow-600" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-2">
                    {engagementScore < 30 ? 'Novato' : 
                     engagementScore < 60 ? 'Fã' : 
                     engagementScore < 80 ? 'Entusiasta' : 'Superfã'}
                  </div>
                  <div className="text-sm text-gray-400">
                    {engagementScore < 80 ? `${80 - engagementScore}% para alcançar o status de Superfã` : 'Você alcançou o maior nível de fã!'}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-none text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Engajamento</h3>
                    <div className="p-2 rounded-full bg-purple-100">
                      <BarChart3 size={20} className="text-purple-600" />
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-300">Pontuação de Atividade</span>
                      <span className="text-sm font-medium">{engagementScore}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-purple-500"
                        style={{ width: `${engagementScore}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    {engagementScore < 60 ? 'Aumente o engajamento conectando mais contas' : 'Ótimo engajamento com o conteúdo da FURIA!'}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium">Completude do Perfil</h2>
                  <div className="p-1.5 rounded-full bg-blue-100">
                    <UserIcon size={18} className="text-blue-600" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <FileText size={16} className="text-gray-500 mr-2" />
                        <span className="text-sm">Documentos de Identidade</span>
                      </div>
                      <span className={`text-xs font-medium ${
                        user.documents && user.documents.some(d => d.status === 'verified') 
                          ? 'text-green-500' 
                          : user.documents && user.documents.length > 0 
                            ? 'text-yellow-500' 
                            : 'text-red-500'
                      }`}>
                        {user.documents && user.documents.some(d => d.status === 'verified') 
                          ? 'Verificado' 
                          : user.documents && user.documents.length > 0 
                            ? 'Pendente' 
                            : 'Ausente'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${
                          user.documents && user.documents.some(d => d.status === 'verified') 
                            ? 'bg-green-500' 
                            : user.documents && user.documents.length > 0 
                              ? 'bg-yellow-500' 
                              : 'bg-red-500'
                        }`}
                        style={{ 
                          width: `${
                            user.documents && user.documents.some(d => d.status === 'verified') 
                              ? '100%' 
                              : user.documents && user.documents.length > 0 
                                ? '50%' 
                                : '0%'
                          }` 
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <Share2 size={16} className="text-gray-500 mr-2" />
                        <span className="text-sm">Redes Sociais</span>
                      </div>
                      <span className={`text-xs font-medium ${
                        user.socialProfiles && user.socialProfiles.some(p => p.status === 'verified') 
                          ? 'text-green-500' 
                          : user.socialProfiles && user.socialProfiles.length > 0 
                            ? 'text-yellow-500' 
                            : 'text-red-500'
                      }`}>
                        {user.socialProfiles && user.socialProfiles.some(p => p.status === 'verified') 
                          ? 'Verificado' 
                          : user.socialProfiles && user.socialProfiles.length > 0 
                            ? 'Pendente' 
                            : 'Ausente'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${
                          user.socialProfiles && user.socialProfiles.some(p => p.status === 'verified') 
                            ? 'bg-green-500' 
                            : user.socialProfiles && user.socialProfiles.length > 0 
                              ? 'bg-yellow-500' 
                              : 'bg-red-500'
                        }`}
                        style={{ 
                          width: `${
                            user.socialProfiles && user.socialProfiles.some(p => p.status === 'verified') 
                              ? '100%' 
                              : user.socialProfiles && user.socialProfiles.length > 0 
                                ? '50%' 
                                : '0%'
                          }` 
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <Gamepad2 size={16} className="text-gray-500 mr-2" />
                        <span className="text-sm">Perfis de Esports</span>
                      </div>
                      <span className={`text-xs font-medium ${
                        user.esportsProfiles && user.esportsProfiles.some(p => p.status === 'verified') 
                          ? 'text-green-500' 
                          : user.esportsProfiles && user.esportsProfiles.length > 0 
                            ? 'text-yellow-500' 
                            : 'text-red-500'
                      }`}>
                        {user.esportsProfiles && user.esportsProfiles.some(p => p.status === 'verified') 
                          ? 'Verificado' 
                          : user.esportsProfiles && user.esportsProfiles.length > 0 
                            ? 'Pendente' 
                            : 'Ausente'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${
                          user.esportsProfiles && user.esportsProfiles.some(p => p.status === 'verified') 
                            ? 'bg-green-500' 
                            : user.esportsProfiles && user.esportsProfiles.length > 0 
                              ? 'bg-yellow-500' 
                              : 'bg-red-500'
                        }`}
                        style={{ 
                          width: `${
                            user.esportsProfiles && user.esportsProfiles.some(p => p.status === 'verified') 
                              ? '100%' 
                              : user.esportsProfiles && user.esportsProfiles.length > 0 
                                ? '50%' 
                                : '0%'
                          }` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-3">Benefícios de Fã</h3>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className={`mt-0.5 ${
                        verificationScore >= 30 ? 'text-green-500' : 'text-gray-400'
                      }`}>
                        {verificationScore >= 30 ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                      </div>
                      <div className="ml-2">
                        <p className="text-sm font-medium">Newsletter da FURIA</p>
                        <p className="text-xs text-gray-500">Notícias e atualizações exclusivas</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className={`mt-0.5 ${
                        verificationScore >= 60 ? 'text-green-500' : 'text-gray-400'
                      }`}>
                        {verificationScore >= 60 ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                      </div>
                      <div className="ml-2">
                        <p className="text-sm font-medium">Pré-venda de Eventos</p>
                        <p className="text-xs text-gray-500">Acesso antecipado a ingressos</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className={`mt-0.5 ${
                        verificationScore >= 100 ? 'text-green-500' : 'text-gray-400'
                      }`}>
                        {verificationScore >= 100 ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                      </div>
                      <div className="ml-2">
                        <p className="text-sm font-medium">Descontos em Produtos</p>
                        <p className="text-xs text-gray-500">Preços especiais em itens da FURIA</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium">Insights de Fã</h2>
                  <div className="p-1.5 rounded-full bg-purple-100">
                    <PieChart size={18} className="text-purple-600" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Engajamento Social</h3>
                    {sortedEngagementData.length > 0 ? (
                      <div>
                        <div className="relative pt-1">
                          {sortedEngagementData.map((data, index) => (
                            <div key={index} className="mb-3">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-medium text-gray-700 capitalize">
                                  {data.label}
                                </span>
                                <span className="text-xs font-medium text-gray-700">{data.value}%</span>
                              </div>
                              <div className="flex h-2 overflow-hidden rounded bg-gray-200">
                                <div
                                  className={`${data.color}`}
                                  style={{ width: `${data.value}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500 italic">
                        Conecte contas sociais para ver seus dados de engajamento
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3">Interesses de Conteúdo</h3>
                    {sortedContentData.length > 0 ? (
                      <div>
                        <div className="relative pt-1">
                          {sortedContentData.map((data, index) => (
                            <div key={index} className="mb-3">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-medium text-gray-700">
                                  {data.label}
                                </span>
                                <span className="text-xs font-medium text-gray-700">{data.value}%</span>
                              </div>
                              <div className="flex h-2 overflow-hidden rounded bg-gray-200">
                                <div
                                  className={`${data.color}`}
                                  style={{ width: `${data.value}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500 italic">
                        Selecione interesses para ver preferências de conteúdo
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <h3 className="text-sm font-medium mb-3">Recomendações Personalizadas</h3>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Calendar size={16} className="text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Próximas Partidas</p>
                          {upcomingMatches.map((match, index) => (
                            <div key={index} className="mt-2">
                              <p className="text-xs text-gray-700 font-medium">
                                FURIA vs. {match.opponent} - {match.tournament}
                              </p>
                              <p className="text-xs text-gray-500">
                                {match.date} às {match.time} - {match.type}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <ShoppingBag size={16} className="text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Produtos Recomendados</p>
                        <p className="text-xs text-gray-500">Camisa Oficial FURIA Pro Player 2025</p>
                        <p className="text-xs text-green-600 font-medium">15% de desconto para fãs verificados</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500 mb-2">
              Complete seu perfil para personalizar sua experiência de fã
            </p>
            <Button
              variant="outline"
              onClick={() => navigate('/perfil')}
              leftIcon={<UserIcon size={16} />}
            >
              Atualizar Perfil
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;