import { useState } from "react"

import { Link, useNavigate } from "react-router-dom"

import AuthLayout from "@/layouts/AuthLayout"

import { loginUser } from "@/services/authService"

import { useAuthStore } from "@/store/authStore"

export default function Login() {

  const navigate = useNavigate()

  const login = useAuthStore(
    (state) => state.login
  )

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    try {
      const data = await loginUser(formData)

      login(data.user, data.token)

      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthLayout>

      <div>

        <h1 className="
          text-4xl font-bold
          text-center mb-2
        ">
          Welcome Back
        </h1>

        <p className="
          text-muted text-center mb-8
        ">
          Login to your Synapse workspace
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label className="block mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="
                w-full bg-background
                border border-border
                rounded-xl p-4
                text-white outline-none
              "
            />
          </div>

          <div>
            <label className="block mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="
                w-full bg-background
                border border-border
                rounded-xl p-4
                text-white outline-none
              "
            />
          </div>

          <button
            type="submit"
            className="
  w-full
  bg-primary
  rounded-xl
  p-4
  font-semibold
  shadow-glow

  hover:scale-[1.02]
  hover:opacity-90
  active:scale-[0.98]

  transition-all
  duration-200

  cursor-pointer
"
          >
            Login
          </button>

        </form>

        <p className="
          text-center text-muted mt-6
        ">
          Don’t have an account?{" "}

          <Link
            to="/register"
            className="text-primary"
          >
            Register
          </Link>
        </p>

      </div>

    </AuthLayout>
  )
}