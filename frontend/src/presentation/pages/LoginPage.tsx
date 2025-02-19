import LoginForm from "../../app/components/auth/LoginForm"


export function LoginPage({ onSuccess }: { onSuccess: () => void }) {
    return (
      <div>
          <h1>Login</h1>
          <LoginForm onSuccess={onSuccess} />
      </div>
    )
  }
 
  export default LoginPage