export const validateCPF = (cpf: string): boolean => {
  // Remove special characters
  const cleanCPF = cpf.replace(/[^\d]/g, "");
  
  // Check if it has 11 digits
  if (cleanCPF.length !== 11) return false;
  
  // Check if all digits are the same
  if (/^(\d)\1+$/.test(cleanCPF)) return false;
  
  // Validate first check digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let remainder = sum % 11;
  const digit1 = remainder < 2 ? 0 : 11 - remainder;
  
  if (parseInt(cleanCPF.charAt(9)) !== digit1) return false;
  
  // Validate second check digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  remainder = sum % 11;
  const digit2 = remainder < 2 ? 0 : 11 - remainder;
  
  return parseInt(cleanCPF.charAt(10)) === digit2;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const formatCPF = (cpf: string): string => {
  const cleanCPF = cpf.replace(/[^\d]/g, "");
  return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

export const formatPhone = (phone: string): string => {
  const cleanPhone = phone.replace(/[^\d]/g, "");
  return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
};

export const formatZipCode = (zipCode: string): string => {
  const cleanZipCode = zipCode.replace(/[^\d]/g, "");
  return cleanZipCode.replace(/(\d{5})(\d{3})/, "$1-$2");
};

export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const calculateProgress = (user: any, steps: string[]): number => {
  let completedSteps = 0;
  let totalSteps = steps.length;
  
  // Check if each step is completed
  if (user.name && user.email && user.cpf && user.birthdate) completedSteps++;
  if (user.address?.street && user.address?.city && user.address?.state) completedSteps++;
  if (user.interests && user.interests.length > 0) completedSteps++;
  if (user.documents && user.documents.length > 0) completedSteps++;
  if (user.socialProfiles && user.socialProfiles.length > 0) completedSteps++;
  if (user.esportsProfiles && user.esportsProfiles.length > 0) completedSteps++;
  
  return (completedSteps / totalSteps) * 100;
};