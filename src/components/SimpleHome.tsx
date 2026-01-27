export const SimpleHome = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-12 gap-4 h-[550px]">
        <div className="col-span-12 md:col-span-8 bg-gray-200 rounded-sm flex items-center justify-center">
          <h2 className="text-4xl font-bold">Hero Section</h2>
        </div>
        <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
          <div className="flex-1 bg-blue-100 rounded-sm flex items-center justify-center">
            <p>Banner 1</p>
          </div>
          <div className="flex-1 bg-orange-100 rounded-sm flex items-center justify-center">
            <p>Banner 2</p>
          </div>
        </div>
      </div>
    </div>
  );
};