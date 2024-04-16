interface CategoryNavItemProps {
  imageUrl: string; // Required prop for the image URL
  label: string; // Required prop for the label text
}

const CategoryNavItem: React.FC<CategoryNavItemProps> = ({ imageUrl, label }) => {
  return (
      <div
          className="relative flex items-center justify-center text-center border-b-2 hover:text-slate-300 transition hover:scale-125  cursor-pointer"
          style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '8px', // Adjust the border radius as desired
              width: '200px', // Adjust the width as desired
              height: '200px', // Adjust the height as desired
          }}
      >
          {/* Render label text over the image */}
          <div className="absolute inset-0 flex items-center justify-center font-bold text-lg bg-black bg-opacity-50">
              {label}
          </div>
      </div>
  );
};

export default CategoryNavItem;
