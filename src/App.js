import "./App.css";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import React from "react";
function App() {
  const [darkMode, setDarkMode] = React.useState(true);
  function toggleDarkMode() {
    setDarkMode((preData) => !preData);
  }
  return (
    <section className={darkMode ? "dark" : ""}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Main darkMode={darkMode} />
    </section>
  );
}

export default App;
