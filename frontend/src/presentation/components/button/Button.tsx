import React from "react";

interface ButtonProps {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, icon, onClick, className }) => {
  return (
    <button
      className={`flex items-center justify-center px-4 py-2 border rounded ${className}`}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      <span>{label}</span>
    </button>
  );
};

export default Button;
