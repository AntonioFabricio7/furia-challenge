import React from 'react';
import { User, Document, SocialProfile, EsportsProfile } from '../../types';
import Card, { CardContent, CardHeader } from '../common/Card';
import { Shield, CheckCircle, Clock, X } from 'lucide-react';

interface SummaryFormProps {
  user: Partial<User>;
}

const SummaryForm: React.FC<SummaryFormProps> = ({ user }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getVerificationStatus = () => {
    const hasDocuments = user.documents && user.documents.length > 0;
    const hasSocialProfiles = user.socialProfiles && user.socialProfiles.length > 0;
    const hasEsportsProfiles = user.esportsProfiles && user.esportsProfiles.length > 0;
    
    const verifiedDocs = user.documents?.filter(doc => doc.status === 'verified').length || 0;
    const verifiedSocial = user.socialProfiles?.filter(profile => profile.status === 'verified').length || 0;
    const verifiedEsports = user.esportsProfiles?.filter(profile => profile.status === 'verified').length || 0;
    
    const hasVerifiedDocs = verifiedDocs > 0;
    const hasVerifiedSocial = verifiedSocial > 0;
    const hasVerifiedEsports = verifiedEsports > 0;
    
    if (hasVerifiedDocs && (hasVerifiedSocial || hasVerifiedEsports)) {
      return {
        status: 'verified',
        icon: <CheckCircle size={20} className="text-green-500" />,
        text: 'Verificado',
        class: 'text-green-500'
      };
    } else if (hasDocuments || hasSocialProfiles || hasEsportsProfiles) {
      return {
        status: 'pending',
        icon: <Clock size={20} className="text-yellow-500" />,
        text: 'Verificação Pendente',
        class: 'text-yellow-500'
      };
    } else {
      return {
        status: 'incomplete',
        icon: <X size={20} className="text-red-500" />,
        text: 'Incompleto',
        class: 'text-red-500'
      };
    }
  };

  const verificationStatus = getVerificationStatus();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center py-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center max-w-md">
          <Shield size={24} className="text-green-500 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-green-800">Resumo do Cadastro</h3>
            <p className="text-sm text-green-700">
              Obrigado por fornecer suas informações. Por favor, revise seus dados abaixo antes de concluir seu cadastro.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">Informações Pessoais</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Nome Completo</p>
                <p className="text-base">{user.name || 'Não informado'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">E-mail</p>
                <p className="text-base">{user.email || 'Não informado'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">CPF</p>
                <p className="text-base">{user.cpf || 'Não informado'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Telefone</p>
                <p className="text-base">{user.phone || 'Não informado'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Data de Nascimento</p>
                <p className="text-base">{formatDate(user.birthdate) || 'Não informado'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">Endereço</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {user.address ? (
                <>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Rua</p>
                    <p className="text-base">{user.address.street || 'Não informado'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Número</p>
                    <p className="text-base">{user.address.number || 'Não informado'}</p>
                  </div>
                  {user.address.complement && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Complemento</p>
                      <p className="text-base">{user.address.complement}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-500">Bairro</p>
                    <p className="text-base">{user.address.neighborhood || 'Não informado'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Cidade/Estado</p>
                    <p className="text-base">
                      {user.address.city || 'Não informado'}{user.address.city && user.address.state ? ', ' : ''}{user.address.state || ''}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">CEP</p>
                    <p className="text-base">{user.address.zipCode || 'Não informado'}</p>
                  </div>
                </>
              ) : (
                <p className="text-gray-500 italic">Nenhum endereço informado</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium">Interesses</h3>
        </CardHeader>
        <CardContent>
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">Documentos</h3>
          </CardHeader>
          <CardContent>
            {user.documents && user.documents.length > 0 ? (
              <div className="space-y-3">
                {user.documents.map((doc: Document) => (
                  <div key={doc.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{doc.type}</p>
                      <p className="text-xs text-gray-500">Enviado em {formatDate(doc.uploadDate)}</p>
                    </div>
                    <div className={`text-xs font-medium ${
                      doc.status === 'verified' ? 'text-green-500' : 
                      doc.status === 'rejected' ? 'text-red-500' : 'text-yellow-500'
                    }`}>
                      {doc.status === 'verified' ? 'Verificado' : 
                       doc.status === 'rejected' ? 'Rejeitado' : 'Pendente'}
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
            <h3 className="text-lg font-medium">Status de Verificação</h3>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              {verificationStatus.icon}
              <span className={`ml-2 font-medium ${verificationStatus.class}`}>
                {verificationStatus.text}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Documentos de Identidade</span>
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
                      : 'Não Informado'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Redes Sociais</span>
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
                      : 'Não Informado'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Perfis de Esports</span>
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
                      : 'Não Informado'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">Redes Sociais</h3>
          </CardHeader>
          <CardContent>
            {user.socialProfiles && user.socialProfiles.length > 0 ? (
              <div className="space-y-3">
                {user.socialProfiles.map((profile: SocialProfile) => (
                  <div key={profile.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{profile.platform}</p>
                      <p className="text-xs text-gray-500">@{profile.username}</p>
                    </div>
                    <div className={`text-xs font-medium ${
                      profile.status === 'verified' ? 'text-green-500' : 
                      profile.status === 'rejected' ? 'text-red-500' : 'text-yellow-500'
                    }`}>
                      {profile.status === 'verified' ? 'Verificado' : 
                       profile.status === 'rejected' ? 'Rejeitado' : 'Pendente'}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">Nenhuma rede social conectada</p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">Perfis de Esports</h3>
          </CardHeader>
          <CardContent>
            {user.esportsProfiles && user.esportsProfiles.length > 0 ? (
              <div className="space-y-3">
                {user.esportsProfiles.map((profile: EsportsProfile) => (
                  <div key={profile.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{profile.platform}</p>
                      <p className="text-xs text-gray-500">{profile.username}</p>
                    </div>
                    <div className="flex items-center">
                      {profile.relevanceScore !== undefined && (
                        <span className={`text-xs font-medium px-2 py-0.5 rounded mr-2 ${
                          profile.relevanceScore >= 80 ? 'bg-green-500 text-white' : 
                          profile.relevanceScore >= 50 ? 'bg-yellow-500 text-white' : 
                          'bg-red-500 text-white'
                        }`}>
                          {profile.relevanceScore}%
                        </span>
                      )}
                      <span className={`text-xs font-medium ${
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
      
      <div className="border-t border-gray-200 pt-4 text-center">
        <p className="text-sm text-gray-600">
          Ao concluir este cadastro, você concorda com nossos Termos de Serviço e Política de Privacidade.
          Suas informações serão usadas para melhorar sua experiência como fã da FURIA Esports.
        </p>
      </div>
    </div>
  );
};

export default SummaryForm;