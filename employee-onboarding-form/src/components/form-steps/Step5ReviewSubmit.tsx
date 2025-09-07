"use client";

import { useFormContext } from "react-hook-form";
import { OnboardingFormValues } from "@/schemas/onboardingSchema";
import {FormControl,FormField, FormItem,FormLabel,FormMessage} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { mockManagers } from "@/data/mockData";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

const ReviewField = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex items-center justify-between py-2 border-b last:border-b-0">
    <span className="font-medium text-gray-700 dark:text-gray-300">{label}:</span>
    <span className="text-gray-900 dark:text-gray-100">{value || "N/A"}</span>
  </div>
);

export default function Step5ReviewSubmit() {
  const { control, watch, formState: { errors } } = useFormContext<OnboardingFormValues>();
  const allFormValues = watch(); 

  const {
    fullName,
    email,
    phoneNumber,
    dateOfBirth,
    profilePicture,
    department,
    positionTitle,
    startDate,
    jobType,
    salaryExpectation,
    manager,
    primarySkills,
    experienceForSkills,
    preferredWorkingHours,
    remoteWorkPreference,
    managerApprovedRemote,
    extraNotes,
    contactName,
    relationship,
    emergencyPhoneNumber,
    guardianContactName,
    guardianPhoneNumber,
  } = allFormValues;

  const getManagerName = (managerId: string | undefined) => {
    if (!managerId) return "N/A";
    const foundManager = mockManagers.find(m => m.name === managerId);
    return foundManager ? `${foundManager.name} (${foundManager.department})` : managerId;
  };

  const formattedDob = dateOfBirth ? format(new Date(dateOfBirth), "PPP") : "N/A";
  const formattedStartDate = startDate ? format(new Date(startDate), "PPP") : "N/A";

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Step 5: Review & Submit</h2>
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Verify your personal details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <ReviewField label="Full Name" value={fullName} />
          <ReviewField label="Email" value={email} />
          <ReviewField label="Phone Number" value={phoneNumber} />
          <ReviewField label="Date of Birth" value={formattedDob} />
          <ReviewField label="Profile Picture" value={profilePicture instanceof File ? profilePicture.name : profilePicture ? "Uploaded" : "None"} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
          <CardDescription>Verify your job-related information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <ReviewField label="Department" value={department} />
          <ReviewField label="Position Title" value={positionTitle} />
          <ReviewField label="Start Date" value={formattedStartDate} />
          <ReviewField label="Job Type" value={jobType} />
          <ReviewField label="Salary Expectation" value={
            salaryExpectation ? `$${salaryExpectation.toLocaleString()} ${jobType === "Full-time" ? " (Annual)" : jobType === "Contract" ? " (Hourly)" : ""}` : "N/A"
          } />
          <ReviewField label="Manager" value={getManagerName(manager)} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skills & Preferences</CardTitle>
          <CardDescription>Review your skills and working preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <ReviewField label="Primary Skills" value={primarySkills && primarySkills.length > 0 ? primarySkills.join(", ") : "None selected"} />
          {primarySkills && primarySkills.length > 0 && (
            <div className="pl-4">
              {primarySkills.map(skill => (
                <ReviewField key={skill} label={`${skill} Experience`} value={experienceForSkills?.[skill] || "Not specified"} />
              ))}
            </div>
          )}
          <ReviewField label="Preferred Working Hours" value={preferredWorkingHours} />
          <ReviewField label="Remote Work Preference" value={`${remoteWorkPreference}%`} />
          {Number(remoteWorkPreference) > 50 && (
            <ReviewField label="Manager Approved Remote" value={managerApprovedRemote ? "Yes" : "No"} />
          )}
          <ReviewField label="Extra Notes" value={extraNotes} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Emergency Contact</CardTitle>
          <CardDescription>Confirm your emergency contact details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <ReviewField label="Contact Name" value={contactName} />
          <ReviewField label="Relationship" value={relationship} />
          <ReviewField label="Phone Number" value={emergencyPhoneNumber} />
          {guardianContactName && (
            <>
              <ReviewField label="Guardian Contact Name" value={guardianContactName} />
              <ReviewField label="Guardian Phone Number" value={guardianPhoneNumber} />
            </>
          )}
        </CardContent>
      </Card>

      <FormField
        control={control}
        name="confirmInformation"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4">
            <FormControl>
              <Checkbox
                checked={!!field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                I confirm all information is correct.
              </FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}