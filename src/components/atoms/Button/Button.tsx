import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) => {
  const baseStyles = "font-medium transition-all rounded focus:outline-none focus:ring-2 active:scale-95";

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-200",
    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-200",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-200",
    ghost: "text-slate-700 hover:bg-slate-100 focus:ring-slate-200",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface ChatToggleButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const ChatToggleButton: React.FC<ChatToggleButtonProps> = ({
  isOpen,
  onToggle,
}) => {
  return (
    <button
      onClick={onToggle}
      aria-label={isOpen ? "Tutup chat" : "Buka chat"}
      className={`group relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 cursor-pointer shadow-lg ${
        isOpen
          ? "bg-blue-600 hover:bg-blue-700 shadow-slate-800/30 rotate-0"
          : "bg-white-100 hover:bg-white-100 shadow-blue-600/40"
      }`}
    >
      {/* Pulse ring — only when closed */}
      {!isOpen && (
        <span className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20 pointer-events-none" />
      )}

      {/* Avatar / Icon swap */}
      <span
        className={`relative flex items-center justify-center transition-all duration-300 ${
          isOpen ? "rotate-90 scale-0" : "rotate-0 scale-100"
        }`}
      >
        <img
          src="/assets/logo/logo_gestory1.svg"
          alt="Gestory"
          className="w-12 h-12 pointer-events-none"
        />
      </span>
      <span
        className={`absolute flex items-center justify-center text-white transition-all duration-300 ${
          isOpen ? "rotate-0 scale-100" : "-rotate-90 scale-0"
        }`}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </span>
    </button>
  );
};
