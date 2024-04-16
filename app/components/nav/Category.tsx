import { IconType } from 'react-icons';
import { useCallback,Suspense  } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';

interface CategoryProps {
    label: string;
    Icon: IconType;
    selected?: boolean;
}

const Category: React.FC<CategoryProps> = ({ label, Icon, selected }) => {
    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
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
                {
                    skipNull: true,
                }
            );

            router.push(url);
        }
    }, [label, params, router]);

    return (
        <div onClick={handleClick} className={`flex items-center 
        justify-center text-center gap-1 p-2 border-b-2 
        hover:text-violet-500 transition cursor-pointer
        ${selected ? 'border-b-violet-500 text-violet-500 pointer-events-auto' : 'border-transparent text-violet-200'}
        `}>
            <Icon size={20} /> {/* Render the icon */}
            <div className='font-medium text-sm'>{label}</div>
        </div>
    );
};

export default Category;