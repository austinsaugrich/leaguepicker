import Home from "./pages/Home";
import "./App.css";
import { Routes, Route, HashRouter } from "react-router-dom";
function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route element={<Home />} path='/'></Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
