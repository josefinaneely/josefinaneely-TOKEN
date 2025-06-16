import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || "";
            const response = await fetch(`${backendUrl}/api/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Usuario registrado exitosamente. Redirigiendo...");
                setTimeout(() => {
                    navigate("/login");
                }, 1000); // Redirige después de 1 segundo
            } else {
                setMessage(data.msg || "Error al registrar usuario.");
            }
        } catch (error) {
            setMessage("Error de conexión con el backend.");
        }
    };

    return (
        <div style={{ maxWidth: 350, margin: "60px auto", padding: 24, background: "#fff", borderRadius: 10, boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
            <h1>Registro</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 18 }}>
                    <label>Correo electrónico:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        style={{ width: "100%", padding: 8, borderRadius: 5, border: "1px solid #ccc" }}
                    />
                </div>
                <div style={{ marginBottom: 18 }}>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        style={{ width: "100%", padding: 8, borderRadius: 5, border: "1px solid #ccc" }}
                    />
                </div>
                <button type="submit" style={{ width: "100%", padding: 10, background: "#007bff", color: "#fff", border: "none", borderRadius: 5, fontSize: "1rem", cursor: "pointer" }}>
                    Enviar
                </button>
            </form>
            {message && <p style={{ marginTop: 15, color: "#d32f2f", textAlign: "center" }}>{message}</p>}
        </div>
    );
}