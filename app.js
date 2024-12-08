import { apiKey, authorizationToken, todoFetchUrl } from "./supabase.js"

if ("serviceWorker" in navigator) {
  try {
    navigator.serviceWorker
      .register("sw.js")
      .then((registration) => {
        console.log("Service worker registered", registration)

        // 1. Check if Service Worker is in the installing phase
        if (registration.installing) {
          console.log("Service Worker installing")
        }

        // 3. Check if Service Worker is active
        if (registration.active) {
          console.log("Service Worker active")
        }

        // 4. Check if Service Worker is waiting (new version waiting to activate)
        if (registration.waiting) {
          console.log("Service Worker waiting")
        }
      })
      .catch((error) => console.log("Service worker is not registered", error))
  } catch (error) {
    console.log("Error in registration of service worker ", error)
  }
}

const getTodos = async () => {
  const res = await fetch(`${todoFetchUrl}?select=*`, {
    headers: {
      apikey: apiKey,
      Authorization: authorizationToken,
    },
  })
  const todos = await res.json()
  return todos
}

const createTodoElements = (todos) =>
  todos?.map(
    (todo) => `
    <li class="todo-item" data-id="${todo.id}">
      <h1 class="todo-item__title">${todo.title}</h1>
      <p class="todo-item__description">${todo.description}</p>
      ${
        todo.isCompleted
          ? `
          <button class="todo-item__button button-danger">un complete</button>
          `
          : `
          <button class="todo-item__button button-success">complete</button>
      `
      }
    </li>
  `
  )

const renderTodoItems = async () => {
  const todos = await getTodos()
  const todosItemsElements = createTodoElements(todos)

  const todoListElm = document.querySelector("ul#todo-list")
  todoListElm.innerHTML = ""
  todoListElm.insertAdjacentHTML("beforeend", todosItemsElements?.join(""))
}

window.addEventListener("load", () => {
  renderTodoItems()
})
