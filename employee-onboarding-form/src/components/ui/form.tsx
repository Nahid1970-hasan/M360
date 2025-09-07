"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  ControllerProps,
  FieldValues,
  FieldPath,
  FieldError,
  useFormContext,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label"; // Assuming this is your Shadcn Label component

interface FormFieldContextValue {
  name: string;
  error?: FieldError;
}
const FormFieldContext = React.createContext<FormFieldContextValue | undefined>(
  undefined
);
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  const { control, formState } = useFormContext<TFieldValues>();
  // Ensure we get the error for the specific field, handling nested errors
  const error = formState.errors[props.name] as FieldError | undefined;

  return (
    <FormFieldContext.Provider value={{ name: props.name as string, error }}>
      <Controller {...props} control={control} />
    </FormFieldContext.Provider>
  );
};

const FormItemContext = React.createContext<{ id: string } | undefined>(undefined);

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = React.useId();
    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn("mb-4 space-y-2", className)} {...props} /> {/* Added mb-4 for more space between items */}
      </FormItemContext.Provider>
    );
  }
);
FormItem.displayName = "FormItem";


function useFormField() {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);

  if (!fieldContext) {
    throw new Error("useFormField must be used within a FormField");
  }

  const formItemId = itemContext?.id ?? undefined;
  const formMessageId = `${formItemId}-message`;
  const formDescriptionId = `${formItemId}-description`;
  const error = fieldContext.error; // Already correctly typed from FormFieldContextValue

  return { ...fieldContext, formItemId, formMessageId, formDescriptionId, error };
}

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();
  return (
    <Label
      ref={ref}
      // Increased bottom margin for better separation, removed the problematic "p-[10px 5px]"
      className={cn("block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-1", error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<React.ElementRef<typeof Slot>, React.ComponentPropsWithoutRef<typeof Slot>>(
  ({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
    return (
      <Slot
        ref={ref}
        id={formItemId}
        aria-describedby={!error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`}
        aria-invalid={!!error}
        {...props}
      />
    );
  }
);
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();
  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground mt-1", className)} // Smaller text, subtle top margin
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;
    if (!body) return null;

    return (
      <p
        ref={ref}
        id={formMessageId}
        className={cn("text-[0.8rem] font-medium text-destructive mt-1", className)} // Smaller text, subtle top margin
        {...props}
      >
        {body}
      </p>
    );
  }
);
FormMessage.displayName = "FormMessage";

export {
  useFormField,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
};