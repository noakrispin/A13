'use client';
import { useTheme } from 'next-themes';
import { FiMoon, FiSun } from 'react-icons/fi';

function ThemeBtn() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark'); // Toggle between 'dark' and 'light' themes
    };

    return (
        <button className='relative inline-flex items-center cursor-pointer focus:outline-none' onClick={toggleTheme}>
            <div className="w-11 h-6 bg-gray-200 rounded-full dark:bg-gray-700">
                <div className="absolute left-0 top-0 w-6 h-6 flex items-center justify-center rounded-full transition-transform duration-300 transform peer-checked:translate-x-full">
                    <FiMoon className={`text-${theme === 'dark' ? 'blue' : 'gray'}-400`} />
                </div>
                <div className="absolute right-0 top-0 w-6 h-6 flex items-center justify-center rounded-full transition-transform duration-300 transform peer-checked:-translate-x-full">
                    <FiSun className={`text-${theme === 'dark' ? 'gray' : 'yellow'}-500`} />
                </div>
            </div>
        </button>
    );
}

export default ThemeBtn;
