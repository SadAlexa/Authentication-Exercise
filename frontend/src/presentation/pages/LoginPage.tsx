import LoginForm from "../components/auth/LoginForm";

export function LoginPage({ onSuccess }: { onSuccess: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Login</h1>
      <LoginForm onSuccess={onSuccess} />
      <p className="mt-4">
        Don't have an account?{" "}
        <a className="text-blue-500 hover:underline" href="/register">
          Register
        </a>
      </p>
    </div>
  );
}

export default LoginPage;
