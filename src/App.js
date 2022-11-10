import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RuleList from "./components/RuleList/RuleList";
import { ThemeContext } from "./ThemeContext";
import GlobalStyle from "./GlobalStyle";
import Layout from "./components/Layout";
import RuleForm from "./components/RuleList/RuleForm";

const App = () => {
  const [rulesData, setRulesData] = useState({ loaded: false, data: [] });
  const [theme, setTheme] = useState("light");
  // Create a memoized value for context, keeping reference across renders
  const themeContextValue = useMemo(
    () => ({ theme, setTheme }),
    [theme, setTheme]
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("/rules");
      result.json().then((data) => {
        setRulesData({ loaded: true, data: data });
      });
    };
    fetchData();
  }, []);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <GlobalStyle theme={theme}></GlobalStyle>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Layout />}>
            <Route
              exact
              path="/"
              element={
                <RuleList rules={rulesData.data} setRules={setRulesData} />
              }
            />
            <Route
              exact
              path="/new"
              element={
                <RuleForm rules={rulesData.data} setRules={setRulesData} />
              }
            />
            <Route
              exact
              path="/edit/:id"
              element={
                <RuleForm rules={rulesData.data} setRules={setRulesData} />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
};

export default App;
