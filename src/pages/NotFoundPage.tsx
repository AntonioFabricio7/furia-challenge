import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout hideFooter>
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl font-bold text-gray-900 mb-4">404</div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Página Não Encontrada</h1>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            A página que você está procurando não existe ou foi movida.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => navigate('/')}
              leftIcon={<Home size={18} />}
            >
              Voltar ao Início
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              leftIcon={<ArrowLeft size={18} />}
            >
              Voltar
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;