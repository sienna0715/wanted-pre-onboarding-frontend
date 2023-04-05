import React, { useState } from "react";
import styled from "styled-components";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";
import axios from "axios";

export default function TodoItem({ item, token }) {
  const [text, setText] = useState(item?.todo);
  const [edited, setEdited] = useState(false);

  const handleUpdate = () => {
    
    axios({
      method: "put",
      url: `https://www.pre-onboarding-selection-task.shop/todos/${item?.id}`,
      headers: { Authorization: `Bearer ${token}` },
      data: { todo: text, isCompleted: !item?.isCompleted },
    })
      .then(() => window.location.reload())
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = () => {
    axios({
      method: "delete",
      url: `https://www.pre-onboarding-selection-task.shop/todos/${item?.id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => window.location.reload())
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ItemBox>
      <Label>
        <CheckBox onClick={handleUpdate}>
          {item?.isCompleted ? <GrCheckboxSelected /> : <GrCheckbox />}
        </CheckBox>
        {edited ? (
          <>
            <Input
              data-testid="modify-input"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button data-testid="submit-button" onClick={handleUpdate}>
              submit
            </Button>
            <Button
              data-testid="cancel-button"
              onClick={() => setEdited(false)}
            >
              cancle
            </Button>
          </>
        ) : (
          <>
            <Text>{item?.todo}</Text>
            <HoverBox className="hover">
              <EditButton data-testid="modify-button">
                <MdModeEdit onClick={() => setEdited(true)} />
              </EditButton>
              <Deletebutton data-testid="delete-button">
                <MdDelete onClick={handleDelete} />
              </Deletebutton>
            </HoverBox>
          </>
        )}
      </Label>
    </ItemBox>
  );
}

const ItemBox = styled.li`
  height: max-content;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  &:hover .hover {
    display: block;
  }
`;

const Label = styled.label`
  width: 100%;
  height: 2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const CheckBox = styled.div`
  width: 1rem;
  height: 1rem;
  margin-right: 1rem;
`;

const Input = styled.input`
  flex-grow: 2;
  background: none;
  outline: none;
  border: none;
  border-bottom: 1px solid black;
  margin-right: 1rem;
  font-size: 1rem;
`;

const Text = styled.span`
  flex-grow: 2;
`;

const HoverBox = styled.div`
  display: ${(props) => (props.block ? props.block : "none")};
  background-color: transparent;
  color: var(--color-text);
  border: none;
  font-size: 1rem;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  &:hover {
    color: var(--color-gray);
  }
`;
const Deletebutton = styled.button`
  background: none;
  border: none;
  margin-left: 0.5rem;
  &:hover {
    color: var(--color-red);
  }
`;

const Button = styled.button`
  padding: 0.1rem 0.5rem;
  background-color: var(--color-main);
  border: 1px solid black;
  &:hover {
    background-color: var(--color-scroll);
    color: white;
  }
`;
