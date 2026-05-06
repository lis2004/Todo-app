# Todo App - Отчет

## 1. Идея проекта

**Название:** Углубленное To-Do приложение на React

**Описание:** Приложение для управления задачами (Todo List) с двумя страницами:
- **My Todos** - личные задачи, сохраняемые в LocalStorage
- **Shared Todos** - задачи, загруженные из публичного API

**Цель:** Демонстрация глубокого понимания React концепций: useEffect, работа с API, маршрутизация (React Router), управление состоянием.

---

## 2. Структура компонентов

```
src/
├── components/
│   ├── AddTodo.js          # Форма добавления новой задачи
│   ├── TodoList.js         # Компонент списка задач
│   ├── TodoItem.js         # Компонент одной задачи
│   ├── Filter.js           # Кнопки фильтрации (All, Active, Completed)
│   ├── Search.js           # Поле поиска по текста задач
│   ├── Navigation.js       # Навигация между страницами
│   └── Navigation.css
├── pages/
│   ├── HomePage.js         # Страница с личными todos
│   └── SharedTodosPage.js  # Страница с todos из API
├── App.js                  # Главный компонент с Router
├── index.js                # Точка входа приложения
└── App.css                 # Стили приложения
```

---

## 3. Использование React концепций

### 3.1 useState

**Где используется:**
- `HomePage.js`: управление `todos`, `filter`, `search`
- `AddTodo.js`: управление текстом в input
- `SharedTodosPage.js`: управление `todos`, `loading`, `error`

**Примеры:**
```javascript
// HomePage.js
const [todos, setTodos] = useState([]);
const [filter, setFilter] = useState('all');
const [search, setSearch] = useState('');

// AddTodo.js
const [text, setText] = useState('');

// SharedTodosPage.js
const [todos, setTodos] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

### 3.2 useEffect

**Где и как используется:**

#### 1) HomePage.js - Загрузка из LocalStorage
```javascript
// Загрузка при монтировании компонента
useEffect(() => {
  const savedTodos = localStorage.getItem('myTodos');
  if (savedTodos) {
    setTodos(JSON.parse(savedTodos));
  }
}, []);

// Сохранение при изменении todos
useEffect(() => {
  localStorage.setItem('myTodos', JSON.stringify(todos));
}, [todos]);
```

**Что происходит:**
- При загрузке страницы - восстанавливаем todos из LocalStorage
- При каждом изменении todos - сохраняем в LocalStorage
- Это обеспечивает персистентность данных

#### 2) SharedTodosPage.js - Загрузка с API
```javascript
useEffect(() => {
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
      if (!response.ok) throw new Error('Failed to fetch todos');
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
}, []);
```

**Что происходит:**
- При монтировании компонента - загружаем todos с API
- Показываем "Loading..." до загрузки
- Если ошибка - показываем сообщение об ошибке
- При успехе - отображаем полученные данные

### 3.3 Props (передача данных между компонентами)

**Примеры:**

```javascript
// HomePage.js -> AddTodo
<AddTodo addTodo={addTodo} />
// AddTodo получает функцию addTodo через props

// HomePage.js -> TodoList
<TodoList todos={filteredTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
// TodoList получает todos и функции через props

// TodoList.js -> TodoItem (через map)
{todos.map(todo => (
  <TodoItem
    key={todo.id}
    todo={todo}
    toggleTodo={toggleTodo}
    deleteTodo={deleteTodo}
  />
))}
// TodoItem получает каждую задачу и функции

// Navigation.js - использует React Router Link
<Link to="/">My Todos</Link>
<Link to="/shared">Shared Todos</Link>
```

---

## 4. Работа с API

**API используется:** JSONPlaceholder (публичный API для тестирования)

**Эндпоинт:** `https://jsonplaceholder.typicode.com/todos?_limit=10`

**Как реализовано:**

```javascript
// SharedTodosPage.js
const fetchTodos = async () => {
  try {
    setLoading(true);
    const response = await fetch(URL);
    if (!response.ok) throw new Error('Failed to fetch todos');
    const data = await response.json();
    setTodos(data);
    setError(null);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

**Что происходит:**
1. **Запрос:** fetch отправляет GET запрос на API
2. **Обработка:** Преобразуем JSON в JavaScript объекты
3. **Обновление:** setTodos обновляет состояние
4. **Ошибки:** Обрабатываем ошибки сети или API
5. **Индикатор:** Показываем loading во время загрузки

**Данные с API:**
- id: уникальный идентификатор
- title: текст задачи
- completed: статус выполнения

---

## 5. Routing (React Router)

**Реализовано:** React Router v6

**Структура:**

```javascript
// App.js
<Router>
  <div className="app">
    <Navigation />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shared" element={<SharedTodosPage />} />
    </Routes>
  </div>
</Router>
```

**Страницы:**
1. `/` - HomePage (My Todos) - личные задачи с LocalStorage
2. `/shared` - SharedTodosPage (Shared Todos) - задачи с API

**Навигация:**

```javascript
// Navigation.js
import { Link } from 'react-router-dom';

<Link to="/">My Todos</Link>
<Link to="/shared">Shared Todos</Link>
```

**Как работает:**
- `<Router>` - оборачивает приложение для включения маршрутизации
- `<Routes>` - определяет все маршруты
- `<Route>` - каждый маршрут со своей страницей
- `<Link>` - ссылки для переключения между страницами без перезагрузки

---

## 6. Sharing State (управление состоянием)

### Подход 1: Lifting State Up (HomePage)

```javascript
// HomePage.js - главный компонент, управляет состоянием
const [todos, setTodos] = useState([]);

// Передаём функции детям через props
<AddTodo addTodo={addTodo} />
<TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />

// Дети вызывают функции, которые обновляют состояние родителя
```

**Поток данных:**
```
HomePage (state)
  ↓ props (addTodo, toggleTodo)
  ├→ AddTodo (вызывает addTodo)
  └→ TodoList
       ↓ props (todos, toggleTodo, deleteTodo)
       └→ TodoItem (вызывает toggleTodo, deleteTodo)
```

### Подход 2: Локальное состояние в компонентах

```javascript
// AddTodo.js - собственное состояние для input
const [text, setText] = useState('');

// Это логично, т.к. текст нужен только для этого компонента
```

### Подход 3: Router для передачи контекста между страницами

```javascript
// App.js
<Route path="/" element={<HomePage />} />
<Route path="/shared" element={<SharedTodosPage />} />

// Каждая страница полностью независима
// HomePage хранит todos в LocalStorage
// SharedTodosPage загружает todos с API
```

---

## 7. Основная логика приложения

### Логика HomePage (My Todos)

```
1. Монтирование компонента
   ↓
2. useEffect загружает todos из LocalStorage
   ↓
3. Если есть сохранённые todo - показываем их
   ↓
4. Пользователь вводит новую задачу
   ↓
5. Нажимает "Add"
   ↓
6. addTodo добавляет задачу в state
   ↓
7. useEffect автоматически сохраняет в LocalStorage
   ↓
8. Интерфейс обновляется
```

### Логика SharedTodosPage (Shared Todos)

```
1. Монтирование компонента
   ↓
2. useEffect показывает "Loading..."
   ↓
3. fetch отправляет запрос к API
   ↓
4. Если успех - получаем todo с API
   ↓
5. setTodos обновляет состояние
   ↓
6. Интерфейс показывает todo
   ↓
7. Если ошибка - показываем сообщение об ошибке
```

### Логика фильтрации и поиска (обе страницы)

```
todos.filter(todo => {
  // Условие 1: Фильтр по статусу
  const matchesFilter = filter === 'all' ||
    (filter === 'active' && !todo.completed) ||
    (filter === 'completed' && todo.completed);

  // Условие 2: Поиск по тексту
  const matchesSearch = todo.text.toLowerCase()
    .includes(search.toLowerCase());

  // Возвращаем только задачи, которые соответствуют обоим условиям
  return matchesFilter && matchesSearch;
});
```

---

## 8. Запуск проекта

### Требования
- Node.js (версия 14+)
- npm

### Установка и запуск

```bash
# Перейти в папку проекта
cd "C:\Users\apari\OneDrive\Рабочий стол\Projects\Todo"

# Установить зависимости
npm install

# Запустить в режиме разработки
npm run dev

# Откроется http://localhost:3000
```

### Сборка для production

```bash
npm run build
```

---

## 9. Ключевые файлы и их роль

| Файл | Роль |
|------|------|
| `App.js` | Главный компонент с Router и управлением маршрутами |
| `HomePage.js` | Страница с личными todo (useEffect для LocalStorage) |
| `SharedTodosPage.js` | Страница с todo из API (useEffect для fetch) |
| `Navigation.js` | Компонент навигации между страницами |
| `AddTodo.js` | Форма добавления новой задачи |
| `TodoList.js` | Компонент для отображения списка todo |
| `TodoItem.js` | Компонент одной задачи (чекбокс, текст, кнопка delete) |
| `Filter.js` | Кнопки фильтрации (All, Active, Completed) |
| `Search.js` | Поле поиска по тексту задач |

---

## 10. Выполнены все требования

- ✅ **useEffect**: 3 использования (загрузка и сохранение LocalStorage, загрузка API)
- ✅ **API**: Загрузка todo с JSONPlaceholder API
- ✅ **Routing**: 2 страницы (My Todos, Shared Todos) с навигацией
- ✅ **Sharing State**: Props, lifting state up, управление состоянием
- ✅ **Структура**: Разделение на components и pages
- ✅ **Функционал**: Добавление, удаление, фильтрация, поиск, сохранение

---

## 11. Дополнительные возможности

- Персистентность данных (LocalStorage)
- Загрузка с публичного API
- Индикаторы загрузки и ошибок
- Фильтрация и поиск
- Условный рендеринг
- Уникальные ключи (key) для списков

---

**Проект готов к сдаче.**
