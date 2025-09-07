import { z } from "zod";

export const onboardingSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  profilePicture: z.instanceof(File).optional(),

  department: z.string().optional(),
  positionTitle: z.string().optional(),
  startDate: z.date().optional(),
  jobType: z.enum(["Full-time", "Part-time", "Contract"]).optional(),
  salaryExpectation: z.number().optional(),
  manager: z.string().optional(),

  primarySkills: z.array(z.string()).optional(),
  experienceForSkills: z.record(z.number()).optional(),
  preferredWorkingHours: z.string().optional(),
  remoteWorkPreference: z.number().optional(),
  managerApprovedRemote: z.boolean().optional(),
  extraNotes: z.string().optional(),
  guardianPhoneNumber: z.string().optional(),
  guardianContactName: z.string().optional(),
  emergencyPhoneNumber: z.string().optional(),
  contactName: z.string().optional(),
  relationship: z.enum(["Parent", "Spouse", "Sibling", "Friend", "Other"]).optional(),
  confirmInformation: z.string().optional(),
});

export type OnboardingFormValues = z.infer<typeof onboardingSchema>;
