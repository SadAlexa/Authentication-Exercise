import { User } from "../../../domain/entities/User";

const Sidebar: React.FC<User> = ({ name, surname, email }) => {
  return (
    <aside className="card w-64">
      <h2 className="text-xl font-bold">
        {name} {surname}
      </h2>
      <a href={`mailto:${email}`} className="text-gray-600 dark:text-gray-400">
        {email}
      </a>
    </aside>
  );
};

export default Sidebar;
