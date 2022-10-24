import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import BtnLike from "../Buttons/BtnLike";
import BtnDelete from "../Buttons/BtnDelete";

const RuleTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const FlexInline = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  justify-content: space-between;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
`;

const RuleDescription = styled.p`
  font-size: 1.5rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Rule = ({ id, title, description, deleteRuleFunc }) => {
  const [folded, setFolded] = useState(false);

  const handleClickFold = () => {
    folded ? setFolded(false) : setFolded(true);
  };

  return (
    <>
      <FlexInline
        onClick={() => {
          handleClickFold();
        }}
      >
        <RuleTitle>{title}</RuleTitle>
        <ArrowButton>
          {!folded && <FontAwesomeIcon icon="fa-solid fa-caret-right" />}
          {folded && <FontAwesomeIcon icon="fa-solid fa-caret-down" />}
        </ArrowButton>
      </FlexInline>
      {folded && (
        <div>
          {description && <RuleDescription>{description}</RuleDescription>}
          <ButtonsContainer>
            <BtnLike title="+1" iconName="fa-thumbs-up" />
            <BtnLike title="-1" iconName="fa-thumbs-down" />
            <BtnDelete deleteRuleFunc={deleteRuleFunc} id={id} />
          </ButtonsContainer>
        </div>
      )}
    </>
  );
};

Rule.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  deleteRuleFunc: PropTypes.func,
};

export default Rule;
