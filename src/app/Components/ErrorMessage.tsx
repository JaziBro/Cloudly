import React from "react";
import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center bg-red-100 text-red-700 border border-red-400 rounded-md p-4 my-4">
      <AlertCircle className="h-5 w-5 mr-2" />
      <span>{message}</span>
    </div>
  );
};
