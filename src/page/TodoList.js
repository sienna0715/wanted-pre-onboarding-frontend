import React, { useEffect, useState } from "react";
import TodoItem from "../component/TodoItem";
import TodoCreate from "../component/TodoCreate";
import styled from "styled-components";
import checkerboard from "../asset/bg.jpg";
import { useNavigate } from "react-router-dom";
import { Button } from "../commons/Button";
import axios from "axios";

export default function TodoList() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const token = localStorage.getItem("access_token");

  const getTodos = () => {
    axios({
      method: "get",
      url: `https://www.pre-onboarding-selection-task.shop/todos`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setTodos(res.data))
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogOut = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      {token !== null ? (
        <TodoWrap>
          <LogoutButton onClick={handleLogOut}>Log out</LogoutButton>
          <TodoContainer>
            <ListWrap>
              <ListContainer>
                {todos.map((item) => {
                  return <TodoItem key={item.id} item={item} token={token} />;
                })}
              </ListContainer>
              <TodoCreate />
            </ListWrap>
          </TodoContainer>
        </TodoWrap>
      ) : (
        <Button onClick={() => navigate("/signin")}>로그인하러 가기</Button>
      )}
    </>
  );
}

const TodoWrap = styled.div`
  background-image: url(${checkerboard});
  background-size: contain;
  width: 500px;
  height: 600px;
  border-radius: 20px;
  box-shadow: 5px 5px 30px 2px rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: var(--color-text);
`;

const TodoContainer = styled.div`
  background-color: var(--color-main);
  width: 450px;
  height: 500px;
  transform: rotate(-2deg);
  margin-top: 25px;
  border: 1px solid var(--color-border);
`;

const ListWrap = styled.div`
  width: 100%;
  height: 490px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const ListContainer = styled.ul`
  flex: 2;
  width: 100%;
  padding: 20px;
  overflow-y: auto;
`;

const LogoutButton = styled.button`
  width: 5rem;
  height: 2rem;
  position: fixed;
  top: 2rem;
  right: 3rem;
  background-color: var(--color-main);
  border: 1px solid black;
`;
