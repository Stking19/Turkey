import './App.css'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import { RouterProvider, createBrowserRouter } from 'react-router'
import Verify from './components/Verify'
import TodoList from './components/todoList/TodoList'

function App() {
  const route = createBrowserRouter([
    {
      path: "",
      element: <TodoList />
    },

    {
      path: "/signup",
      element: <Signup />
    },

    {
      path: "/login",
      element: <Login />
    },

    {
      path: "/user/verify-email?/:token",
      element: <Verify />
    }
  ])

  return (
    <RouterProvider router={route}/>
  )
}

export default App
