import React, { useState } from 'react';
import Input from '../common/Input';
import { User, Mail, Phone, Calendar, Hash } from 'lucide-react';
import { User as UserType } from '../../types';
import { validateEmail, validateCPF, formatCPF, formatPhone } from '../../utils/validators';

interface PersonalInfoFormProps {
  user: Partial<UserType>;
  updateUser: (data: Partial<UserType>) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ user, updateUser }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    // Format CPF
    if (name === 'cpf') {
      formattedValue = formatCPF(value);
    }
    
    // Format phone
    if (name === 'phone') {
      formattedValue = formatPhone(value);
    }
    
    updateUser({ [name]: formattedValue });
    
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
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Nome é obrigatório';
        } else if (value.trim().length < 3) {
          newErrors.name = 'O nome deve ter pelo menos 3 caracteres';
        } else {
          delete newErrors.name;
        }
        break;
        
      case 'email':
        if (!value.trim()) {
          newErrors.email = 'E-mail é obrigatório';
        } else if (!validateEmail(value)) {
          newErrors.email = 'Por favor, insira um e-mail válido';
        } else {
          delete newErrors.email;
        }
        break;
        
      case 'cpf':
        const cleanCPF = value.replace(/[^\d]/g, '');
        if (!cleanCPF) {
          newErrors.cpf = 'CPF é obrigatório';
        } else if (!validateCPF(cleanCPF)) {
          newErrors.cpf = 'Por favor, insira um CPF válido';
        } else {
          delete newErrors.cpf;
        }
        break;
        
      case 'phone':
        const cleanPhone = value.replace(/[^\d]/g, '');
        if (!cleanPhone) {
          newErrors.phone = 'Telefone é obrigatório';
        } else if (cleanPhone.length < 10) {
          newErrors.phone = 'Por favor, insira um número de telefone válido';
        } else {
          delete newErrors.phone;
        }
        break;
        
      case 'birthdate':
        if (!value) {
          newErrors.birthdate = 'Data de nascimento é obrigatória';
        } else {
          const birthDate = new Date(value);
          const today = new Date();
          const minAgeDate = new Date();
          minAgeDate.setFullYear(today.getFullYear() - 13); // Minimum age 13
          
          if (birthDate > today) {
            newErrors.birthdate = 'A data de nascimento não pode ser no futuro';
          } else if (birthDate > minAgeDate) {
            newErrors.birthdate = 'Você deve ter pelo menos 13 anos';
          } else {
            delete newErrors.birthdate;
          }
        }
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Informações Pessoais</h3>
      <p className="text-gray-600 text-sm">
        Forneça suas informações pessoais básicas para criar seu perfil de fã da FURIA.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nome Completo"
          name="name"
          placeholder="Digite seu nome completo"
          value={user.name || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
          leftIcon={<User size={18} />}
          fullWidth
          required
        />
        
        <Input
          label="E-mail"
          name="email"
          type="email"
          placeholder="Digite seu e-mail"
          value={user.email || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          leftIcon={<Mail size={18} />}
          fullWidth
          required
        />
        
        <Input
          label="CPF"
          name="cpf"
          placeholder="000.000.000-00"
          value={user.cpf || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.cpf}
          leftIcon={<Hash size={18} />}
          fullWidth
          required
          maxLength={14}
        />
        
        <Input
          label="Telefone"
          name="phone"
          placeholder="(00) 00000-0000"
          value={user.phone || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.phone}
          leftIcon={<Phone size={18} />}
          fullWidth
          required
          maxLength={15}
        />
        
        <Input
          label="Data de Nascimento"
          name="birthdate"
          type="date"
          value={user.birthdate || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.birthdate}
          leftIcon={<Calendar size={18} />}
          fullWidth
          required
        />
      </div>
      
      <div className="border-t border-gray-200 pt-4 mt-6">
        <p className="text-sm text-gray-500">
          Valorizamos sua privacidade. Suas informações pessoais serão usadas de acordo com nossa política de privacidade.
        </p>
      </div>
    </div>
  );
};

export default PersonalInfoForm;