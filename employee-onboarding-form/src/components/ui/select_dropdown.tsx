"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils"; 
interface CustomSelectProps {
  width?: string;
  height?: string;
  app?: boolean;
  color?: string; 
  fntsize?: string; 
  fntfamily?: string; 
}

const Select = SelectPrimitive.Root;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & CustomSelectProps 
>(({ className, children, width, height, app, color, fntsize, fntfamily, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background " +
        "px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground " +
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 " +
        "disabled:cursor-not-allowed disabled:opacity-50",

      width ? `w-[${width}]` : "w-auto",
      height ? `h-[${height}]` : "h-[35px]", 
      app ? "mt-[0.15rem]" : "mt-[0.55rem]",
!color && "border-[#ced4da]", 
      app ? "rounded-[0.3rem]" : "rounded-none", 
      fntsize ? `text-[${fntsize}]` : "text-[1rem]", 
      "font-normaal",
      "leading-[1.5]",
      "text-[#495057]", 
      "bg-white",
      "focus:border-2 focus:border-[#80bdff] focus:ring-0 focus:ring-offset-0",
      "disabled:bg-[#e9ecef] disabled:text-[#6c757d] disabled:cursor-not-allowed",
      
      className
    )}
    style={color ? { borderColor: color } : undefined} 
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectValue = SelectPrimitive.Value;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & CustomSelectProps
>(({ className, children, position = "popper", fntsize, fntfamily, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
        position === "popper" &&
          "translate-y-1 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",

        "bg-white",
        "border-[#ced4da]", 
        "text-[#495057]",

        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
          fntsize ? `text-[${fntsize}]` : "text-[1rem]",
          fntfamily ? `font-[${fntfamily}]` : (localStorage.i18nextLng === 'en' ? "font-[var(--dashboard-font)]" : "font-[var(--bangla-font)]")
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & Pick<CustomSelectProps, 'fntsize' | 'fntfamily'> 
>(({ className, children, fntsize, fntfamily, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none " +
        "focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    
      fntsize ? `text-[${fntsize}]` : "text-[1rem]",
      fntfamily ? `font-[${fntfamily}]` : (localStorage.i18nextLng === 'en' ? "font-[var(--dashboard-font)]" : "font-[var(--bangla-font)]"),

      
      "focus:bg-[#f0f0f0] focus:text-[#495057]", 

      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <Check className="h-4 w-4" />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };