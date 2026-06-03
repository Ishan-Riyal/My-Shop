const Loader = () => {
  return (
    <div
      className="fixed inset-0 z-999 flex items-center justify-center bg-white/80 backdrop-blur-sm"
      aria-label="Loading..."
      role="status"
    >
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-600 border-t-transparent shadow-md"></div>
    </div>
  );
};

export default Loader;
