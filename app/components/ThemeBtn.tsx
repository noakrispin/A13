'use client';
import { useTheme } from 'next-themes';
import { FiMoon, FiSun } from 'react-icons/fi';

function ThemeBtn() {


    const { theme, setTheme } = useTheme(); // Use useTheme hook to get the current theme and setTheme function

    const onChangeBtn = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark'); // Toggle between 'light' and 'dark' themes
    };
    return (
        <label className='relative inline-flex items-center'>
            <input
            type='checkbox'
            value=""
            className='sr-only peer'
            onChange={onChangeBtn}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600">
            <div className="absolute left-0 top-0 w-6 h-6 flex items-center justify-center rounded-full transition-transform duration-300 peer-checked:transform peer-checked:translate-x-full peer-checked:bg-white">
                    <FiMoon className={`text-${theme === 'dark' ? 'blue' : 'gray'}-400`} />
                </div>
                <div className="absolute right-0 top-0 w-6 h-6 flex items-center justify-center rounded-full transition-transform duration-300 peer-checked:transform peer-checked:-translate-x-full peer-checked:bg-blue-300">
                    <FiSun className={`text-${theme === 'dark' ? 'gray' : 'yellow'}-500`} />
                </div>
            </div>
        </label>
    )
    }

export default ThemeBtn