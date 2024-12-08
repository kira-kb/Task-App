import { useEffect, useState } from "react";
import logo from "../assets/favicon.png";
import useLocalStorage from "./useLocalStorage";

interface TaskFormat {
  id: number;
  name: string;
  time: string;
}

interface SearchProbs {
  storedValue: TaskFormat[];
  setSearchedList: (tasks: TaskFormat[] | null) => void;
}

const Header: React.FC<SearchProbs> = ({ storedValue, setSearchedList }) => {
  const [savedTheme, setSavedTheme] = useLocalStorage<string>("theme", "light");
  const [theme, setTheme] = useState<string>(savedTheme);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    if (!name) return setSearchedList(null);
    const searchedList = storedValue.filter((task) =>
      task.name.startsWith(name)
    );
    setSearchedList(searchedList);
    // console.log(searchedList);
  };
  // ሰ/40/80/250
  useEffect(() => {
    document.documentElement.className = "";
    document.documentElement.classList.add(theme); // this is the 'html' element the base element
    setSavedTheme(theme);
  }, [setSavedTheme, theme]);

  return (
    <header>
      <div className="logo">
        <img src={logo} alt="logo" />
        <span>Task app</span>
      </div>
      <div className="search">
        <input
          type="search"
          name="search"
          autoComplete="off"
          placeholder="Search..."
          onInput={handleInput}
        />
      </div>
      <div className="themeSelector">
        <span
          onClick={() => setTheme("light")}
          className={theme === "light" ? "light activeTheme" : "light"}
        ></span>
        <span
          onClick={() => setTheme("medium")}
          className={theme === "medium" ? "medium activeTheme" : "medium"}
        ></span>
        <span
          onClick={() => setTheme("dark")}
          className={theme === "dark" ? "dark activeTheme" : "dark"}
        ></span>
        <span
          onClick={() => setTheme("gOne")}
          className={theme === "gOne" ? "gOne activeTheme" : "gOne"}
        ></span>
        <span
          onClick={() => setTheme("gTwo")}
          className={theme === "gTwo" ? "gTwo activeTheme" : "gTwo"}
        ></span>
        <span
          onClick={() => setTheme("gThree")}
          className={theme === "gThree" ? "gThree activeTheme" : "gThree"}
        ></span>
      </div>
    </header>
  );
};

export default Header;
