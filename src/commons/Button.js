import styled from "styled-components";

export const Button = styled.button`
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 2rem;
  padding: 0.8rem;
  background-color: var(--color-button);
  margin: ${(props) => (props.margin ? props.margin : '')};
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
`;