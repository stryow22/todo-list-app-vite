import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import {
  addTodo,
  toggleTodo,
  editTodo,
  deleteTodo,
  setCategoryFilter,
} from "../../services/todoCRUD";
import { Button, Col, Container, Row } from "react-bootstrap";

const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => {
    const { todos, categoryFilter } = state.todo;
    if (categoryFilter === "Complete") {
      return todos.filter((todo) => todo.completed);
    } else if (categoryFilter === "Not Complete") {
      return todos.filter((todo) => !todo.completed);
    }
    return todos;
  });

  const dispatch = useDispatch<AppDispatch>();
  const [newTodoText, setNewTodoText] = React.useState("");

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      dispatch(addTodo(newTodoText));
      setNewTodoText("");
    }
  };

  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const handleEditTodo = (id: number, text: string) => {
    dispatch(editTodo({ id, text }));
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleCategoryFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(setCategoryFilter(e.target.value));
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2 className='text-center my-5 fw-bold'>Whats Plan for Today?</h2>
          <div className='my-3'>
            <input
              type='text'
              className='form-control form-control-lg mb-3'
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              placeholder='Masukan ToDo Kamu'
            />
            <Button className='btn-lg btn-block w-100' onClick={handleAddTodo}>
              Add Todo
            </Button>
          </div>

          <div className='dropdown my-3'>
            <select
              className='btn btn-block btn-outline-secondary dropdown-toggle w-100'
              onChange={handleCategoryFilterChange}
            >
              <option value='All'>All</option>
              <option value='Complete'>Complete</option>
              <option value='Not Complete'>Not Complete</option>
            </select>
          </div>

          <ul>
            {todos.map((todo) => (
              <div className='form-check' key={todo.id}>
                <input
                  type='checkbox'
                  className='form-check-label'
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                />
                <input
                  type='text'
                  className='m-2 w-50'
                  value={todo.text}
                  onChange={(e) => handleEditTodo(todo.id, e.target.value)}
                />
                <Button
                  className='btn-sm m-2'
                  variant='danger'
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default TodoList;
