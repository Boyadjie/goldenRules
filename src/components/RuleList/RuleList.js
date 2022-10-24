import { useContext } from "react";
import styled from "styled-components";

import Rule from "./Rule";
import Loader from "../Loader";
import { ThemeContext } from "../../ThemeContext";

const StyledRuleList = styled.div`
  &.light {
    > div {
      margin: 0 auto;

      section {
        background-color: #e3e3e3;
        border-radius: 5px;
        padding: 1rem 2rem;
        margin: 3rem;
      }
    }
  }

  &.dark {
    > div {
      margin: 0 auto;

      section {
        background-color: #cdcdcd;
        border-radius: 5px;
        padding: 1rem 2rem;
        margin: 3rem;
      }
    }
  }
`;

const RuleList = ({ rules, setRules }) => {
  const { theme } = useContext(ThemeContext);

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

  return rules.length !== 0 ? (
    <StyledRuleList className={theme}>
      <div>
        {rules.map((rule, id) => (
          <section key={id}>
            <Rule id={id} deleteRuleFunc={deleteRule} {...rule} />
          </section>
        ))}
      </div>
    </StyledRuleList>
  ) : (
    <Loader />
  );
};

export default RuleList;
