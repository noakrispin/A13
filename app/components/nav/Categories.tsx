'use client';
import React from 'react';
import Container from '../Container';
import { categories } from '@/Utils/categories';
import Category from './Category';
import { usePathname, useSearchParams } from 'next/navigation';

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/';
    if (!isMainPage) {
        return null;
    }

    return (
        <div>
            <Container>
                <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
                    {/* Render each category as a Category component */}
                    {categories.map((item) => (
                        <Category
                            key={item.label}
                            label={item.label}
                            Icon={item.icon}
                            selected={category === item.label || (category == null && item.label === 'All')}
                            // Ensure no accidental 'dataSlot' prop passed here
                        />
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Categories;
