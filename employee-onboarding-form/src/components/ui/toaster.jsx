"use client";

import { Toaster as SonnerToaster } from "sonner";

export const Toaster = () => {
  return (
    <SonnerToaster
      position="top-right" 
      duration={4000} 
      richColors
      closeButton
    />
  );
};
