const api = axios.create({
  baseURL: "http://localhost:8081",
});

function cadastrarUsuario(event) {
  event.preventDefault();
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const vSenha = /^(?=.*[a-zA-Z])[0-9a-zA-Z]{6,8}$/;

  if (!vSenha.test(senha)) {
    alert(
      "Senha deve conter pelo menos uma letra e no minimo 6 digitos até 8 digitos"
    );
  } else {
    api
      .post("/cadastro", { nome, email, senha })
      .then((res) => console.log(res.data))
      .catch((err) => alert(err.response.data));
    window.location.href = "/index.html";
  }
}
