import React, { useState } from "react";
import { FieldError, useFormContext } from "react-hook-form";

interface PasswordInputProps {
  id: string;
  name: string;
  placeholder: string;
  rules?: Record<string, unknown>;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  name,
  placeholder,
  rules,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const error = errors[name] as FieldError;

  return (
    <div className="mb-6 relative">
      <input
        type={showPassword ? "text" : "password"}
        id={id}
        {...register(name, rules)}
        className={`w-full p-3 rounded-full bg-gray-700 text-white border ${
          errors[name] ? "border-red-500" : "border-gray-600"
        }`}
        placeholder={placeholder}
      />
      {error && <span className="text-red-500">{error.message}</span>}

      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400"
      >
        {showPassword ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.76953 4L20.7695 20"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.4546 18.5135L12.8347 16.8936C12.483 16.9628 12.1277 17 11.7703 17C10.2445 17 8.75643 16.3224 7.42941 15.3677C6.11029 14.4186 5.03435 13.2558 4.35413 12.43C4.25436 12.3088 4.17984 12.2182 4.11811 12.1385C4.06925 12.0754 4.03813 12.0315 4.01782 12C4.03813 11.9685 4.06925 11.9246 4.11811 11.8615C4.17984 11.7818 4.25436 11.6912 4.35413 11.57C4.74161 11.0996 5.2575 10.5198 5.8736 9.9325L4.45904 8.51793C3.78276 9.1658 3.22446 9.79577 2.81036 10.2985C2.78678 10.3272 2.7622 10.3566 2.7369 10.3869L2.73687 10.3869C2.42344 10.7624 2 11.2696 2 12C2 12.7304 2.42344 13.2376 2.73687 13.6131L2.73705 13.6133C2.76229 13.6435 2.78682 13.6729 2.81036 13.7015C3.55022 14.5998 4.75044 15.9041 6.26138 16.9912C7.76442 18.0725 9.66034 19 11.7703 19C12.7131 19 13.6132 18.8148 14.4546 18.5135ZM7.70275 6.10479C8.91166 5.45764 10.2882 5 11.7703 5C13.8802 5 15.7761 5.92747 17.2792 7.00885C18.7901 8.0959 19.9903 9.40025 20.7302 10.2985C20.7538 10.3272 20.7783 10.3566 20.8036 10.3869L20.8037 10.3869C21.1171 10.7624 21.5406 11.2696 21.5406 12C21.5406 12.7304 21.1171 13.2376 20.8037 13.6131C20.7784 13.6434 20.7538 13.6728 20.7302 13.7015C20.1158 14.4474 19.184 15.4734 18.0203 16.4224L16.5978 14.9999C17.6951 14.131 18.5919 13.1518 19.1864 12.43C19.2862 12.3088 19.3607 12.2182 19.4224 12.1385C19.4713 12.0754 19.5024 12.0315 19.5227 12C19.5024 11.9685 19.4713 11.9246 19.4224 11.8615C19.3607 11.7818 19.2862 11.6912 19.1864 11.57C18.5062 10.7442 17.4303 9.58138 16.1111 8.63233C14.7841 7.6776 13.2961 7 11.7703 7C10.8917 7 10.0256 7.22468 9.19554 7.59758L7.70275 6.10479Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.361 13.7631C15.6226 13.2312 15.7695 12.6328 15.7695 12C15.7695 9.79086 13.9787 8 11.7695 8C11.1368 8 10.5383 8.14692 10.0065 8.40851L11.6047 10.0067C11.659 10.0023 11.714 10 11.7695 10C12.8741 10 13.7695 10.8954 13.7695 12C13.7695 12.0555 13.7673 12.1105 13.7628 12.1649L15.361 13.7631ZM7.773 11.8319C7.77069 11.8876 7.76953 11.9437 7.76953 12C7.76953 14.2091 9.56039 16 11.7695 16C11.8258 16 11.8819 15.9988 11.9376 15.9965L7.773 11.8319Z"
              fill="white"
            />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.0004 5C7.52281 5 3.73253 7.94288 2.45825 12C3.73251 16.0571 7.52281 19 12.0005 19C16.4781 19 20.2684 16.0571 21.5426 12C20.2684 7.94291 16.4781 5 12.0004 5Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
};
