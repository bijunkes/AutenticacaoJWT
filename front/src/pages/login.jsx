import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [token, setToken] = useState("");
    const [perfil, setPerfil] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha }),
        });

        const data = await res.json();

        if (res.ok) {
            setToken(data.token);
        } else {
            alert(data.error || 'Erro no login');
        }
    }

    const fetchPerfil = async () => {
        const res = await fetch("http://localhost:3000/perfil", {
            headers: {
                Authorization: `${token}`,
            },
        });

        const data = await res.json();
        if (res.ok) {
            setPerfil(data);
        } else {
            alert(data.error || 'Erro ao buscar perfil');
        }
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Login JWT</h2>
            <form onSubmit={handleLogin}>
                <input type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /> <br />
                <input type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                /> <bt />
                <button type="submit">Entrar</button>
            </form>

            {token && (
                <>
                    <h4>Token JWT:</h4>
                    <pre style={{ whiteSpace: "pre-wrap" }}>{token}</pre>

                    <button onClick={fetchProfile}>Buscar Perfil</button>

                    {profile && (
                        <>
                            <h4>Perfil:</h4>
                            <pre>{JSON.stringify(profile, null, 2)}</pre>
                        </>
                    )}
                </>
            )}
        </div>
    );
}