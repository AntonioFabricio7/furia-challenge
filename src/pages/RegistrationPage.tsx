import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Card, { CardContent, CardHeader, CardFooter } from '../components/common/Card';
import Button from '../components/common/Button';
import ProgressBar from '../components/common/ProgressBar';
import FormSteps from '../components/form/FormSteps';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { User, FormStep } from '../types';
import { calculateProgress } from '../utils/validators';

// Import step components
import PersonalInfoForm from '../components/form/PersonalInfoForm';
import AddressForm from '../components/form/AddressForm';
import InterestsForm from '../components/form/InterestsForm';
import DocumentsForm from '../components/form/DocumentsForm';
import SocialMediaForm from '../components/form/SocialMediaForm';
import EsportsProfilesForm from '../components/form/EsportsProfilesForm';
import SummaryForm from '../components/form/SummaryForm';

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<FormStep>('personal');
  const [completedSteps, setCompletedSteps] = useState<FormStep[]>([]);
  const [user, setUser] = useState<Partial<User>>({
    interests: [],
    events: [],
    purchases: [],
    documents: [],
    socialProfiles: [],
    esportsProfiles: []
  });
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const steps: FormStep[] = [
    'personal',
    'address',
    'interests',
    'documents',
    'social',
    'esports',
    'summary'
  ];

  useEffect(() => {
    // Calculate and update progress
    const newProgress = calculateProgress(user, steps);
    setProgress(newProgress);
  }, [user, steps]);

  const handleNext = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1];
      setCurrentStep(nextStep);
      
      // Mark current step as completed if not already
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
    }
  };

  const handlePrevious = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      const prevStep = steps[currentIndex - 1];
      setCurrentStep(prevStep);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate API call to save user data
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Save to local storage as a simple persistence method
    localStorage.setItem('userData', JSON.stringify(user));
    
    setIsLoading(false);
    
    // Navigate to dashboard
    navigate('/painel');
  };

  const updateUser = (data: Partial<User>) => {
    setUser(prevUser => ({
      ...prevUser,
      ...data
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'personal':
        return <PersonalInfoForm user={user} updateUser={updateUser} />;
      case 'address':
        return <AddressForm user={user} updateUser={updateUser} />;
      case 'interests':
        return <InterestsForm user={user} updateUser={updateUser} />;
      case 'documents':
        return <DocumentsForm user={user} updateUser={updateUser} />;
      case 'social':
        return <SocialMediaForm user={user} updateUser={updateUser} />;
      case 'esports':
        return <EsportsProfilesForm user={user} updateUser={updateUser} />;
      case 'summary':
        return <SummaryForm user={user} />;
      default:
        return null;
    }
  };

  const isFirstStep = currentStep === steps[0];
  const isLastStep = currentStep === steps[steps.length - 1];

  return (
    <Layout title="Junte-se ao Portal de Fãs da FURIA" showBackButton={false}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Cadastre-se como Fã da FURIA</h2>
                <div className="text-sm text-gray-500">Etapa {steps.indexOf(currentStep) + 1} de {steps.length}</div>
              </div>
              <ProgressBar value={progress} className="mt-4" showLabel size="sm" />
            </CardHeader>
            
            <CardContent className="pb-6">
              <FormSteps currentStep={currentStep} completedSteps={completedSteps} />
              
              <div className="mb-6">
                {renderStepContent()}
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={isFirstStep}
                leftIcon={<ChevronLeft size={16} />}
              >
                Anterior
              </Button>
              
              {isLastStep ? (
                <Button
                  onClick={handleSubmit}
                  isLoading={isLoading}
                  leftIcon={<Save size={16} />}
                >
                  Concluir Cadastro
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  rightIcon={<ChevronRight size={16} />}
                >
                  Próximo
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default RegistrationPage;