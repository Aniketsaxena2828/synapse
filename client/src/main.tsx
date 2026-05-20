import React from "react"
import ReactDOM from "react-dom/client"

import { BrowserRouter }
from "react-router-dom"

import App from "./App"

import "./styles/globals.css"

import {
  AppProvider,
} from "./context/AppContext"

import {
  useAuthStore,
} from "./store/authStore"

function Root() {

  const darkMode =
    useAuthStore(
      (state) => state.darkMode
    )

  return (

    <div
      className={
        darkMode
          ? "dark"
          : "light"
      }
    >

      <BrowserRouter>

        <AppProvider>

          <App />

        </AppProvider>

      </BrowserRouter>

    </div>
  )
}

ReactDOM.createRoot(
  document.getElementById("root")!
).render(

  <React.StrictMode>

    <Root />

  </React.StrictMode>
)