import React, { useEffect, useMemo, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import {
  faCaretDown,
  faCaretRight,
  faThumbsUp,
  faThumbsDown,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import RuleList from "./components/RuleList/RuleList";
import Loader from "./components/Loader";
import { ThemeContext } from "./ThemeContext";
import GlobalStyle from "./GlobalStyle";

library.add(fas, faCaretDown, faCaretRight, faThumbsUp, faThumbsDown, faTrash);

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

    setTimeout(() => {
      fetchData();
    }, 1500);
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
