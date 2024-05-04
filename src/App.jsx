import Navbar from "./components/Navbar";
import Task from "./components/Task";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import ThemeProvider from "./components/ThemeProvider";

function App() {
  const [showHomePage, setShowHomePage] = useState(true);
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [showSignUpPage, setShowSignUpPage] = useState(false);
  const [modalDarkMode, setModalDarkMode] = useState(false);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated && !showSignUpPage) {
      setShowLoginPage(true);
    }
  }, [isAuthenticated, showSignUpPage]);

  const navigateToHomePage = () => {
    setShowHomePage(true);
    setShowSignUpPage(false);
  };

  const navigateToLoginPage = () => {
    setShowHomePage(false);
    setShowLoginPage(true);
    setShowSignUpPage(false);
  };

  const navigateToSignUpPage = () => {
    setShowHomePage(false);
    setShowSignUpPage(true);
  };

  const handleSubmitLogin = () => {
    navigateToHomePage();
  };

  const handleSubmitSignUp = () => {
    navigateToLoginPage();
  };

  const HandleToggleMode = () => {
    // Toggle dark mode logic here
    const body = document.querySelector('body');
    body.classList.toggle('dark');

    setModalDarkMode(prevMode => !prevMode);
  }
  return (
    <ThemeProvider>
      <Navbar
        navigateToHomePage={navigateToHomePage}
        navigateToLoginPage={navigateToLoginPage}
        navigateToSignUpPage={navigateToSignUpPage}
        toggleMode={HandleToggleMode}
      />

      {isAuthenticated ? (
        <>
          {showHomePage && (
            <>
              <Task modalDarkMode={modalDarkMode}/>
            </>
          )}
        </>
      ) : (
        <>
          {showSignUpPage ? (
            <SignUp modalDarkMode={modalDarkMode} submitSignUp={handleSubmitSignUp} />
          ) : (
            showLoginPage && <Login submitLogin={handleSubmitLogin} />
          )}
        </>
      )}
    </ThemeProvider>
  );
}

export default App;
