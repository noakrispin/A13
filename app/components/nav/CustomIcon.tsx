import { IconType } from 'react-icons';
import React from 'react';

interface CustomIconProps {
  icon: IconType; // Type definition for the icon component
  size?: number; // Optional size property for the icon
  className?: string; // Optional class name property for additional styling
}

const CustomIcon: React.FC<CustomIconProps> = ({ icon: Icon, size = 20, className = '' }) => {
  // Functional component 'CustomIcon' accepting props
  return <Icon size={size} className={className} />; // Rendering the provided icon component with specified size and class name
};

export default CustomIcon;