import React, { useState } from 'react';
import type { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, deleteTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleSave = () => {
    if (editedTitle.trim() === '') return;
    editTodo({ ...todo, title: editedTitle });
    setIsEditing(false);
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />

      {isEditing ? (
        <>
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          /> 
          <button onClick={handleSave}>💾</button>
        </>
      ) : (
        <>
          <span>{todo.title} - {todo.category}</span>
          <button onClick={() => setIsEditing(true)}>✏️</button>
        </>
      )}

      <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
    </li>
  );
};

export default TodoItem;

