import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  margin: 0.5rem;
`;

const BtnDelete = ({ id, deleteRuleFunc }) => {
  return (
    <StyledButton type="button" title="del" onClick={() => deleteRuleFunc(id)}>
      <FontAwesomeIcon icon="fa-solid fa-trash" />
    </StyledButton>
  );
};

BtnDelete.propTypes = {
  id: PropTypes.number,
  deleteRuleFunc: PropTypes.func,
};

export default BtnDelete;
