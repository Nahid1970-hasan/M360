
import { useEffect, useCallback } from "react";

export function useBeforeUnload(shouldWarn: boolean) {
  const handleBeforeUnload = useCallback((event: BeforeUnloadEvent) => {
    if (shouldWarn) {
      event.preventDefault();
      event.returnValue = ''; 
    }
  }, [shouldWarn]);

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [handleBeforeUnload]);
}