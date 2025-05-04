import React from 'react';
import { Instagram, Twitter, Twitch, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Portal do Fã FURIA</h3>
            <p className="text-gray-400 text-sm">
              A plataforma definitiva para se conectar com a FURIA e fazer parte da nossa comunidade global de fãs de esports.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">Início</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">Sobre</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">Times</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">Notícias</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">Termos de Serviço</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">Política de Cookies</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Siga-nos</h3>
            <div className="flex space-x-4">
              <a href="https://instagram.com/furiagg" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://twitter.com/furiagg" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
                <Twitter size={24} />
              </a>
              <a href="https://twitch.tv/furiatv" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
                <Twitch size={24} />
              </a>
              <a href="https://youtube.com/FURIATV" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
                <Youtube size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} FURIA Esports. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;