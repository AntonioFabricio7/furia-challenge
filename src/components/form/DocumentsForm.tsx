import React, { useState } from 'react';
import { User, Document } from '../../types';
import { Upload, FileText, AlertCircle, X, CheckCircle2 } from 'lucide-react';
import Button from '../common/Button';
import Card, { CardContent } from '../common/Card';
import { generateId } from '../../utils/validators';

interface DocumentsFormProps {
  user: Partial<User>;
  updateUser: (data: Partial<User>) => void;
}

const DocumentsForm: React.FC<DocumentsFormProps> = ({ user, updateUser }) => {
  const [documents, setDocuments] = useState<Document[]>(user.documents || []);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const allowedDocumentTypes = [
    'Carteira de Identidade (RG)',
    'Carteira de Motorista (CNH)',
    'Passaporte',
    'Carteira Militar',
    'Carteira de Trabalho'
  ];

  const [selectedType, setSelectedType] = useState(allowedDocumentTypes[0]);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('O tamanho do arquivo excede o limite de 5MB');
      return;
    }
    
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      setError('Apenas arquivos JPEG, PNG e PDF são permitidos');
      return;
    }
    
    // Simulate upload
    setUploading(true);
    setError('');
    
    // Create a preview URL
    const fileUrl = URL.createObjectURL(file);
    
    // Simulate API call to verify document
    setTimeout(() => {
      const newDocument: Document = {
        id: generateId(),
        name: file.name,
        type: selectedType,
        status: 'pending',
        uploadDate: new Date().toISOString(),
        url: fileUrl
      };
      
      const updatedDocuments = [...documents, newDocument];
      setDocuments(updatedDocuments);
      updateUser({ documents: updatedDocuments });
      
      // Simulate AI verification after 2 seconds
      setTimeout(() => {
        const verifiedDocuments = updatedDocuments.map(doc => {
          if (doc.id === newDocument.id) {
            return {
              ...doc,
              status: 'verified'
            };
          }
          return doc;
        });
        
        setDocuments(verifiedDocuments);
        updateUser({ documents: verifiedDocuments });
      }, 2000);
      
      setUploading(false);
    }, 1500);
    
    // Clear the input
    e.target.value = '';
  };

  const removeDocument = (documentId: string) => {
    const updatedDocuments = documents.filter(doc => doc.id !== documentId);
    setDocuments(updatedDocuments);
    updateUser({ documents: updatedDocuments });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle2 size={16} className="text-green-500" />;
      case 'rejected':
        return <X size={16} className="text-red-500" />;
      case 'pending':
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
      case 'pending':
      default:
        return 'Processando';
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'verified':
        return 'text-green-500';
      case 'rejected':
        return 'text-red-500';
      case 'pending':
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Verificação de Documentos</h3>
      <p className="text-gray-600 text-sm">
        Faça upload de documentos oficiais para verificação de identidade. Isso nos ajuda a garantir a segurança da nossa comunidade de fãs.
      </p>
      
      <div className="border rounded-lg p-6 border-dashed border-gray-300 bg-gray-50">
        <div className="text-center mb-4">
          <FileText size={40} className="mx-auto text-gray-400 mb-2" />
          <h4 className="text-sm font-medium text-gray-700">Enviar Documento</h4>
          <p className="text-xs text-gray-500 mt-1">
            JPEG, PNG ou PDF, tamanho máximo de 5MB
          </p>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Documento
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {allowedDocumentTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mt-4">
          <div className="relative">
            <Button
              fullWidth
              variant="outline"
              className="border-2 border-gray-300"
              leftIcon={<Upload size={16} />}
              isLoading={uploading}
              onClick={() => document.getElementById('document-upload')?.click()}
            >
              {uploading ? 'Enviando...' : 'Selecionar Arquivo'}
            </Button>
            <input
              id="document-upload"
              type="file"
              className="hidden"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {error}
            </p>
          )}
        </div>
      </div>
      
      {documents.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Documentos Enviados</h4>
          <div className="space-y-3">
            {documents.map((document) => (
              <Card key={document.id} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText size={20} className="text-gray-500 mr-3" />
                      <div>
                        <h5 className="text-sm font-medium text-gray-800">{document.type}</h5>
                        <p className="text-xs text-gray-500 truncate max-w-[150px] sm:max-w-xs">
                          {document.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className={`flex items-center mr-4 ${getStatusClass(document.status)}`}>
                        {getStatusIcon(document.status)}
                        <span className="text-xs ml-1">{getStatusText(document.status)}</span>
                      </div>
                      <button
                        onClick={() => removeDocument(document.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remover documento"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      <div className="border-t border-gray-200 pt-4 mt-6">
        <p className="text-sm text-gray-500">
          A verificação de documentos usando IA nos ajuda a manter uma comunidade segura. Seus documentos são processados de forma segura e nunca compartilhados com terceiros.
        </p>
      </div>
    </div>
  );
};

export default DocumentsForm;