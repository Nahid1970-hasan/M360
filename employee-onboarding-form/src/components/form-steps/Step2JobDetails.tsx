// components/onboarding/Step2JobDetails.tsx
"use client";

import { useFormContext } from "react-hook-form";
import { OnboardingFormValues } from "@/schemas/onboardingSchema";
import {FormControl,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select_dropdown";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { format, addDays, isPast, isSameDay } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { mockManagers } from "@/data/mockData";
import { Separator } from "@/components/ui/separator";

const departmentOptions = ["Engineering", "Marketing", "Sales", "HR", "Finance"];
const jobTypeOptions = ["Full-time", "Part-time", "Contract"];


interface Step2JobDetailsProps {}

export default function Step2JobDetails({}: Step2JobDetailsProps) {
  const { control, watch, formState: { errors } } = useFormContext<OnboardingFormValues>();

  const departmentValue = watch("department");
  const jobTypeValue = watch("jobType");

  const filteredManagers = departmentValue
    ? mockManagers.filter((manager) => manager.department === departmentValue)
    : [];

  const salaryPlaceholder =
    jobTypeValue === "Full-time" ? "e.g., 50000 (Annual)" : jobTypeValue === "Contract" ? "e.g., 75 (Hourly)" : "e.g., 50000";

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Step 2: Job Details</h2>
      <Separator />
      <FormField
        control={control}
        name="department"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Department</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a department" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {departmentOptions.map((department) => (
                  <SelectItem key={department} value={department}>
                    {department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="positionTitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Position Title</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Software Engineer" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="startDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Start Date</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">

                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  initialFocus
                  fromDate={new Date()}
                  toDate={addDays(new Date(), 90)}
                  disabled={(date) =>
                    (isPast(date) && !isSameDay(date, new Date())) ||
                    date > addDays(new Date(), 90)
                  }
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="jobType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Job Type</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                {jobTypeOptions.map((type) => (
                  <FormItem
                    key={type}
                    className="flex items-center space-x-3 space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem value={type} />
                    </FormControl>
                    <FormLabel className="font-normal">{type}</FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {(jobTypeValue === "Full-time" || jobTypeValue === "Contract") && (
        <FormField
          control={control}
          name="salaryExpectation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salary Expectation</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={salaryPlaceholder}
                  {...field}
                  onChange={(e) => {
                    // Ensures that an empty string input results in undefined/null for Zod's optional number
                    field.onChange(e.target.value === "" ? "" : Number(e.target.value));
                  }}
                  value={field.value === undefined || field.value === null || field.value === 0 ? "" : field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      {departmentValue && (
        <FormField
          control={control}
          name="manager"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Manager</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a manager" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {filteredManagers.length > 0 ? (
                    filteredManagers.map((manager) => (
                      <SelectItem key={manager.id} value={manager.id}>
                        {manager.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-managers" disabled>
                      No managers found for this department
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />)}
      
    </div>
  );
}