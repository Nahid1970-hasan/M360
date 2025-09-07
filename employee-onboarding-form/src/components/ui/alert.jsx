import React from "react";
import { cn } from "@/lib/utils";

// AlertDialog Component
export const AlertDialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      {children}
    </div>
  );
};

// AlertDialogContent Component
export const AlertDialogContent = ({ children, className }) => {
  return (
    <div
      className={cn(
        "bg-white rounded-lg p-6 w-full max-w-md shadow-xl",
        className
      )}
    >
      {children}
    </div>
  );
};

// AlertDialogHeader Component
export const AlertDialogHeader = ({ children, className }) => {
  return (
    <div className={cn("space-y-2", className)}>
      {children}
    </div>
  );
};

// AlertDialogTitle Component
export const AlertDialogTitle = ({ children, className }) => {
  return (
    <h2 className={cn("text-lg font-semibold", className)}>
      {children}
    </h2>
  );
};

// AlertDialogDescription Component
export const AlertDialogDescription = ({ children, className }) => {
  return (
    <p className={cn("text-gray-600", className)}>
      {children}
    </p>
  );
};

// AlertDialogFooter Component
export const AlertDialogFooter = ({ children, className }) => {
  return (
    <div className={cn("flex justify-end gap-3 mt-6", className)}>
      {children}
    </div>
  );
};

// AlertDialogCancel Component
export const AlertDialogCancel = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors",
        className
      )}
    >
      {children}
    </button>
  );
};

// AlertDialogAction Component
export const AlertDialogAction = ({ children, onClick, variant = "default", className }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 text-sm font-medium text-white rounded-md transition-colors",
        variant === "destructive"
          ? "bg-red-600 hover:bg-red-700"
          : "bg-blue-600 hover:bg-blue-700",
        className
      )}
    >
      {children}
    </button>
  );
};

// Example usage component
export const AlertDialogExample = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="p-8">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Open Alert Dialog
      </button>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              variant="destructive" 
              onClick={() => console.log("Account deleted")}
            >
              Delete Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};