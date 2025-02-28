import LoginForm from "../components/auth/LoginForm";

export function LoginPage({ onSuccess }: { onSuccess: () => void }) {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm onSuccess={onSuccess} />
      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
}

export default LoginPage;
