import React, { useState } from "react";
import styled from "styled-components";
import { MdAdd } from "react-icons/md";
import axios from "axios";

export default function TodoCreate({ onAdd }) {
  const [text, setText] = useState("");

  const token = localStorage.getItem("access_token");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `https://www.pre-onboarding-selection-task.shop/todos`,
      headers: { Authorization: `Bearer ${token}` },
      data: { todo: text },
    })
      .then(() => window.location.reload())
      .catch((err) => {
        console.log(err);
      });
    setText("");
  };

  return (
    <TodoForm onSubmit={handleSubmit}>
      <Input
        data-testid="new-todo-input"
        type="text"
        placeholder="오늘 할 일을 작성해 주세요!"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button data-testid="new-todo-add-button">
        <MdAdd />
      </Button>
    </TodoForm>
  );
}

const TodoForm = styled.form`
  width: 100%;
  height: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 300px;
  height: 40px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border: none;
  outline: none;
  padding: 10px;
  background-color: var(--color-input);
`;

const Button = styled.button`
  width: 50px;
  height: 40px;
  background-color: var(--color-input);
  color: var(--color-text);
  border: none;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;
