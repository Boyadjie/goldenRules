import { createContext } from "react";

export const ThemeContext = createContext({
  theme: "light",
  setTheme: () => {},
});

// export const ThemeProvider = ({ children }) => {
//   const [role, setTheme] = useState("user");
//   return (
//     <ThemeContext.Provider value={{ role, setTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };
