# React Концепции - Примеры из проекта

## 1. useState - Управление состоянием

### Пример 1: HomePage.js - Управление список todos
```javascript
const [todos, setTodos] = useState([]);
const [filter, setFilter] = useState('all');
const [search, setSearch] = useState('');

// Добавление новой задачи
const addTodo = (text) => {
  const newTodo = {
    id: Date.now(),
    text,
    completed: false,
  };
  setTodos([...todos, newTodo]);
};

// Изменение статуса задачи
const toggleTodo = (id) => {
  setTodos(todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  ));
};

// Удаление задачи
const deleteTodo = (id) => {
  setTodos(todos.filter(todo => todo.id !== id));
};
```

### Пример 2: AddTodo.js - Управление input
```javascript
const [text, setText] = useState('');

const handleSubmit = (e) => {
  e.preventDefault();
  if (text.trim()) {
    addTodo(text);
    setText('');  // Очищаем input после добавления
  }
};
```

### Пример 3: SharedTodosPage.js - Управление loading и error
```javascript
const [todos, setTodos] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// Использование:
if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error}</p>;
```

---

## 2. useEffect - Побочные эффекты

### Пример 1: Загрузка из LocalStorage (HomePage.js)
```javascript
// Загрузка при монтировании компонента
useEffect(() => {
  const savedTodos = localStorage.getItem('myTodos');
  if (savedTodos) {
    setTodos(JSON.parse(savedTodos));
  }
}, []);  // Пустой dependency array - запускается 1 раз при монтировании
```

### Пример 2: Сохранение в LocalStorage (HomePage.js)
```javascript
// Сохранение при каждом изменении todos
useEffect(() => {
  localStorage.setItem('myTodos', JSON.stringify(todos));
}, [todos]);  // Запускается всякий раз когда todos изменяется
```

### Пример 3: Загрузка с API (SharedTodosPage.js)
```javascript
useEffect(() => {
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos?_limit=10'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setTodos([]);
    } finally {
      setLoading(false);
    }
  };

  fetchTodos();
}, []);  // Запускается только при монтировании компонента
```

---

## 3. Props - Передача данных между компонентами

### Пример 1: Передача функции родителя в дочерний компонент
```javascript
// HomePage.js (родитель)
<AddTodo addTodo={addTodo} />

// AddTodo.js (дочерний)
function AddTodo({ addTodo }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);  // Вызываем функцию родителя
      setText('');
    }
  };
}
```

### Пример 2: Передача данных и функций в список
```javascript
// HomePage.js (родитель)
<TodoList 
  todos={filteredTodos} 
  toggleTodo={toggleTodo} 
  deleteTodo={deleteTodo} 
/>

// TodoList.js (дочерний)
function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
}
```

### Пример 3: Props в TodoItem
```javascript
// TodoList.js
<TodoItem
  key={todo.id}           // Уникальный ключ для React
  todo={todo}             // Объект задачи
  toggleTodo={toggleTodo} // Функция для отметить выполнено
  deleteTodo={deleteTodo} // Функция для удалить
/>

// TodoItem.js (получает props)
function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <span className="todo-text">{todo.text}</span>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  );
}
```

---

## 4. React Router - Маршрутизация

### Пример 1: Определение маршрутов (App.js)
```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SharedTodosPage from './pages/SharedTodosPage';

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shared" element={<SharedTodosPage />} />
        </Routes>
      </div>
    </Router>
  );
}
```

### Пример 2: Навигация между страницами (Navigation.js)
```javascript
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="navigation">
      <h2>Todo App</h2>
      <ul>
        <li>
          <Link to="/">My Todos</Link>
        </li>
        <li>
          <Link to="/shared">Shared Todos</Link>
        </li>
      </ul>
    </nav>
  );
}
```

**Как работает:**
- `<Router>` - оборачивает приложение
- `<Routes>` - контейнер для всех маршрутов
- `<Route>` - определяет один маршрут
- `<Link>` - создаёт ссылку для перехода
- При клике на Link происходит переход БЕЗ перезагрузки страницы

---

## 5. API Integration - Работа с внешними данными

### Структура запроса
```javascript
// Запрос
const response = await fetch('https://api.example.com/todos');

// Обработка ответа
const data = await response.json();

// Обновление состояния
setTodos(data);
```

### Полный пример с обработкой ошибок
```javascript
const fetchTodos = async () => {
  try {
    // 1. Показываем, что загружаем
    setLoading(true);
    
    // 2. Отправляем запрос
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/todos?_limit=10'
    );
    
    // 3. Проверяем статус ответа
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // 4. Парсим JSON
    const data = await response.json();
    
    // 5. Обновляем состояние
    setTodos(data);
    setError(null);
    
  } catch (err) {
    // 6. Обрабатываем ошибки
    setError(err.message);
    setTodos([]);
  } finally {
    // 7. Убираем индикатор загрузки
    setLoading(false);
  }
};
```

---

## 6. LocalStorage - Персистентность данных

### Сохранение в LocalStorage
```javascript
const todos = [
  { id: 1, text: 'Купить молоко', completed: false },
  { id: 2, text: 'Помыть посуду', completed: true }
];

// Сохраняем
localStorage.setItem('myTodos', JSON.stringify(todos));
```

### Загрузка из LocalStorage
```javascript
// Загружаем
const savedTodos = localStorage.getItem('myTodos');

// Преобразуем обратно в объект
if (savedTodos) {
  const todos = JSON.parse(savedTodos);
  setTodos(todos);
}
```

### В контексте useEffect
```javascript
// Загрузка при монтировании
useEffect(() => {
  const savedTodos = localStorage.getItem('myTodos');
  if (savedTodos) {
    setTodos(JSON.parse(savedTodos));
  }
}, []);  // Пустой dependency array!

// Сохранение при изменении
useEffect(() => {
  localStorage.setItem('myTodos', JSON.stringify(todos));
}, [todos]);  // Зависит от todos!
```

---

## 7. Условный рендеринг - Отображение в зависимости от условия

### Пример 1: Динамическое добавление класса
```javascript
// TodoItem.js
<li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
  {todo.text}
</li>

// CSS
.todo-item.completed {
  text-decoration: line-through;
  opacity: 0.6;
}
```

### Пример 2: Условный рендеринг компонентов
```javascript
// SharedTodosPage.js
if (loading) {
  return <div className="page-container"><p>Loading...</p></div>;
}

if (error) {
  return <div className="page-container"><p>Error: {error}</p></div>;
}

return <TodoList todos={todos} />;
```

### Пример 3: Фильтрация с условиями
```javascript
const filteredTodos = todos.filter(todo => {
  // Условие 1: Фильтр по статусу
  const matchesFilter = filter === 'all' ||
    (filter === 'active' && !todo.completed) ||
    (filter === 'completed' && todo.completed);

  // Условие 2: Поиск
  const matchesSearch = todo.text.toLowerCase()
    .includes(search.toLowerCase());

  // Возвращаем true только если ОБА условия соблюдены
  return matchesFilter && matchesSearch;
});
```

---

## 8. Map и Key - Рендеринг списков

### Правильное использование map
```javascript
// TodoList.js
{todos.map(todo => (
  <TodoItem
    key={todo.id}              // ✅ ВАЖНО: уникальный key!
    todo={todo}
    toggleTodo={toggleTodo}
    deleteTodo={deleteTodo}
  />
))}

// ❌ НЕПРАВИЛЬНО:
{todos.map((todo, index) => (  // index как key - плохо!
  <TodoItem key={index} todo={todo} />
))}
```

**Почему key важен:**
- React использует key для отслеживания элементов
- При добавлении/удалении элемента React обновляет правильные DOM узлы
- Уникальный id гораздо лучше, чем index

---

## 🎯 Ключевые точки для понимания

1. **useState** - местное состояние компонента
2. **useEffect** - побочные эффекты (загрузка, сохранение)
3. **Props** - передача данных и функций между компонентами
4. **Router** - многостраничное приложение
5. **API** - получение данных с сервера
6. **LocalStorage** - сохранение данных в браузере
7. **Conditional Rendering** - отображение в зависимости от условия
8. **Map и Key** - рендеринг списков

---

## 📚 Дополнительные ресурсы

- [React Docs - useState](https://react.dev/reference/react/useState)
- [React Docs - useEffect](https://react.dev/reference/react/useEffect)
- [React Router Docs](https://reactrouter.com/)
- [JavaScript Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [LocalStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
