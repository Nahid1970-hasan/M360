"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

interface CustomCheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  size?: "sm" | "md"; 
  hoverColor?: string; 
  selectColor?: string; 
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CustomCheckboxProps
>(({ className, size = "md", hoverColor, selectColor, ...props }, ref) => {
  const paddingValue = size === "sm" ? "5px" : "9px";
  interface CustomCSSProperties extends React.CSSProperties {
    [key: `--${string}`]: string | undefined; 
  }
  const wrapperStyle: CustomCSSProperties = {
    padding: paddingValue,
    borderRadius: "50%", 
  };

  return (
    <div 
      className={cn(
        "checkbox-wrapper", 
        "relative inline-flex justify-center items-center vertical-align-middle select-none border-0 m-0 cursor-pointer bg-transparent",
        
      )}
      style={wrapperStyle} 
    >
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          "peer h-4 w-4 shrink-0 rounded-sm shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          className={cn(
            "flex items-center justify-center text-current",
            "h-4 w-4",
          )}
        >
          <Check className="h-4 w-4" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      <style jsx>{`
        .checkbox-wrapper {
          position: relative;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          vertical-align: middle;
          user-select: none;
          border: 0;
          margin: 0;
          cursor: pointer;
          background-color: transparent;
          border-radius: 50%;
          padding: ${paddingValue}; 
          transition: background-color 0.15s ease-in-out; 
        }

        .checkbox-wrapper:hover {
          background-color: ${hoverColor || "transparent"};
        }

        .checkbox-wrapper:active {
          background-color: #c7c4c4; 
          background-size: 100%;
          transition: background 0s;
        }

        .checkbox-wrapper .peer[data-state="checked"] {
          background-color: ${selectColor || "var(--primary, #000)"};
          border-color: ${selectColor || "var(--primary, #000)"};
        }

        .checkbox-wrapper .peer[data-state="checked"] > .flex.items-center.justify-center {
            color: white; 
        }

        .checkbox-wrapper .peer:not([data-state="checked"]) {
            border-color: ${selectColor || "var(--primary, #000)"};
        }
        .checkbox-wrapper .peer:not([data-state="checked"]) > .flex.items-center.justify-center {
            color: ${selectColor || "currentColor"};
        }
      `}</style>
    </div>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };