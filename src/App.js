import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import RuleList from "./components/RuleList/RuleList";
import Loader from "./components/Loader";
import { ThemeContext } from "./ThemeContext";
import GlobalStyle from "./GlobalStyle";

const LoaderContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  const [rulesData, setRulesData] = useState({ loaded: false, data: null });
  const [theme, setTheme] = useState("light");
  // Create a memoized value for context, keeping reference across renders
  const themeContextValue = useMemo(
    () => ({ theme, setTheme }),
    [theme, setTheme]
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("./data/rules.json");
      result.json().then((data) => {
        setRulesData({ loaded: true, data: data });
      });
    };

    const timer = setTimeout(() => {
      fetchData();
    }, 1500);

    // executed when the conponent is unmounted
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <GlobalStyle theme={theme}></GlobalStyle>
      {!rulesData.loaded && (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      )}
      {rulesData.loaded && (
        <RuleList rules={rulesData.data} setRules={setRulesData} />
      )}
    </ThemeContext.Provider>
  );
};

export default App;
