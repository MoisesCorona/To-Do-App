import React from 'react';
import TodoItem from './TodoItem'; // Adjust path if needed
import type { Todo } from '../types/todo';


interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (updatedTodo: Todo) => void;
}


const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, deleteTodo, editTodo }) => {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;


