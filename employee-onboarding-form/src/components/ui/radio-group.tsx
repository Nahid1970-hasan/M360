"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

interface CustomRadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  size?: "sm" | "md";
  hoverColor?: string;
  selectColor?: string;
}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn("grid gap-2", className)}
    {...props}
  />
));
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  CustomRadioGroupItemProps
>(({ className, size = "md", hoverColor, selectColor, ...props }, ref) => {
  const paddingValue = size === "sm" ? "5px" : "9px";
  const itemSize = size === "sm" ? "h-3 w-3" : "h-4 w-4";
  const indicatorSize = size === "sm" ? "h-1.5 w-1.5" : "h-2.5 w-2.5";

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
        "radio-wrapper",
        "relative inline-flex justify-center items-center vertical-align-middle select-none border-0 m-0 cursor-pointer bg-transparent"
      )}
      style={wrapperStyle}
    >
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(
          "peer shrink-0 rounded-full border border-primary text-primary " +
            "ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring " +
            "focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          itemSize,
          className
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <div className={cn("rounded-full bg-primary", indicatorSize)} />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>

      <style jsx>{`
        .radio-wrapper {
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

        .radio-wrapper:hover {
          background-color: ${hoverColor || "transparent"};
        }

        .radio-wrapper:active {
          background-color: #c7c4c4;
          background-size: 100%;
          transition: background 0s;
        }

        .radio-wrapper .peer[data-state="checked"] {
          background-color: ${selectColor || "var(--primary, #000)"};
          border-color: ${selectColor || "var(--primary, #000)"};
        }

        .radio-wrapper .peer:not([data-state="checked"]) {
          border-color: ${selectColor || "var(--primary, #000)"};
        }
      `}</style>
    </div>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };