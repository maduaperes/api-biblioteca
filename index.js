const express = require('express');
const { get } = require('http');
const app = express();
const PORT = 3001;

app.use(express.json());

let livros = [
  { id: 1, titulo: "A Arte da Guerra", autor: "Sun Tzu" },
  { id: 2, titulo: "O Hobbit", autor: "J.R.R. Tolkien" },
  { id: 3, titulo: "1984", autor: "George Orwell" }
];

app.get('/livros', (req, res) => {
  res.status(200).json(livros);
});

app.get('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const livro = livros.find(l => l.id === id);

  if (!livro) {
    return res.status(404).json({ mensagem: "Livro não encontrado" });
  }

  res.status(200).json(livro);
});

app.post('/livros', (req, res) => {
  const { titulo, autor } = req.body;

  if (!titulo || !autor) {
    return res.status(400).json({ mensagem: "Título e autor são obrigatórios" });
  }

  const novoLivro = {
    id: livros.length > 0 ? livros[livros.length - 1].id + 1 : 1,
    titulo,
    autor
  };

  livros.push(novoLivro);
  res.status(201).json(novoLivro);
});

app.put('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, autor } = req.body;

  const livro = livros.find(l => l.id === id);
  if (!livro) {
    return res.status(404).json({ mensagem: "Livro não encontrado" });
  }

  if (titulo) livro.titulo = titulo;
  if (autor) livro.autor = autor;

  res.status(200).json(livro);
});

app.delete('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = livros.findIndex(l => l.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: "Livro não encontrado" });
  }

  livros.splice(index, 1);
  res.status(200).json({ mensagem: "Livro deletado com sucesso" });
});

app.get('/', (req, res) => {
  res.send('API de Livros funcionando!');
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
