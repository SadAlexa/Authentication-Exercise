import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useState } from "react";

const loginSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
}).required()


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

    const onSubmit = (data: any) => {
        console.log(data)
        onSuccess()
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
   return "aaaaaa"
} 



export default LoginForm