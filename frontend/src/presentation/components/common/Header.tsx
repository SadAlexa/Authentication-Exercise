import { useTheme } from "../../style/ThemeContext";
import Button from "../button/Button";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { toggleTheme } = useTheme();
  return (
    <header className="header flex items-center justify-between min-h-[5vh] px-4">
      <div className="flex items-center">
        <img src="src/assets/react.svg" alt="Logo" className="w-8 h-8" />
        <h1 className="text-3xl mx-2">{title}</h1>
      </div>
      <Button label="Toggle Theme" onClick={toggleTheme} />
    </header>
  );
};

export default Header;
