// components/form-steps/Step3SkillsPreferences.tsx
"use client";

import { useFormContext } from "react-hook-form";
import { OnboardingFormValues } from "@/schemas/onboardingSchema";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { skillsByDepartment } from "@/data/mockData";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@radix-ui/react-switch";

interface Step3SkillsPreferencesProps {
  department: OnboardingFormValues['department'];
  remoteWorkPreference: OnboardingFormValues['remoteWorkPreference'];
}

export default function Step3SkillsPreferences({ department, remoteWorkPreference }: Step3SkillsPreferencesProps) {
  const { control, watch, setValue, getValues, formState: { errors } } = useFormContext<OnboardingFormValues>();

  const selectedSkills = watch("primarySkills");
  const experienceForSkills = watch("experienceForSkills");


  const departmentSkills = department ? skillsByDepartment[department as keyof typeof skillsByDepartment] : [];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Step 3: Skills & Preferences</h2>
      <Separator />

      <FormField
        control={control}
        name="primarySkills"
        render={() => (
          <FormItem>
            <FormLabel>Primary Skills (Choose at least 3)</FormLabel>
            <div className="grid grid-cols-2 gap-2">
              {departmentSkills.length > 0 ? (
                departmentSkills.map((skill) => (
                  <FormField
                    key={skill}
                    control={control}
                    name="primarySkills"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={skill}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(skill)}
                              onCheckedChange={(checked) => {
                                const newSkills = checked
                                  ? [...(field.value || []), skill]
                                  : (field.value || []).filter((value) => value !== skill);
                                field.onChange(newSkills);
                                if (!checked && experienceForSkills?.[skill as string]) {
                                  const newExperience = { ...experienceForSkills };
                                  delete newExperience[skill as string];
                                  setValue("experienceForSkills", newExperience, { shouldDirty: true });
                                }
                              }}
                            />

                          </FormControl>
                          <FormLabel className="font-normal">{skill}</FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))
              ) : (
                <p className="text-sm text-muted-foreground col-span-2">
                  Please select a department in the previous step to see skills.
                </p>
              )}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {selectedSkills && selectedSkills.length > 0 && (
        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-medium">Experience for Each Skill</h3>
          {selectedSkills.map((skill) => (
            <FormField
              key={`experience-${skill}`}
              control={control}
              name={`experienceForSkills.${skill}`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{skill} Experience</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`e.g., 2 years, Intermediate`}
                      {...field}
                      value={field.value || ""} // Ensure controlled input
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
      )}


      <FormField
        control={control}
        name="preferredWorkingHours"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferred Working Hours</FormLabel>
            <FormControl>
              <Input placeholder="e.g., 9 AM - 5 PM" {...field} />
            </FormControl>
            <FormDescription>Specify your preferred daily working hours.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="remoteWorkPreference"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Remote Work Preference</FormLabel>
            <FormControl>
              <div className="flex items-center space-x-4">
                <Slider
                  min={0}
                  max={100}
                  step={5}
                  value={[typeof field.value === "number" ? field.value : Number(field.value) || 0]}
                  onValueChange={(val: number[]) => field.onChange(val[0])}
                  className="w-[60%]"
                />

                <span className="text-nowrap">{field.value}% Remote</span>
              </div>
            </FormControl>
            <FormDescription>
              How much of your work would you prefer to do remotely?
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {Number(remoteWorkPreference) > 50 && (
        <FormField
          control={control}
          name="managerApprovedRemote"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Manager Approved for High Remote Work</FormLabel>
                <FormDescription>
                  This option is required if your remote work preference is above 50%.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}



      <FormField
        control={control}
        name="extraNotes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Extra Notes (Optional)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Any additional information..."
                className="resize-y"
                {...field}
              />
            </FormControl>
            <FormDescription>Max 500 characters.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}