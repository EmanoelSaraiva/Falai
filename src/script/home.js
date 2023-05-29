const api = axios.create({
  baseURL: "http://localhost:8081",
});

window.onload = function () {
  getUsuario();
  inserirNome();
  mostrarRecados();
};

function inserirNome() {
  const idUsuario = getUsuario();
  api.get(`/usuario/${idUsuario}`).then((res) => {
    const nome = res.data;
    const inserirNome = document.getElementById("usuarioLogado");
    inserirNome.innerHTML = nome;
  });
}

function getUsuario() {
  const idUsuario = Number(sessionStorage.getItem("usuario"));
  console.log(idUsuario);
  return idUsuario;
}

function abrirCadastroRecado(carregarModal) {
  const modal = document.getElementById(carregarModal);
  const titulo = document.getElementById("tituloRecado");
  const descricao = document.getElementById("descricaoRecado");
  titulo.value = "";
  descricao.value = "";
  modal.style.display = "flex";
}

function fecharModal(fecharModal) {
  const modal = document.getElementById(fecharModal);
  modal.style.display = "none";
}

function criarRecado(event) {
  event.preventDefault();
  const titulo = document.getElementById("tituloRecado").value;
  const descricao = document.getElementById("descricaoRecado").value;
  const form = {
    titulo: titulo,
    descricao: descricao,
  };

  api
    .post(`/cadastroRecado/${getUsuario()}`, form)
    .then((res) => {
      alert("Recado criado");
      fecharModal("telaRecado");
      mostrarRecados();
    })
    .catch((err) => {
      alert(err.response.data);
    });
}

let page = 1;
let totalPaginas = 0;

//Paginação

function inserirPaginas() {
  let paginaContainer = document.getElementById("paginas");
  paginaContainer.innerHTML = "";

  Array.from(Array(totalPaginas).keys()).forEach((pagina) => {
    paginaContainer.innerHTML += `<p><a onclick=mostrarRecados(\'${
      pagina + 1
    }\')>${pagina + 1}</p>`;
  });
}

function mostrarRecados() {
  api
    .get(`/listarRecados/${getUsuario()}`, {
      params: { page },
    })
    .then((res) => {
      const recado = res.data.recados;
      totalPaginas = res.data.pages;
      let cards = document.getElementById("pagina_Recados");
      cards.innerHTML = "";

      inserirPaginas(page);

      recado.forEach((recados) => {
        cards.innerHTML += `<div class="folha_Recado">
        <h3>${recados.titulo}</h3>
        <p>${recados.descricao}</p>
        <button onclick="modalEditarRecado()">Editar</button>
        <button onclick="excluirRecado()">Excluir</button>
        </div>`;
      });
    })
    .catch((err) => {
      alert(err);
    });
}

//Mudar de páginas

function paginaAnterior() {
  if (page > 1) {
    page--;
    //console.log(pagina);
    mostrarRecados();
  }
}

function proximaPagina() {
  if (page < totalPaginas) {
    page++;
    mostrarRecados();
  }
}
