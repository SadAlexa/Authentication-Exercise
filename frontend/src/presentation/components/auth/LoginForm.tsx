import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { loginSchema } from "../../../validation/LoginSchema";

const LoginForm = ({ onSuccess }: { onSuccess: () => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    })

    const { login: authLogin } = useAuth();

    const onSubmit = (data: any) => {
        console.log(data)
        try {
            authLogin(email, password).then(() => {
                onSuccess();
            })
        } catch (error) {
            console.error('Login failed:', error);
        }
    }

    return (
        // TODO: improve accessibility
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Email:
                <input type="text" placeholder="Email" {...register("email")} onChange={(e) => setEmail(e.target.value)} value={email} />
                <p>{errors.email?.message}</p>
            </label>
            <label>
                Password:
                <input type="password" placeholder="Password" {...register("password")} onChange={(e) => setPassword(e.target.value)} value={password} />
                <p>{errors.password?.message}</p>
            </label>
            <button type="submit">Login</button>
        </form>
    )
} 



export default LoginForm