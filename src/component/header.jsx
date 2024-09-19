import { ThemeContext } from "../context/themeContext";

function Header() {

    const { theme, setTheme } = useContext(ThemeContext);
    
    return(
      
        <>
  
  <nav 
  className={`
    navbar
    ${theme == "light" ? "bg-white text-gray-600" : "bg-gray-800 text-white"}
     body-font`}
  >
    <div className="logo">MyWebsite</div>
    <ul>
      <li>
        <a href="#">Home</a>
      </li>
      <li>
        <a href="#">About</a>
      </li>
      <li>
        <a href="#">Services</a>
      </li>
      <li>
        <a href="#">Contact</a>
      </li>
    </ul>
    <button
     onPress={() => {
        if (theme === "light") {
          setTheme("dark");
        } else {
          setTheme("light");
        }
      }}
      label={theme === "light" ? "Make it Dark" : "Make it Light"}
    ></button>
  </nav>
</>

    )
}

export default Header