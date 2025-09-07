import React, { createContext, useContext, useState, ReactNode, ReactElement } from "react";
import { cn } from "@/lib/utils";

interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const PopoverContext = createContext<PopoverContextValue | undefined>(undefined);


export const Popover: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">{children}</div>
    </PopoverContext.Provider>
  );
};

interface PopoverTriggerProps {
  asChild?: boolean;
  children: ReactElement<any>; 
}

export const PopoverTrigger: React.FC<PopoverTriggerProps> = ({ asChild, children }) => {
  const context = useContext(PopoverContext);
  if (!context) throw new Error("PopoverTrigger must be used inside Popover");

  const handleClick = () => context.setOpen(!context.open);

  if (asChild) {
    return React.cloneElement(children, {
      onClick: (event: React.MouseEvent) => {
        handleClick();
        if (children.props.onClick) {
          children.props.onClick(event); 
        }
      },
    });
  }
  return (
    <button type="button" onClick={handleClick}>
      {children}
    </button>
  );
};

interface PopoverContentProps {
  children: ReactNode;
  align?: "start" | "center" | "end";
  className?: string;
}

export const PopoverContent: React.FC<PopoverContentProps> = ({
  children,
  align = "start",
  className,
}) => {
  const context = useContext(PopoverContext);
  if (!context) throw new Error("PopoverContent must be used inside Popover");

  if (!context.open) return null;

  const alignmentClasses = {
    start: "left-0",
    center: "left-1/2 transform -translate-x-1/2",
    end: "right-0",
  };

  return (
    <div
      className={cn(
        "absolute z-50 mt-2 w-64 rounded-md bg-white shadow-lg border border-gray-200",
        alignmentClasses[align],
        className
      )}
    >
      {children}
    </div>
  );
};
