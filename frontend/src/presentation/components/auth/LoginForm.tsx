import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../../application/hooks/useAuth";
import { loginSchema } from "../../../validation/LoginSchema";

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
      authLogin(data.email, data.password).then((isLogged: boolean) => {
        if (isLogged) {
          onSuccess();
        }
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    // TODO: improve accessibility
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Email:
        <input type="text" placeholder="Email" {...register("email")} />
        <p>{errors.email?.message}</p>
      </label>
      <label>
        Password:
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <p>{errors.password?.message}</p>
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
