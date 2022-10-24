import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const StyledForm = styled.form`
  padding: 2rem;
  margin: 3rem;

  div > *,
  input[type="submit"] {
    display: block;
    width: 30%;
    margin: 2rem auto;
  }

  input[type="text"],
  textarea {
    font-size: 2rem;
    padding: 5px 10px;
    font-weight: 500;
  }

  input[type="submit"] {
    width: max-content;
    padding: 10px 20px;
    border: none;
    font-weight: 600;
    font-size: 2rem;
    border-radius: 5px;
    transition: all 0.3s ease-in-out;

    &:hover {
      padding: 10px 30px;
      cursor: pointer;
    }
  }
`;

const RuleForm = ({ rules, setRules }) => {
  const { id } = useParams();
  const [ruleDatas, setRuleDatas] = useState({ title: "", description: "" });
  const [titleErrors, setTitleErrors] = useState([]);
  const [descriptionErrors, setDescriptionErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      if (rules.length !== 0) {
        setRuleDatas({
          title: rules[id].title,
          description: rules[id].description || "",
        });
      }
    }

    return () => {
      setRuleDatas({ title: "", description: "" });
    };
  }, [id, rules]);

  const validateTitle = (title) => {
    let errors = [];
    if (title.length > 0) {
      if (title.length <= 50) {
        errors = [];
        return true;
      } else {
        errors.push("50 Characters maximum");
      }
    } else {
      errors.push("Required");
    }

    return errors;
  };

  const validateDescription = (desc) => {
    let errors = [];

    if (desc === "") {
      errors = [];
      return true;
    } else if (desc.length >= 5 && desc.length <= 100) {
      errors = [];
      return true;
    } else {
      errors.push("5 Characters minimum - 100 Caracters maximum");
    }

    return errors;
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setRuleDatas((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const titleValidation = validateTitle(ruleDatas.title);
    const descriptionValidation = validateDescription(ruleDatas.description);

    if (titleValidation !== true) {
      setTitleErrors([...titleValidation]);
    } else {
      setTitleErrors([]);
    }

    if (descriptionValidation !== true) {
      setDescriptionErrors([...descriptionValidation]);
    } else {
      setDescriptionErrors([]);
    }

    if (titleValidation === true && descriptionValidation === true) {
      if (id) {
        if (window.confirm(`You will Update the Rule : ${ruleDatas.title}`)) {
          const newRules = [...rules];

          newRules[id] = {
            title: ruleDatas.title,
            description: ruleDatas.description,
          };

          setRules({ loaded: true, data: newRules });
        }
      } else {
        if (window.confirm(`You will create a new Rule : ${ruleDatas.title}`)) {
          const newRules = [
            ...rules,
            { title: ruleDatas.title, description: ruleDatas.description },
          ];

          setRules({ loaded: true, data: newRules });
        }
      }

      navigate(`/`);
    }
  };

  return (
    <StyledForm
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <div>
        <label htmlFor="title">
          Title<span className="required">*</span> :
        </label>
        <input
          type="text"
          name="title"
          placeholder="Type the title here..."
          value={ruleDatas.title}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        {titleErrors &&
          titleErrors.map((error, index) => {
            return (
              <p key={index} className="error">
                /!\ {error}
              </p>
            );
          })}
      </div>

      <div>
        <label htmlFor="description">Description :</label>
        <textarea
          cols="30"
          rows="10"
          placeholder="Description"
          name="description"
          value={ruleDatas.description}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        {descriptionErrors &&
          descriptionErrors.map((error, index) => {
            return (
              <p key={index} className="error">
                /!\ {error}
              </p>
            );
          })}
      </div>
      <input type="submit" />
    </StyledForm>
  );
};

export default RuleForm;