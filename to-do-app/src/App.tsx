import { useState , useEffect } from 'react';
import type { Todo, Category } from './types/todo';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './styles/theme.css';



function App() {

  // Load to-do from localStorage
  const [todos, setTodos] = useState<Todo[]>(() => {
  const stored = localStorage.getItem('todos');
  return stored ? JSON.parse(stored) : [];
});  

  // Load selected category from localStorage
    const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>(() => {
    const stored = localStorage.getItem('selectedCategory');
    return stored ? (stored as Category | 'All') : 'All';
  });


 // Save selected category
   useEffect(() => {
    localStorage.setItem('selectedCategory', selectedCategory);
  }, [selectedCategory]);

  // Dark mode state with persistence
  const [darkMode, setDarkMode] = useState<boolean>(() => {
  const stored = localStorage.getItem('darkMode');
  return stored ? JSON.parse(stored) : false;
 });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.className = darkMode ? 'dark' : '';
   },   [darkMode]);

   
    // Save to-do to localStorage
    useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

// Add new to-do
  const addTodo = (todo: Todo) => {
    setTodos(prev => [...prev, todo]);
  };

    // Toggle complete status
  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (updatedTodo: Todo) => {
  setTodos(prev =>
    prev.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo))
  );
};


  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const filteredTodos = selectedCategory === 'All'
    ? todos
    : todos.filter(todo => todo.category === selectedCategory);


   return (
    
    <div className="app-container">
     <div className="top-controls">
      <button onClick={() => setDarkMode(prev => !prev)}>
       {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>

     <div className="filter-group">
    <label htmlFor="category-filter">Filter by Category:</label>
    <select
      id="category-filter"
      value={selectedCategory}
      onChange={(e) =>
        setSelectedCategory(e.target.value as Category | 'All')
      }
    >

        <option value="All">All</option>
        <option value="Work">Work</option>
        <option value="personal">Personal</option>
        <option value="study">Study</option>
      </select>
    </div>
  </div>

  <h1>📋 To-Do App with Categories</h1>

  <div className="todo-form">
    <TodoForm addTodo={addTodo} />
  </div>

  <TodoList
    todos={filteredTodos}
    toggleTodo={toggleTodo}
    deleteTodo={deleteTodo}
    editTodo={editTodo}
   />
  </div>  
  ); 
}

export default App;

