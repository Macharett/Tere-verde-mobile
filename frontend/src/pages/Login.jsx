import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")

  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()

    try {
      const resposta = await fetch("http://localhost:3001/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          senha
        })
      })

      const dados = await resposta.json()

      if (!resposta.ok) {
        setErro(dados.erro || "Erro ao fazer login")
        return
      }

      localStorage.setItem("token", dados.token)
      localStorage.setItem("admin", JSON.stringify(dados.admin))

      navigate("/admin")

    } catch (error) {
      setErro("Erro ao conectar com o servidor")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >

        <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
          Login Admin
        </h1>

        {erro && (
          <p className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {erro}
          </p>
        )}

        <label className="block mb-2 font-semibold">
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mb-4"
          placeholder="admin@tereverde.com"
        />

        <label className="block mb-2 font-semibold">
          Senha
        </label>

        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mb-6"
          placeholder="Digite sua senha"
        />

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-3 rounded-lg font-bold hover:bg-green-800"
        >
          Entrar
        </button>

      </form>

    </div>
  )
}

export default Login