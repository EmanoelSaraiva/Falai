let pessoas = [];
let recados = [];

function addNovoCadastro() {
  let id = Math.floor(Math.random() * 65536);
  let nome = document.getElementById("nome").value;
  let email = document.getElementById("email").value;
  let senha = document.getElementById("senha").value;

  let cadastro = {
    id: id,
    nome: nome,
    email: email,
    senha: senha,
  };

  pessoas.push(cadastro);

  localStorage.setItem("pessoas", JSON.stringify(pessoas));
}


function criarRecado() {
  let id = Math.floor(Math.random() * 65536);
  let titulo = document.getElementById().value;
  let descricao = document.getElementById().value;

  let recadoSalvo = {
    id: id,
    titulo: titulo,
    descricao: descricao,
  };

  recados.push(recadoSalvo);
}

function voltar() {
  window.location.href = "../index.html";
}
