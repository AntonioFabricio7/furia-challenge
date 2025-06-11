import React, { useState } from 'react';
import Input from '../common/Input';
import { MapPin, Building, Home, Navigation } from 'lucide-react';
import { User } from '../../types';
import { formatZipCode } from '../../utils/validators';

interface AddressFormProps {
  user: Partial<User>;
  updateUser: (data: Partial<User>) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ user, updateUser }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    // Format ZipCode (CEP)
    if (name === 'zipCode') {
      formattedValue = formatZipCode(value);
    }
    
    const address = user.address || {};
    
    updateUser({
      address: {
        ...address,
        [name]: formattedValue
      }
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'street':
      case 'neighborhood':
      case 'city':
      case 'state':
        if (!value.trim()) {
          newErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} é obrigatório`;
        } else {
          delete newErrors[name];
        }
        break;
        
      case 'number':
        if (!value.trim()) {
          newErrors.number = 'Número é obrigatório';
        } else {
          delete newErrors.number;
        }
        break;
        
      case 'zipCode':
        const cleanZipCode = value.replace(/[^\d]/g, '');
        if (!cleanZipCode) {
          newErrors.zipCode = 'CEP é obrigatório';
        } else if (cleanZipCode.length !== 8) {
          newErrors.zipCode = 'Por favor, insira um CEP válido';
        } else {
          delete newErrors.zipCode;
        }
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Seu Endereço</h3>
      <p className="text-gray-600 text-sm">
        Forneça suas informações de endereço para que possamos mantê-lo atualizado sobre eventos em sua região.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Rua"
          name="street"
          placeholder="Digite sua rua"
          value={user.address?.street || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.street}
          leftIcon={<MapPin size={18} />}
          fullWidth
          required
        />
        
        <Input
          label="Número"
          name="number"
          placeholder="Digite o número"
          value={user.address?.number || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.number}
          leftIcon={<Building size={18} />}
          fullWidth
          required
        />
        
        <Input
          label="Complemento"
          name="complement"
          placeholder="Apartamento, suíte, etc. (opcional)"
          value={user.address?.complement || ''}
          onChange={handleChange}
          leftIcon={<Home size={18} />}
          fullWidth
        />
        
        <Input
          label="Bairro"
          name="neighborhood"
          placeholder="Digite seu bairro"
          value={user.address?.neighborhood || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.neighborhood}
          leftIcon={<Navigation size={18} />}
          fullWidth
          required
        />
        
        <Input
          label="Cidade"
          name="city"
          placeholder="Digite sua cidade"
          value={user.address?.city || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.city}
          leftIcon={<Building size={18} />}
          fullWidth
          required
        />
        
        <Input
          label="Estado"
          name="state"
          placeholder="Digite seu estado"
          value={user.address?.state || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.state}
          leftIcon={<MapPin size={18} />}
          fullWidth
          required
        />
        
        <Input
          label="CEP"
          name="zipCode"
          placeholder="00000-000"
          value={user.address?.zipCode || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.zipCode}
          leftIcon={<MapPin size={18} />}
          fullWidth
          required
          maxLength={9}
        />
      </div>
      
      <div className="border-t border-gray-200 pt-4 mt-6">
        <p className="text-sm text-gray-500">
          Seu endereço será usado para notificá-lo sobre eventos da FURIA em sua região e para envio de produtos caso você compre merchandise.
        </p>
      </div>
    </div>
  );
};

export default AddressForm;