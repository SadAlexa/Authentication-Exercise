import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { registerSchema } from "../../../validation/RegisterSchema"

const RegisterForm = ({ onSuccess }: { onSuccess: () => void }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerSchema),
    })

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [image, setImage] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { register: authRegister } = useAuth();

    const onSubmit = (data: any) => {
        console.log(data)

        try {
            authRegister(name, surname, email,/*  image, */ password).then(() => {
                onSuccess();
            });
        } catch (error) {
            console.error('Registration failed:', error);
        }
    }

    return (
        // TODO: improve accessibility
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Name:
                <input type="text" placeholder="Name" {...register("name")} onChange={(e) => setName(e.target.value)} value={name} />
                <p>{errors.name?.message}</p>
            </label>
            <label>
                Surname:
                <input type="text" placeholder="Surname" {...register("surname")} onChange={(e) => setSurname(e.target.value)} value={surname} />
                <p>{errors.surname?.message}</p>
            </label>
            <label>
                Email:
                <input type="text" placeholder="Email" {...register("email")} onChange={(e) => setEmail(e.target.value)} value={email} />
                <p>{errors.email?.message}</p>
            </label>
            <label>
                Date of birth:
                <input type="date" placeholder="Date of birth" {...register("dateOfBirth")} onChange={(e) => setDateOfBirth(e.target.value)} value={dateOfBirth} />
                <p>{errors.dateOfBirth?.message}</p>
            </label>
            <label>
                Image:
                <input type="image" placeholder="Image" {...register("image")} onChange={(e) => setImage(e.target.value)} value={image} />
                <p>{errors.image?.message}</p>
            </label>
            <label>
                Password:
                <input type="password" placeholder="Password" {...register("password")} onChange={(e) => setPassword(e.target.value)} value={password} />
                <p>{errors.password?.message}</p>
            </label>
            <label>
                Confirm password:
                <input type="password" placeholder="Confirm password" {...register("confirmPassword")} onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                <p>{errors.confirmPassword?.message}</p>
            </label>
            <button type="submit">Register</button>
        </form>
    )
}

export default RegisterForm