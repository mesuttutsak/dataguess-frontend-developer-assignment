import React from 'react';
import { renderClasses } from '../utils/renderClasses';

interface ButtonProps {
  children: React.ReactNode;
  theme?: string;
  className?: string[]; 
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, theme, className : customClass = [], onClick }) => (
  <button className={renderClasses([theme, ...customClass])} onClick={onClick}>{children}</button>
);

export default Button;