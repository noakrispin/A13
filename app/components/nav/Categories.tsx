'use client';

import { Suspense } from 'react';
import Container from '../Container';
import { categories } from '@/Utils/categories';
import Category from './Category';
import { usePathname, useSearchParams } from 'next/navigation';

const Categories = () => {
  return (
    <div>
      <Container>
         {/* Wrap the CategoriesContent component with Suspense for loading fallback */}
        <Suspense fallback={<div>Loading...</div>}>
          <CategoriesContent />
        </Suspense>
      </Container>
    </div>
  );
};

const CategoriesContent = () => {
  // Get the category parameter from the URL query
  const params = useSearchParams();
  const category = params?.get('category');
  // Get the current pathname
  const pathname = usePathname();

  // Check if the current page is the main page
  const isMainPage = pathname === '/';
  // If it's not the main page, return null (no categories to display)
  if (!isMainPage) {
    return null;
  }

  return (
    <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
      {/* Map over the categories array and render each category */}
      {categories.map((item) => (
        <Category
          key={item.label}
          label={item.label}
          Icon={item.icon}
          selected={category === item.label || (category === null && item.label === 'All')}
        />
      ))}
    </div>
  );
};

export default Categories;