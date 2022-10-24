import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  margin: 0.5rem;
`;

const BtnLike = ({ title, iconName }) => {
  const [value, setValue] = useState(0);

  const handleClick = () => {
    setValue(value + 1);
  };

  return (
    <StyledButton type="button" title={title} onClick={handleClick}>
      {value} <FontAwesomeIcon icon={`fa-solid ${iconName}`} />
    </StyledButton>
  );
};

BtnLike.propTypes = {
  title: PropTypes.string,
  iconName: PropTypes.string,
};

export default BtnLike;
