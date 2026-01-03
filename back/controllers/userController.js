import pool from "../database.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const {nome, email, senha} = req.body;
    const senhaCriptografada = bcrypt.hashSync(senha, 8);

    try {
        const[rows] = await pool.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senhaCriptografada]);
        res.status(200).json({message: 'Usuário cadastrado'});
    } catch (error) {
        res.status(400).json({error: 'Erro ao cadastrar usuário'});
    }
};

export const login = async (req, res) => {
    const {email, senha} = req.body;

    try {
        const [usuarios] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);

        if (usuarios.length === 0) {
            return res.status(401).json({error: 'Usuário não encontrado'});
        }

        const usuario = usuarios[0];
        const senhaValida = bcrypt.compareSync(senha, usuario.senha);
        if (!senhaValida) return res.status(401).json({error: 'Senha incorreta'});

        const token = jwt.sign({id: usuario.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({auth: true, token});
    } catch (error) {
        res.status(500).json({error: 'Erro no servidor'});
    }
};

export const perfil = async (req, res) => {
    const usuarioId = req.usuarioId;

    try {
        const [usuarios] = await pool.query('SELECT id, nome, email FROM usuarios WHERE id = ?', [req.usuarioId]);
        if (usuarios.length === 0) return res.status(404).json({error: 'Usuário não encontrado'});
        res.json(usuarios[0]);
    } catch (error) {
        res.status(500).json({error: 'Erro ao buscar usuário'});
    }
};