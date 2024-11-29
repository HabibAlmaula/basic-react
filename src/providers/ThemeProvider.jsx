import { createContext, useContext, useState, useEffect } from "react";
import { IoIosPartlySunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";

const ThemeContext = createContext(null);

const getInitialTheme = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("color-theme");
    if (typeof storedPrefs === "string") {
      return storedPrefs;
    }

    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
    if (userMedia.matches) {
      return "dark";
    }
  }
  return "light";
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  const rawSetTheme = (rawTheme) => {
    const root = window.document.documentElement;
    const isDark = rawTheme === "dark";

    // Remove previous theme class
    root.classList.remove(isDark ? "light" : "dark");
    // Add new theme class
    root.classList.add(rawTheme);

    // Update data attribute for extra specificity
    root.setAttribute("data-theme", rawTheme);

    localStorage.setItem("color-theme", rawTheme);
  };

  useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={`
          w-14 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out
          ${isDark ? "bg-emerald-700" : "bg-amber-500"}
        `}
    >
      <div
        className={`
            w-5 h-5 rounded-full transition-transform duration-200 ease-in-out flex items-center justify-center
            ${
              isDark ? "translate-x-7 bg-emerald-950" : "translate-x-0 bg-white"
            }
          `}
      >
        {isDark ? (
          <FaMoon size={12} className="text-white" />
        ) : (
          <IoIosPartlySunny size={12} className="text-amber-500" />
        )}
      </div>
    </button>
  );
};
