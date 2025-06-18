import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "";
      const response = await fetch("https://fuzzy-space-halibut-4j67xxq4wr69hqw46-3001.app.github.dev//api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem("token", data.token);
        setMessage("Login exitoso. Redirigiendo...");
        setTimeout(() => {
          navigate("/private");
        }, 1000);
      } else {
        setMessage(data.msg || "Error al iniciar sesión.");
      }
    } catch (error) {
      setMessage("Error de conexión con el backend.");
    }
  };

  return (
    <div className="login-container">
      <h1>Iniciar sesión</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Correo electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Usuario:</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
      {message && <p className="login-message">{message}</p>}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
        <Link to="/signup">
          <button style={{ fontSize: "0.85rem", padding: "4px 10px" }}>¿No tienes cuenta? Regístrate</button>
        </Link>
      </div>
    </div>
  );
}