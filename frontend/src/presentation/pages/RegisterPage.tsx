import RegisterForm from "../components/auth/RegisterForm";

export function RegisterPage({ onSuccess }: { onSuccess: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Register</h1>
      <RegisterForm onSuccess={onSuccess} />
    </div>
  );
}
export default RegisterPage;
