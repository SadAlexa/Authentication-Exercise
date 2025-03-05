import { User } from "../../domain/entities/User";
import Button from "../components/button/Button";
import Header from "../components/common/Header";
import Sidebar from "../components/dashboard/Sidebar";

export function DashboardPage({
  onClick,
  user,
}: {
  onClick: () => void;
  user: User;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Dashboard" />
      <div className="flex-1 flex">
        <Sidebar
          name={user.name}
          surname={user.surname}
          email={user.email}
          password={""}
        />
        <div className="flex-1 flex items-center justify-center">
          <Button label="Logout" onClick={onClick} />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
