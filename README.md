# Todo App - React Advanced

Углубленное приложение To-Do List на React с использованием useEffect, React Router, API и управлением состоянием.

## 🚀 Запуск проекта

### Требования
- Node.js (версия 14+)
- npm или yarn

### Установка

```bash
# Установить зависимости
npm install

# Запустить в режиме разработки
npm run dev

# Приложение откроется на http://localhost:3000
```

## 📖 Функционал

### 📝 My Todos (Главная страница)
- Добавление новых задач
- Отметить задачу как выполненную
- Удаление задач
- Фильтрация (All, Active, Completed)
- Поиск по тексту
- **Автоматическое сохранение в LocalStorage**

### 🌐 Shared Todos (Страница с API)
- Загрузка задач из публичного API
- Отметить задачу как выполненную
- Удаление задач
- Индикатор загрузки
- Обработка ошибок

## 🏗️ Структура проекта

```
src/
├── components/
│   ├── AddTodo.js          # Форма добавления
│   ├── TodoList.js         # Список задач
│   ├── TodoItem.js         # Одна задача
│   ├── Filter.js           # Фильтрация
│   ├── Search.js           # Поиск
│   └── Navigation.js       # Навигация
├── pages/
│   ├── HomePage.js         # Личные todos (LocalStorage)
│   └── SharedTodosPage.js  # Todos из API
├── App.js                  # Router и главная логика
└── index.js                # Точка входа
```

## 🎓 Использованные React концепции

### ✅ useState
- Управление todos, filter, search
- Управление loading и error состояниями

### ✅ useEffect
- **HomePage**: Загрузка и сохранение в LocalStorage
- **SharedTodosPage**: Загрузка данных с API

### ✅ Props
- Передача данных между компонентами
- Передача callback функций

### ✅ React Router
- Две страницы с маршрутизацией
- Навигация без перезагрузки

### ✅ API Integration
- Fetch данных с JSONPlaceholder
- Обработка ошибок и loading

## 📋 API Used

**JSONPlaceholder** - публичный API для тестирования

```
GET https://jsonplaceholder.typicode.com/todos?_limit=10
```

## 🔧 Доступные команды

```bash
# Запуск в режиме разработки
npm run dev

# Сборка для production
npm run build

# Запуск тестов
npm test
```

## 📄 Подробный отчет

Смотрите файл `REPORT.md` для подробного объяснения:
- Структуры компонентов
- Использования useEffect
- Работы с API
- Реализации routing
- Управления состоянием

## 📌 Требования выполнены

- ✅ useEffect (минимум 1 раз) - 3 использования
- ✅ Работа с API - JSONPlaceholder
- ✅ Routing - 2 страницы (My Todos, Shared Todos)
- ✅ Sharing State - props, lifting state up
- ✅ Структура - components и pages
- ✅ Отчет - REPORT.md

## 💾 Технологии

- React 18
- React Router v6
- JavaScript ES6+
- CSS3
- LocalStorage API
- Fetch API

## 📱 Браузеры

Работает на всех современных браузерах (Chrome, Firefox, Safari, Edge)

---

**Проект готов к сдаче в университет** ✨
