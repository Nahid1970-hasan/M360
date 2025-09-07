import React from "react";

interface SeparatorProps {
  className?: string;
}

export const Separator: React.FC<SeparatorProps> = ({ className }) => {
  return (
    <hr
      className={`border-t border-gray-200 dark:border-gray-700 my-4 ${className || ""}`}
    />
  );
};
