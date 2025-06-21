const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-8">
      <div className="bg-white rounded-xl shadow-lg p-10 text-center max-w-md">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Tailwind Test</h1>
        <p className="text-lg text-gray-700">
          You're seeing <span className="font-semibold text-green-800">Tailwind</span> in action 🎉
        </p>
        <button className="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
          Test Button
        </button>
      </div>
    </div>
  );
};

export default App;
