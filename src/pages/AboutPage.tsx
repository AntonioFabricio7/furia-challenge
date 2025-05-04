import React from 'react';
import Layout from '../components/layout/Layout';
import Card, { CardContent } from '../components/common/Card';
import { Award, Shield, Users, BarChart3 } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <Layout title="Sobre o Portal de Fãs da FURIA">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Sobre o Portal de Fãs da FURIA</h1>
            <p className="text-gray-600 text-lg">
              Construindo conexões mais fortes entre a FURIA e nossa comunidade global de fãs
            </p>
          </div>
          
          <div className="mb-12">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Nossa Missão</h2>
                <p className="text-gray-600 mb-6">
                  O Portal de Fãs da FURIA foi criado para nos ajudar a entender melhor e nos conectar com nossos apoiadores mais apaixonados. 
                  Ao coletar informações sobre seus interesses, engajamento e preferências, podemos criar experiências mais personalizadas 
                  e garantir que a FURIA continue representando e servindo nossa comunidade.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Por Que Criamos Isso</h3>
                <p className="text-gray-600 mb-6">
                  No mundo dos esports, os fãs estão no centro de tudo o que fazemos. O Portal de Fãs da FURIA nos ajuda a:
                </p>
                
                <ul className="list-disc pl-5 mb-6 text-gray-600 space-y-2">
                  <li>Conhecer melhor quem são nossos fãs e o que eles valorizam</li>
                  <li>Criar conteúdos e experiências mais relevantes</li>
                  <li>Conectar fãs com interesses semelhantes para construir uma comunidade</li>
                  <li>Recompensar nossos apoiadores mais dedicados com oportunidades especiais</li>
                  <li>Moldar o futuro da FURIA com base no feedback dos fãs</li>
                </ul>
                
                <h3 className="text-xl font-semibold mb-3">Como Funciona</h3>
                <p className="text-gray-600 mb-6">
                  O portal utiliza sistemas avançados de IA para verificar identidades, analisar interações em redes sociais 
                  e validar perfis de esports. Isso nos ajuda a criar uma comunidade segura enquanto coletamos informações valiosas 
                  sobre suas preferências e engajamento.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold mb-2">Coleta de Dados</h4>
                    <p className="text-gray-600 text-sm">
                      Coletamos informações básicas, documentos para verificação, links de redes sociais 
                      e perfis de esports para construir uma compreensão abrangente de nossos fãs.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold mb-2">Análise por IA</h4>
                    <p className="text-gray-600 text-sm">
                      Nossos sistemas de IA analisam seus dados para identificar padrões de engajamento, preferências de conteúdo 
                      e verificar sua identidade como um fã genuíno da FURIA.
                    </p>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3">Sua Privacidade é Importante</h3>
                <p className="text-gray-600">
                  Levamos sua privacidade a sério. Todos os dados são armazenados de forma segura, e você mantém controle sobre as 
                  informações que compartilha. Usamos medidas de segurança padrão da indústria para proteger suas informações pessoais 
                  e nunca compartilharemos seus dados com terceiros sem seu consentimento explícito.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Benefícios para os Fãs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="transform transition-transform hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <Award size={20} className="text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Acesso Exclusivo</h3>
                  </div>
                  <p className="text-gray-600">
                    Fãs verificados têm acesso antecipado a eventos, pré-vendas de produtos 
                    e conteúdos digitais especiais não disponíveis para o público geral.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="transform transition-transform hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <Users size={20} className="text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Comunidade</h3>
                  </div>
                  <p className="text-gray-600">
                    Conecte-se com outros fãs da FURIA que compartilham seus interesses, 
                    participe de eventos exclusivos para fãs e envolva-se em iniciativas comunitárias.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="transform transition-transform hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                      <BarChart3 size={20} className="text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Personalização</h3>
                  </div>
                  <p className="text-gray-600">
                    Receba conteúdos, notificações e ofertas adaptados aos seus 
                    interesses específicos, padrões de engajamento e nível de fã.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="transform transition-transform hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-yellow-100 p-3 rounded-full mr-4">
                      <Shield size={20} className="text-yellow-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Reconhecimento</h3>
                  </div>
                  <p className="text-gray-600">
                    Ganhe reconhecimento pelo seu apoio com emblemas especiais de fã, 
                    recompensas por lealdade e oportunidades de interagir com jogadores e equipe.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mb-12">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Perguntas Frequentes</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Meus dados estão seguros?</h3>
                    <p className="text-gray-600">
                      Sim, usamos medidas de segurança padrão da indústria para proteger suas informações pessoais. 
                      Todos os dados são criptografados e armazenados de forma segura. Nunca compartilharemos suas informações 
                      com terceiros sem seu consentimento explícito.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Por que vocês precisam dos meus documentos?</h3>
                    <p className="text-gray-600">
                      A verificação de documentos nos ajuda a garantir a segurança da nossa comunidade de fãs e prevenir 
                      fraudes. Usamos IA para verificar sua identidade enquanto protegemos sua privacidade.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">O que acontece quando vinculo minhas redes sociais?</h3>
                    <p className="text-gray-600">
                      Vincular suas contas de redes sociais nos permite analisar suas interações com o conteúdo da FURIA 
                      e entender melhor seus interesses em esports. Acessamos apenas informações públicas e nunca publicamos 
                      em seu nome.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Posso excluir meus dados?</h3>
                    <p className="text-gray-600">
                      Sim, você pode solicitar a exclusão da sua conta e de todos os dados associados a qualquer momento 
                      através das configurações do seu perfil.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Junte-se à Nossa Comunidade de Fãs</h2>
            <p className="text-gray-600 mb-6">
              Estamos animados para construir conexões mais fortes com nossos fãs e criar experiências 
              que realmente reflitam o que você valoriza. Junte-se ao Portal de Fãs da FURIA hoje!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;