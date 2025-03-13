const posts = require("../data/posts");

//visualizza tutti i post
const getAllPosts = (req, res) => {
  // Se viene passato un tag filtriamo i post
  if (req.query.tag) {
    const filteredPosts = posts.filter((post) =>
      post.tags.includes(req.query.tag)
    );
    return res.json(filteredPosts);
  }

  res.json(posts);
};

//visualizza il post con id selezionato
const getPostById = (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res.status(404).json({ error: "Post non trovato" });
  }

  res.json(post);
};

//crea il post
const createPost = (req, res) => {
  console.log("Dati ricevuti:", req.body);
  const { titolo, contenuto, immagine, tags } = req.body;

  if (!titolo || !contenuto || !immagine || !tags) {
    return res.status(400).json({ error: "Tutti i campi sono obbligatori" });
  }

  const newPost = {
    id: posts.length ? posts[posts.length - 1].id + 1 : 1,
    titolo,
    contenuto,
    immagine,
    tags,
  };

  posts.push(newPost);
  res.status(201).json(newPost);
};

//Aggiorna post
const updatePost = (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).json({ error: "Post non trovato" });
  }

  const { titolo, contenuto, immagine, tags } = req.body;
  if (titolo) post.titolo = titolo;
  if (contenuto) post.contenuto = contenuto;
  if (immagine) post.immagine = immagine;
  if (tags) post.tags = tags;

  res.json(post);
};

//cancella post con id selezionato
const deletePost = (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex((post) => post.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Post non trovato" });
  }

  posts.splice(index, 1);
  console.log("Lista aggiornata:", posts);
  res.status(204).send();
};

module.exports = {
  getAllPosts,
  getPostById,
  deletePost,
  updatePost,
  createPost,
};
