import RegisterForm from "../components/auth/RegisterForm"

export function RegisterPage({ onSuccess }: { onSuccess: () => void }) {
    return (
      <div>
          <h1>Register</h1>
          <RegisterForm onSuccess={onSuccess} />
      </div>
    )
  }
 
  export default RegisterPage