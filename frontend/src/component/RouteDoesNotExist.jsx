const RouteDoesNotExist = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-semibold mb-4">404</h1>
      <p className="text-xl font-medium mb-2">Page Not Found</p>
      <p className="text-gray-600 mb-6">
        The route you are looking for does not exist.
      </p>
    </div>
  );
};

export default RouteDoesNotExist;
