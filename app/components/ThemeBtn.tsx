'use client';
// Import necessary modules and icons
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from 'next-themes';

// Define the ThemeBtn component
function ThemeBtn() {
  // Destructure theme and setTheme from useTheme hook
  const { theme, setTheme } = useTheme();

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Check if the current theme is dark mode
  const isDarkMode = theme === 'dark';

  // Render the button with icons based on the current theme
  return (
    <button
      className="relative inline-flex items-center cursor-pointer focus:outline-none"
      onClick={toggleTheme}
    >
      {/* Container for the moon and sun icons */}
      <div className="w-11 h-6 bg-gray-200 rounded-full dark:bg-gray-700">
        {/* Moon icon */}
        <div className="absolute left-0 top-0 w-6 h-6 flex items-center justify-center rounded-full transition-transform duration-300 transform peer-checked:translate-x-full">
          {/* Conditionally render the moon icon based on the theme */}
          <FiMoon className={isDarkMode ? 'text-blue-400' : 'text-gray-400'} />
        </div>
        {/* Sun icon */}
        <div className="absolute right-0 top-0 w-6 h-6 flex items-center justify-center rounded-full transition-transform duration-300 transform peer-checked:-translate-x-full">
          {/* Conditionally render the sun icon based on the theme */}
          <FiSun className={isDarkMode ? 'text-gray-500' : 'text-yellow-500'} />
        </div>
      </div>
    </button>
  );
}

export default ThemeBtn;