import Button from "../components/button/Button";
import Header from "../components/common/Header";

export function DashboardPage({ onClick }: { onClick: () => void }) {
  return (
    <>
      <Header title="Dashboard" />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Button label="Logout" onClick={onClick} />
      </div>
    </>
  );
}

export default DashboardPage;
