import { useState } from "react";
import { Link } from "react-router-dom";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Inicio de sesión exitoso.");
        // Aquí puedes guardar el token y redirigir si lo deseas
      } else {
        setMessage(data.msg || "Credenciales incorrectas.");
      }
    } catch (error) {
      setMessage("Error de conexión.");
    }
  };

  return (
    <div className="login-container">
      <h1>Iniciar sesión</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Usuario:</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
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