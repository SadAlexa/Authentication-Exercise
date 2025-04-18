import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../validation/LoginSchema";
import Button from "../button/Button";
import { useAuth } from "../../../application/hooks/UseAuth";

const LoginForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const { login: authLogin } = useAuth();

  const onSubmit = (data: { email: string; password: string }) => {
    try {
      authLogin(data.email, data.password).then(() => onSuccess());
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <label className="block">
        Email:
        <input
          type="text"
          placeholder="Email"
          className="flex min-w-[250px] px-4 py-2 border rounded"
          {...register("email")}
        />
        <p className="text-red-600">{errors.email?.message}</p>
      </label>
      <label className="block">
        Password:
        <input
          type="password"
          placeholder="Password"
          className="flex min-w-[250px] px-4 py-2 border rounded"
          {...register("password")}
        />
        <p className="text-red-600">{errors.password?.message}</p>
      </label>
      <Button
        label="Login"
        onClick={handleSubmit(onSubmit)}
        className="button"
      />
    </form>
  );
};

export default LoginForm;
