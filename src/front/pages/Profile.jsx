import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export function Profile() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || "";
            const token = sessionStorage.getItem("token");
            try {
                const response = await fetch(`${backendUrl}/api/user/${userId}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    setMessage("No se pudo cargar la información del usuario.");
                }
            } catch {
                setMessage("Error de conexión con el backend.");
            }
        };
        fetchUser();
    }, [userId]);

    const handleDelete = async () => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || "";
        const token = sessionStorage.getItem("token");
        const response = await fetch(`${backendUrl}/api/user/${userId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        if (response.ok) {
            alert("Usuario eliminado");
            sessionStorage.removeItem("token");
            navigate("/");
        } else {
            alert("No se pudo eliminar el usuario");
        }
    };

    if (message) return <p>{message}</p>;
    if (!user) return <p>Cargando...</p>;

    return (
        <div>
            <h2>Perfil de usuario</h2>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <button onClick={handleDelete}>Eliminar usuario</button>
        </div>
    );
}