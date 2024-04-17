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
        <Suspense fallback={<div>Loading...</div>}>
          <CategoriesContent />
        </Suspense>
      </Container>
    </div>
  );
};

const CategoriesContent = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';
  if (!isMainPage) {
    return null;
  }

  return (
    <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
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