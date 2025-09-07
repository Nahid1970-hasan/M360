// src/app/page.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { onboardingSchema, OnboardingFormValues } from "@/schemas/onboardingSchema";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import Step1PersonalInfo from "@/components/form-steps/Step1PersonalInfo";
import Step2JobDetails from "@/components/form-steps/Step2JobDetails";
import Step3SkillsPreferences from "@/components/form-steps/Step3SkillsPreferences";
import Step4EmergencyContact from "@/components/form-steps/Step4EmergencyContact";
import Step5ReviewSubmit from "@/components/form-steps/Step5ReviewSubmit";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert";
import { useBeforeUnload } from "@/hooks/useBeforeUnload";
import { parseISO, isValid } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  { id: "personal-info", name: "Personal Info", component: Step1PersonalInfo },
  { id: "job-details", name: "Job Details", component: Step2JobDetails },
  { id: "skills-preferences", name: "Skills & Preferences", component: Step3SkillsPreferences },
  { id: "emergency-contact", name: "Emergency Contact", component: Step4EmergencyContact },
  { id: "review-submit", name: "Review & Submit", component: Step5ReviewSubmit },
];

const getStepSchema = (stepId: string) => {
  switch (stepId) {
    case "personal-info":
      return onboardingSchema.pick({
        fullName: true, email: true, phoneNumber: true, dateOfBirth: true, profilePicture: true
      });
    case "job-details":
      return onboardingSchema.pick({
        department: true, positionTitle: true, startDate: true, jobType: true, salaryExpectation: true, manager: true
      });
    case "skills-preferences":
      return onboardingSchema.pick({
        primarySkills: true, experienceForSkills: true, preferredWorkingHours: true, remoteWorkPreference: true, managerApprovedRemote: true, extraNotes: true
      });
    case "emergency-contact":
      return onboardingSchema.pick({
        contactName: true, relationship: true, emergencyPhoneNumber: true, guardianContactName: true, guardianPhoneNumber: true
      }).partial({ guardianContactName: true, guardianPhoneNumber: true });
    case "review-submit":
      return onboardingSchema.pick({ confirmInformation: true });
    default:
      return z.object({});
  }
};

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showUnsavedChangesAlert, setShowUnsavedChangesAlert] = useState(false);
  const [currentStepSchema, setCurrentStepSchema] = useState(getStepSchema(steps[currentStep].id));

  useEffect(() => {
    setCurrentStepSchema(getStepSchema(steps[currentStep].id));
  }, [currentStep]);

  const methods = useForm<OnboardingFormValues>({
    resolver: zodResolver(currentStepSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      profilePicture: undefined,
      department: undefined,
      positionTitle: "",
      startDate: undefined,
      jobType: undefined,
      salaryExpectation: 0,
      manager: "",
      primarySkills: [],
      experienceForSkills: {},
      preferredWorkingHours: "",
      remoteWorkPreference: 0,
      managerApprovedRemote: false,
      extraNotes: "",
      contactName: "",
      relationship: undefined,
      emergencyPhoneNumber: "",
      guardianContactName: "",
      guardianPhoneNumber: "",
      confirmInformation: "false",
    },
  });

  const {
    handleSubmit,
    trigger,
    formState: {  isDirty, isValid: isFormValid },
    reset,
    watch,
  } = methods;

  const formStateRef = useRef<Partial<OnboardingFormValues>>({});
  const allFormValues = watch();

  useEffect(() => {
    formStateRef.current = allFormValues;
  }, [allFormValues]);

  useBeforeUnload(isDirty && currentStep !== steps.length - 1);

  const handleNext = async () => {
    const isCurrentStepValid = await trigger(undefined, { shouldFocus: true });
    if (isCurrentStepValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      }
    } else {
      toast.error("Please correct the errors before proceeding.");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit = async (data: OnboardingFormValues) => {
    setIsSubmitting(true);
    
    let isAllStepsValid = true;
    let firstInvalidStep = 0;
    
    for (let i = 0; i < steps.length; i++) {
      const stepSchema = getStepSchema(steps[i].id);
      try {
        stepSchema.parse(data);
      } catch (error) {
        isAllStepsValid = false;
        firstInvalidStep = i;
        console.error(`Validation failed for step ${i + 1}:`, error);
        break;
      }
    }

    if (!isAllStepsValid) {
      toast.error("Please review all steps and correct any errors before submitting.");
      setCurrentStep(firstInvalidStep);
      setIsSubmitting(false);
      return;
    }

    console.log("Submitting form data:", data);
    toast.success("Employee onboarded successfully!");
    setIsSubmitting(false);
    reset();
    setCurrentStep(0);
  };

  const currentStepComponent = steps[currentStep].component;
  const progress = ((currentStep + 1) / steps.length) * 100;

  const dateOfBirth = watch("dateOfBirth");
  const department = watch("department");
  const remoteWorkPreference = watch("remoteWorkPreference");
  const jobType = watch("jobType");

  const dob = dateOfBirth ? parseISO(dateOfBirth) : null;
  const isDateValid = dob && isValid(dob);
  const age = isDateValid ? new Date().getFullYear() - dob.getFullYear() : null;
  const isUnder21 = age !== null && age < 21;

  const commonProps = useCallback(() => ({
    allFormValues,
    isUnder21,
    department,
    remoteWorkPreference,
    jobType
  }), [allFormValues, isUnder21, department, remoteWorkPreference, jobType]);

  return (
    <FormProvider {...methods}>
      <div className="container mx-auto p-4 md:p-8 max-w-3xl">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">New Employee Onboarding</CardTitle>
            <CardDescription className="text-center text-gray-600">
              Complete the 5 steps to onboard a new employee.
            </CardDescription>
            <Progress value={progress} className="w-full mt-4" />
            <div className="flex justify-between text-sm mt-2 text-gray-500">
              {steps.map((step, index) => (
                <span style={{margin:"10px"}} key={step.id} className={currentStep === index ? "font-semibold text-primary" : ""}>
                  Step {index + 1}: {step.name}
                </span>
              ))}
            </div>
            <Separator className="my-4" />
          </CardHeader>

          <CardContent style={{margin:"10px 40px"}}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <CurrentStepRenderer currentStepComponent={currentStepComponent} {...commonProps()} />

              <div className="flex justify-between mt-8">
                {currentStep > 0 && (
                  <Button style={{margin:"5px"}} type="button" variant="outline" onClick={handleBack}>
                    Previous
                  </Button>
                )}
                {currentStep < steps.length - 1 && (
                  <Button style={{margin:"0 0 30px 40px"}} type="button" onClick={handleNext} className="ml-auto">
                    Next
                  </Button>
                )}
                {currentStep === steps.length - 1 && (
                  <Button type="submit" disabled={isSubmitting || !isFormValid} className="ml-auto">
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <AlertDialog open={showUnsavedChangesAlert} onOpenChange={setShowUnsavedChangesAlert}>
          <AlertDialogContent  className="">
            <AlertDialogHeader  className="">
              <AlertDialogTitle  className="">Unsaved Changes</AlertDialogTitle>
              <AlertDialogDescription  className="">
                You have unsaved changes. Are you sure you want to leave? Your progress might be lost.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter  className="">
              <AlertDialogCancel  className="" onClick={() => setShowUnsavedChangesAlert(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction  className="" onClick={() => setShowUnsavedChangesAlert(false)}>Leave Anyway</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </FormProvider>
  );
}

// Helper component to render the current step
const CurrentStepRenderer = ({ currentStepComponent: Component, ...props }: { currentStepComponent: React.ComponentType<any> } & any) => {
  return <Component {...props} />;
};