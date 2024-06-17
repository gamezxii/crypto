import React, { useMemo } from "react";
import { useFormContext, FieldError } from "react-hook-form";

interface InputProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  rules?: Record<string, any>;
  maxLength?: number;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  id,
  name,
  type,
  placeholder,
  rules,
  maxLength,
  className = "w-full p-3 rounded-full bg-gray-700 text-white",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = useMemo(() => errors[name] as FieldError, [errors, name]);

  return (
    <div className="mb-4">
      <input
        type={type}
        id={id}
        maxLength={maxLength}
        {...register(name, rules)}
        className={`${className} border ${
          error ? "border-red-500" : "border-gray-600"
        }`}
        placeholder={placeholder}
      />
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
};
