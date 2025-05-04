import React from 'react';
import { ArrowLeft, User, Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import FuriaLogo from '../common/FuriaLogo';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { name: 'Início', path: '/' },
    { name: 'Perfil', path: '/perfil' },
    { name: 'Painel', path: '/painel' },
    { name: 'Sobre', path: '/sobre' },
  ];

  return (
    <header className="bg-black text-white py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {showBackButton && (
            <button 
              onClick={handleBack}
              className="p-1 rounded-full hover:bg-gray-800 transition-colors"
              aria-label="Voltar"
            >
              <ArrowLeft size={24} />
            </button>
          )}
          
          {!showBackButton && (
            <div className="flex items-center" onClick={() => navigate('/')}>
              <FuriaLogo className="h-8 w-auto cursor-pointer" />
            </div>
          )}
          
          {title && <h1 className="text-xl font-bold ml-2">{title}</h1>}
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              onClick={(e) => {
                e.preventDefault();
                navigate(item.path);
              }}
              className={`text-sm font-medium hover:text-green-400 transition-colors ${
                location.pathname === item.path ? 'text-green-400' : ''
              }`}
            >
              {item.name}
            </a>
          ))}
          <button 
            onClick={() => navigate('/perfil')}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            aria-label="Perfil do usuário"
          >
            <User size={20} />
          </button>
        </div>
        
        <div className="md:hidden">
          <button 
            onClick={toggleMenu}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-black border-t border-gray-800 py-4 px-6 z-50">
          <nav className="flex flex-col space-y-4">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.path);
                  setIsMenuOpen(false);
                }}
                className={`text-sm font-medium hover:text-green-400 transition-colors ${
                  location.pathname === item.path ? 'text-green-400' : ''
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;