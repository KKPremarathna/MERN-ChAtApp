import "./index.css"; // make sure you import global styles
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="p-4 h-screen flex items-center justify-center text-white text-3xl">
      <Home/>
    </div>
  );
}

export default App;
