"use client";

import { ControllerRenderProps, useFormContext } from "react-hook-form";
import { OnboardingFormValues } from "@/schemas/onboardingSchema";
import {FormControl,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { CalendarIcon, UploadIcon, User, Mail, Phone, Cake, Image } from "lucide-react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";


interface Step1PersonalInfoProps { }

export default function Step1PersonalInfo({ }: Step1PersonalInfoProps) {
    const { control, watch, setValue } =
        useFormContext<OnboardingFormValues>();

    const profilePicture = watch("profilePicture");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const MAX_FILE_SIZE = 2 * 1024 * 1024;
            const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

            if (file.size > MAX_FILE_SIZE) {
                toast.error("Max image size is 2MB.");
                setValue("profilePicture", undefined, { shouldValidate: true });
                event.target.value = "";
                return;
            }

            if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
                toast.error("Only .jpg, .jpeg, and .png formats are supported.");
                setValue("profilePicture", undefined, { shouldValidate: true });
                event.target.value = "";
                return;
            }

            setValue("profilePicture", file, {
                shouldValidate: true,
                shouldDirty: true,
            });
        } else {
            setValue("profilePicture", undefined, {
                shouldValidate: true,
                shouldDirty: true,
            });
        }
    };

    return (
        
        <div className="flex flex-col items-center justify-center min-h-full py-8">
            <div className="w-full max-w-4xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Personal Information</h2>
                    <p className="text-gray-600 mt-2">Tell us about yourself - Step 1 of 5</p>
                </div>
               <Card className="shadow-xl border-0 rounded-xl">
                    <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
                        <CardTitle className="text-xl flex items-center justify-center gap-2 text-blue-800">
                            <User className="h-6 w-6" />
                            Basic Details
                        </CardTitle>
                        <CardDescription className="text-center text-blue-600">
                            Enter your personal information
                        </CardDescription>
                    </CardHeader>
                    <CardContent style={{margin:"10px 40px"}} className="p-6 space-y-6">
                        <FormField 
                            control={control}
                            name="fullName"
                            render={({ field }: { field: ControllerRenderProps<OnboardingFormValues, "fullName"> }) => (
                                <FormItem className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                                    <FormLabel className="md:text-right font-medium flex items-center gap-2 justify-end">
                                        <User className="h-4 w-4" />
                                        Full Name
                                    </FormLabel>
                                    <div style={{margin:"5px"}}className="md:col-span-2">
                                        <FormControl>
                                            <Input placeholder="Enter your full name" {...field} className="w-full" />
                                        </FormControl>
                                        <FormMessage className="text-xs mt-1" />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="email"
                            render={({ field }: { field: ControllerRenderProps<OnboardingFormValues, "email"> }) => (
                                <FormItem className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                                    <FormLabel className="md:text-right font-medium flex items-center gap-2 justify-end">
                                        <Mail className="h-4 w-4" />
                                        Email
                                    </FormLabel>
                                    <div className="md:col-span-2" style={{margin:"5px"}}>
                                        <FormControl>
                                            <Input
                                                placeholder="your.email@example.com"
                                                type="email"
                                                {...field}
                                                className="w-full"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs mt-1" />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="phoneNumber"
                            render={({ field }: { field: ControllerRenderProps<OnboardingFormValues, "phoneNumber"> }) => (
                                <FormItem className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                                    <FormLabel className="md:text-right font-medium flex items-center gap-2 justify-end">
                                        <Phone className="h-4 w-4" />
                                        Phone Number
                                    </FormLabel>
                                    <div className="md:col-span-2" style={{margin:"5px"}}>
                                        <FormControl>
                                            <Input placeholder="+1 (555) 123-4567" {...field} className="w-full" />
                                        </FormControl>
                                        <FormMessage className="text-xs mt-1" />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="dateOfBirth"
                            render={({ field }: { field: ControllerRenderProps<OnboardingFormValues, "dateOfBirth"> }) => (
                                <FormItem className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                                    <FormLabel className="md:text-right font-medium flex items-center gap-2 justify-end">
                                        <Cake className="h-4 w-4" />
                                        Date of Birth
                                    </FormLabel>
                                    <div className="md:col-span-2" style={{margin:"5px"}}>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            "w-full justify-start text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(parseISO(field.value), "PPP")
                                                        ) : (
                                                            <span>Select your date of birth</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="end">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value ? parseISO(field.value) : undefined}
                                                    onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
                                                    fromYear={1900}
                                                    toYear={new Date().getFullYear()}
                                                    initialFocus
                                                    className="rounded-md border"
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage className="text-xs mt-1" />
                                    </div>
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
 
                <Card className="shadow-xl border-0 rounded-xl mt-6" style={{margin:"10px 40px"}}>
                    <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
                        <CardTitle className="text-xl flex items-center justify-center gap-2 text-blue-800">
                            <Image className="h-6 w-6" />
                            Profile Photo
                        </CardTitle>
                        <CardDescription className="text-center text-blue-600">
                            Upload a professional photo (optional)
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        <FormField
                            control={control}
                            name="profilePicture"
                            render={() => (
                                <FormItem className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                                    <FormLabel className="md:text-right font-medium">
                                        Profile Picture
                                    </FormLabel>
                                    <div className="md:col-span-2 space-y-4">
                                        <FormControl>
                                            <input
                                                id="profilePicture"
                                                type="file"
                                                accept="image/jpeg, image/png"
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                        </FormControl>

                                        <div style={{margin:"10px"}} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() =>
                                                    document.getElementById("profilePicture")?.click()
                                                }
                                                className="flex items-center gap-2"
                                            >
                                                <UploadIcon className="h-4 w-4" />
                                                Choose File
                                            </Button>
                                            
                                            {profilePicture instanceof File && (
                                                <div className="flex items-center gap-2 text-sm">
                                                    <span className="text-green-600 font-medium">Selected:</span>
                                                    <span className="text-gray-700">{profilePicture.name}</span>
                                                    <span className="text-gray-500">
                                                        ({(profilePicture.size / 1024 / 1024).toFixed(2)} MB)
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <p className="text-xs text-gray-500">
                                            Maximum file size: 2MB. Accepted formats: JPG, PNG
                                        </p>
                                        
                                        <FormMessage className="text-xs" />
                                    </div>
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}