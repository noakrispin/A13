import { IconType } from 'react-icons';
import React from 'react';

interface CustomIconProps {
  icon: IconType;
  size?: number;
  className?: string;
}

const CustomIcon: React.FC<CustomIconProps> = ({ icon: Icon, size = 20, className = '' }) => {
  return <Icon size={size} className={className} />;
};

export default CustomIcon;