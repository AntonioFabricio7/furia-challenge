import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import Card, { CardContent } from '../components/common/Card';
import { ChevronRight, Users, LineChart, User, Shield } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="relative bg-black text-white">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"
          style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.5) 100%)' }}
        ></div>
        <img 
          src="https://s2-techtudo.glbimg.com/ZTlOU901e2YYIeVmP3N1_1C8ckg=/0x0:2048x1365/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2022/j/i/em4zewTBKDKIl2VkVoAg/0furia.jfif" 
          alt="Arena de esports" 
          className="w-full object-cover h-[500px]"
        />
        <div className="absolute inset-0 flex items-center z-20">
          <div className="container mx-auto px-6">
            <div className="max-w-lg">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                <span className="text-white">FURIA</span>
                <span className="text-green-500"> Portal do Fã</span>
              </h1>
              <p className="text-lg mb-8">
                Conecte-se com a FURIA, compartilhe sua paixão e desbloqueie experiências exclusivas para fãs. Junte-se à nossa comunidade global de entusiastas de esports.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/registro')}
                  rightIcon={<ChevronRight size={20} />}
                >
                  Começar Agora
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:bg-opacity-10"
                  onClick={() => navigate('/sobre')}
                >
                  Saiba Mais
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Por que se juntar ao Portal do Fã FURIA?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conecte-se com a FURIA como nunca antes e aproveite benefícios exclusivos como parte da nossa comunidade de fãs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="transform transition-transform hover:scale-105">
              <CardContent className="text-center p-6">
                <div className="bg-green-100 p-3 rounded-full inline-flex mb-4">
                  <Users size={24} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Conecte-se</h3>
                <p className="text-gray-600">
                  Junte-se a uma comunidade de fãs apaixonados da FURIA de todo o mundo
                </p>
              </CardContent>
            </Card>
            
            <Card className="transform transition-transform hover:scale-105">
              <CardContent className="text-center p-6">
                <div className="bg-green-100 p-3 rounded-full inline-flex mb-4">
                  <Shield size={24} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Acesso Exclusivo</h3>
                <p className="text-gray-600">
                  Tenha acesso antecipado a eventos, produtos e anúncios especiais
                </p>
              </CardContent>
            </Card>
            
            <Card className="transform transition-transform hover:scale-105">
              <CardContent className="text-center p-6">
                <div className="bg-green-100 p-3 rounded-full inline-flex mb-4">
                  <User size={24} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Personalizado</h3>
                <p className="text-gray-600">
                  Receba conteúdo personalizado baseado em seus interesses e engajamento
                </p>
              </CardContent>
            </Card>
            
            <Card className="transform transition-transform hover:scale-105">
              <CardContent className="text-center p-6">
                <div className="bg-green-100 p-3 rounded-full inline-flex mb-4">
                  <LineChart size={24} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Insights</h3>
                <p className="text-gray-600">
                  Obtenha insights sobre sua jornada como fã e engajamento com a FURIA
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Como Funciona</h2>
              <p className="text-gray-600 mb-6">
                Nosso portal de fãs foi projetado para ajudar a FURIA a entender melhor nossos fãs para que possamos criar experiências mais personalizadas e envolventes.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Crie Seu Perfil</h3>
                    <p className="text-gray-600">Compartilhe suas informações básicas e interesses</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Conecte Suas Contas</h3>
                    <p className="text-gray-600">Vincule suas redes sociais e perfis de jogos</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Verifique Sua Identidade</h3>
                    <p className="text-gray-600">Envie documentos para verificar sua identidade</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Aproveite os Benefícios</h3>
                    <p className="text-gray-600">Acesse conteúdo e experiências exclusivas</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button 
                  onClick={() => navigate('/registro')}
                  rightIcon={<ChevronRight size={20} />}
                >
                  Comece Agora
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <img 
                src="https://f.i.uol.com.br/fotografia/2021/11/17/16371524326194f6b067bbf_1637152432_3x2_xl.jpg" 
                alt="Experiência de fã FURIA" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;