import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../../application/hooks/useAuth";
import { registerSchema } from "../../../validation/RegisterSchema";
import Button from "../button/Button";

const RegisterForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const { register: authRegister } = useAuth();

  const onSubmit = (data: {
    name: string;
    surname: string;
    email: string;
    password: string;
  }) => {
    try {
      authRegister(
        data.name,
        data.surname,
        data.email,
        /*  image, */
        data.password
      ).then((isRegistered: boolean) => {
        if (isRegistered) {
          onSuccess();
        }
      });
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    // TODO: improve accessibility
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <label className="block">
        Name:
        <input
          type="text"
          placeholder="Name"
          className="block w-full px-4 py-2 border rounded"
          {...register("name")}
        />
        <p className="text-red-600">{errors.name?.message}</p>
      </label>
      <label className="block">
        Surname:
        <input
          type="text"
          placeholder="Surname"
          className="block w-full px-4 py-2 border rounded"
          {...register("surname")}
        />
        <p className="text-red-600">{errors.surname?.message}</p>
      </label>
      <label className="block">
        Email:
        <input
          type="text"
          placeholder="Email"
          className="block w-full px-4 py-2 border rounded"
          {...register("email")}
        />
        <p className="text-red-600">{errors.email?.message}</p>
      </label>
      <label className="block">
        Date of birth:
        <input
          type="date"
          placeholder="Date of birth"
          className="block w-full px-4 py-2 border rounded"
          {...register("dateOfBirth")}
        />
        <p className="text-red-600">{errors.dateOfBirth?.message}</p>
      </label>
      <label className="block">
        Image:
        <input
          type="image"
          placeholder="Image"
          className="block w-full px-4 py-2 border rounded"
          {...register("image")}
        />
        <p className="text-red-600">{errors.image?.message}</p>
      </label>
      <label className="block">
        Password:
        <input
          type="password"
          placeholder="Password"
          className="block w-full px-4 py-2 border rounded"
          {...register("password")}
        />
        <p className="text-red-600">{errors.password?.message}</p>
      </label>
      <label className="block">
        Confirm password:
        <input
          type="password"
          placeholder="Confirm password"
          className="block w-full px-4 py-2 border rounded"
          {...register("confirmPassword")}
        />
        <p className="text-red-600">{errors.confirmPassword?.message}</p>
      </label>
      <Button
        label="Register"
        onClick={handleSubmit(onSubmit)}
        className="button"
      />
    </form>
  );
};

export default RegisterForm;
