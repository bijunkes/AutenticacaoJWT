import {useState} from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [token, setToken] = useState("");
    const [perfil, setPerfil] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, senha}),
        });

        const data = await res.json();

        if (res.ok) {
            setToken(data.token);
        } else {
            alert(data.error  || 'Erro no login');
        }
    }
}