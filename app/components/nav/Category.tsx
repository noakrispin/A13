'use client';
import { useCallback, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { IconType } from 'react-icons';
import { FiCheckCircle } from 'react-icons/fi';
import { useTheme } from '@emotion/react';

interface CategoryProps {
  label: string;
  Icon?: React.ComponentType<{ className?: string }>;
  selected?: boolean;
}

const Category: React.FC<CategoryProps> = ({ label, Icon = FiCheckCircle, selected }) => {
  const router = useRouter();
  const params = useSearchParams();
  const [isDarkMode, setIsDarkMode] = useState(false); // State to keep track of dark mode


  // Function to handle click event on category
  const handleClick = useCallback(() => {
     // Redirect to homepage if 'All' category is selected, otherwise update category in URL query
    if (label === 'All') {
      router.push('/');
    } else {
      let currentQuery = {};
      if (params) {
        currentQuery = queryString.parse(params.toString());
      }
      const updatedQuery: any = {
        ...currentQuery,
        category: label,
      };
      const url = queryString.stringifyUrl(
        {
          url: '/',
          query: updatedQuery,
        },
        { skipNull: true }
      );
      router.push(url);
    }
  }, [label, params, router]);

    // Function to toggle dark mode
    const toggleDarkMode = () => {
      setIsDarkMode((prevMode) => !prevMode);
    };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-slate-300 transition cursor-pointer ${
        selected ? 'border-b-slate-300 text-slate-300' : 'border-transparent'
      } ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
    >
      <Icon size={20} /> {/* Render the icon component */}
      <div className="font-medium text-sm">{label}</div> {/* Render the category label */}
    </div>
  );
};

export default Category;