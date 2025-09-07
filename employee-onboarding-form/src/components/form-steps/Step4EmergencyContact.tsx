"use client";

import { useFormContext } from "react-hook-form";
import { OnboardingFormValues } from "@/schemas/onboardingSchema";
import {FormControl,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface Step4EmergencyContactProps {
  isUnder21: boolean; 
}

export default function Step4EmergencyContact({ isUnder21 }: Step4EmergencyContactProps) {
  const { control } = useFormContext<OnboardingFormValues>();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Step 4: Emergency Contact</h2>
      <Separator />

    <FormField
  control={control}
  name="contactName"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Contact Name</FormLabel>
      <FormControl>
        <Input
          placeholder="Jane Doe"
           {...field}
          value={field.value ? String(field.value) : ""}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


      <FormField
        control={control}
        name="relationship"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Relationship</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Parent">Parent</SelectItem>
                <SelectItem value="Spouse">Spouse</SelectItem>
                <SelectItem value="Sibling">Sibling</SelectItem>
                <SelectItem value="Friend">Friend</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="emergencyPhoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input placeholder="+1-123-456-7890" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {isUnder21 && (
        <div className="space-y-4 border p-4 rounded-md bg-gray-50 dark:bg-gray-800">
          <h3 className="text-lg font-medium">Guardian Contact (Required for Under 21)</h3>
          <FormField
            control={control}
            name="guardianContactName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Guardian Contact Name</FormLabel>
                <FormControl>
                  <Input placeholder="Guardian's Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="guardianPhoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Guardian Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+1-123-456-7890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
}