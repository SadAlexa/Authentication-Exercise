import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../hooks/useAuth";
import { registerSchema } from "../../../validation/RegisterSchema";

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
    console.log(data);
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Name:
        <input type="text" placeholder="Name" {...register("name")} />
        <p>{errors.name?.message}</p>
      </label>
      <label>
        Surname:
        <input type="text" placeholder="Surname" {...register("surname")} />
        <p>{errors.surname?.message}</p>
      </label>
      <label>
        Email:
        <input type="text" placeholder="Email" {...register("email")} />
        <p>{errors.email?.message}</p>
      </label>
      <label>
        Date of birth:
        <input
          type="date"
          placeholder="Date of birth"
          {...register("dateOfBirth")}
        />
        <p>{errors.dateOfBirth?.message}</p>
      </label>
      <label>
        Image:
        <input type="image" placeholder="Image" {...register("image")} />
        <p>{errors.image?.message}</p>
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
      <label>
        Confirm password:
        <input
          type="password"
          placeholder="Confirm password"
          {...register("confirmPassword")}
        />
        <p>{errors.confirmPassword?.message}</p>
      </label>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
