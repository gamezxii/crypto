import React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Input } from "../components/react-hook-form/input";
import { PasswordInput } from "../components/react-hook-form/PasswordInput";
import { useAuthCreateUserMutation } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

const Signup: React.FC = () => {
  const methods = useForm<FormData>({ mode: "onChange" });
  const authCreateMutation = useAuthCreateUserMutation();
  const {
    handleSubmit,
    formState: { isValid },
    watch,
  } = methods;
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    authCreateMutation.mutate(
      {
        username: data.email,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
      },
      {
        onSuccess: () => {
          alert("Register successfully");
          navigate("/login");
        },
        onError: (error) => {
          console.error("Error adding fund", error);
          alert("Error Something went wrong.");
        },
      }
    );
  };

  const password = watch("password");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#212528]">
      <div className="bg-[#212528] p-10 rounded-lg w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-3xl font-bold text-white">CRYPTO</h1>
          <p className="text-gray-400">Secure your digital assets</p>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="first_name"
              name="first_name"
              type="text"
              placeholder="First Name"
              rules={{ required: "First name is required" }}
            />
            <Input
              id="last_name"
              name="last_name"
              type="text"
              placeholder="Last Name"
              rules={{ required: "Last name is required" }}
            />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              }}
            />
            <PasswordInput
              id="password"
              name="password"
              placeholder="Password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
            />
            <PasswordInput
              id="confirm_password"
              name="confirm_password"
              placeholder="Confirm Password"
              rules={{
                required: "Confirm password is required",
                validate: (value: string) =>
                  value === password || "Passwords do not match",
              }}
            />
            <button
              type="submit"
              disabled={!isValid}
              className={`w-full py-3 rounded-full font-bold ${
                isValid
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-600 cursor-not-allowed text-gray-500"
              }`}
            >
              Sign Up
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Signup;
