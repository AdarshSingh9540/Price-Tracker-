export function LoadingSpinner() {
  return (
    <div className="text-center py-16">
      <div className="relative w-20 h-20 mx-auto mb-6">
        <div className="absolute inset-0 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
        <div className="absolute inset-3 border-t-4 border-blue-400 border-solid rounded-full animate-spin animation-delay-150"></div>
        <div className="absolute inset-6 border-t-4 border-blue-200 border-solid rounded-full animate-spin animation-delay-300"></div>
      </div>
      <p className="text-xl font-medium text-gray-700 mb-2">Searching for the best prices...</p>
      <p className="text-gray-500">Comparing prices across multiple websites</p>
    </div>
  );
}