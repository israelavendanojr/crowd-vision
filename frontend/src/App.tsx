import { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState("...");

  useEffect(() => {
    fetch("http://localhost:5001/api/")
      .then(res => res.json())
      .then(data => setMessage(data.message));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-3xl text-white-600">
      {message}
    </div>
  );
}

export default App;
