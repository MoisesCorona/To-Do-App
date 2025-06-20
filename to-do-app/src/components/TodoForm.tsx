import { useState } from 'react';
import type { Todo, Category } from '../types/todo';
import styles from './TodoForm.module.css';

interface TodoFormProps {
  addTodo: (todo: Todo) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [category, setCategory] = useState<Category>('Work');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !text.trim()) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      text,
      category,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    addTodo(newTodo);
    setTitle('');
    setText('');
    setCategory('Work');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
        required
      />
      <input
        type="text"
        placeholder="Details..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={styles.input}
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as Category)}
        className={styles.select}
      >
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="study">Study</option>
        <option value="other">Other</option>
      </select>
      <button type="submit" className={styles.button}>
        Add
      </button>
    </form>
  );
};

export default TodoForm;





