import styled from "styled-components";

import Rule from "./Rule";
import { ThemeContext } from "../../ThemeContext";
import { useContext } from "react";

const StyledRuleList = styled.section`
  .theme {
    padding: 5px 10px;
    border: none;
    font-weight: 600;
    font-size: 15px;
    display: block;
    margin: 10px auto;
    border-radius: 5px;
    transition: all 0.3s ease-in-out;

    &:hover {
      padding: 5px 20px;
      cursor: pointer;
    }
  }

  &.light {
    h1 {
      color: #2d2d2d;
      font-size: 4rem;
      text-align: center;
    }

    .theme {
      background: #2d2d2d;
      color: #e3e3e3;
    }

    main {
      margin: 0 auto;

      > div {
        background-color: #e3e3e3;
        border-radius: 5px;
        padding: 1rem 2rem;
        margin: 3rem;
      }
    }
  }

  &.dark {
    h1 {
      color: white;
      font-size: 4rem;
      text-align: center;
    }

    main {
      margin: 0 auto;

      > div {
        background-color: #cdcdcd;
        border-radius: 5px;
        padding: 1rem 2rem;
        margin: 3rem;
      }
    }
  }
`;

const RuleList = ({ rules, setRules }) => {
  const { theme, setTheme } = useContext(ThemeContext);

  const deleteRule = (ruleId) => {
    if (
      window.confirm(
        `The Rule Nº${ruleId + 1}: "${rules[ruleId].title}" will be delete!`
      )
    ) {
      rules.splice(ruleId, 1);
      setRules({ loaded: true, data: rules });
    }
  };

  const changeTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <StyledRuleList className={theme}>
      <header>
        <h1>Leave the code cleaner than you found it.</h1>
        <button
          className="theme"
          onClick={() => {
            changeTheme();
          }}
        >
          Switch Theme
        </button>
      </header>

      <main>
        {rules.map((rule, id) => (
          <div key={id}>
            <Rule id={id} deleteRuleFunc={deleteRule} {...rule} />
          </div>
        ))}
      </main>
    </StyledRuleList>
  );
};

export default RuleList;
