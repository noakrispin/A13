// FormWrap component definition
const FormWrap = ({ children }: { children: React.ReactNode }) => {
  return (
    // Outer container div for the form
    <div
      className="
      min-h-fit
      h-full
      flex
      items-center
      justify-center
      pb-12
      pt-24"
    >
      {/* Inner container div for the form */}
      <div
        className="max-w-[650px]
        w-full
        flex
        flex-col
        gap-6
        items-center
        shadow-xl
        shadow-violet-300
        rounded-md
        p-4
        md:p-8"
      >
        {/* Rendering child components inside the FormWrap */}
        {children}
      </div>
    </div>
  );
};

export default FormWrap; // Exporting the FormWrap component
