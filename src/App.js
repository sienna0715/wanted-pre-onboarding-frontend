import { Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './page/Home';
import SignIn from './page/SignIn';
import SignUp from './page/SignUp';
import TodoList from './page/TodoList';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/todo" element={<TodoList />} />
      </Routes>
    </>
  );
}

export default App;
