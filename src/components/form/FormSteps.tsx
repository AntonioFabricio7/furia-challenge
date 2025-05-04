import React from 'react';
import { User, MapPin, Heart, FileText, Share2, Award, CheckCircle2 } from 'lucide-react';
import { FormStep } from '../../types';

interface FormStepsProps {
  currentStep: FormStep;
  completedSteps: FormStep[];
}

interface StepInfo {
  label: string;
  icon: React.ReactNode;
  description: string;
}

const FormSteps: React.FC<FormStepsProps> = ({ currentStep, completedSteps }) => {
  const stepConfig: Record<FormStep, StepInfo> = {
    personal: {
      label: 'Personal Info',
      icon: <User size={20} />,
      description: 'Basic personal information'
    },
    address: {
      label: 'Address',
      icon: <MapPin size={20} />,
      description: 'Your contact address'
    },
    interests: {
      label: 'Interests',
      icon: <Heart size={20} />,
      description: 'Gaming and esports interests'
    },
    documents: {
      label: 'Documents',
      icon: <FileText size={20} />,
      description: 'Upload your documents'
    },
    social: {
      label: 'Social Media',
      icon: <Share2 size={20} />,
      description: 'Connect your social accounts'
    },
    esports: {
      label: 'Esports Profiles',
      icon: <Award size={20} />,
      description: 'Link your gaming profiles'
    },
    summary: {
      label: 'Summary',
      icon: <CheckCircle2 size={20} />,
      description: 'Review your information'
    }
  };

  const steps: FormStep[] = ['personal', 'address', 'interests', 'documents', 'social', 'esports', 'summary'];

  return (
    <div className="mb-8">
      <div className="hidden md:block">
        <nav aria-label="Progress">
          <ol className="flex items-center justify-between">
            {steps.map((step, index) => {
              const isCompleted = completedSteps.includes(step);
              const isCurrent = currentStep === step;
              
              return (
                <li key={step} className={`relative ${index === steps.length - 1 ? '' : 'flex-1'}`}>
                  {index !== 0 && (
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div 
                        className={`h-0.5 w-full ${
                          isCompleted || completedSteps.includes(steps[index - 1]) 
                            ? 'bg-green-500' 
                            : 'bg-gray-200'
                        }`}
                      />
                    </div>
                  )}
                  <div 
                    className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                      isCompleted 
                        ? 'bg-green-500 group hover:bg-green-600' 
                        : isCurrent 
                          ? 'bg-gray-900 text-white' 
                          : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {stepConfig[step].icon}
                    <span className="sr-only">{stepConfig[step].label}</span>
                  </div>
                  <div className="hidden md:flex flex-col items-center mt-2">
                    <span 
                      className={`text-xs font-medium ${
                        isCompleted 
                          ? 'text-green-500' 
                          : isCurrent 
                            ? 'text-gray-900' 
                            : 'text-gray-500'
                      }`}
                    >
                      {stepConfig[step].label}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
      
      {/* Mobile version */}
      <div className="block md:hidden mb-6">
        <h2 className="text-lg font-semibold">
          Step {steps.findIndex(s => s === currentStep) + 1} of {steps.length}: {stepConfig[currentStep].label}
        </h2>
        <p className="text-sm text-gray-500">{stepConfig[currentStep].description}</p>
      </div>
    </div>
  );
};

export default FormSteps;