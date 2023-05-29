const api = axios.create({
  baseURL: "http://localhost:8081",
});

function entrar(event) {
  event.preventDefault();
  const email = document.getElementById("emailLogin").value;
  const senha = document.getElementById("senhaLogin").value;

  api
    .post("/login", { email, senha })
    .then((res) => {
      const id = res.data;
      console.log(id);
      sessionStorage.setItem("usuario", JSON.stringify(id));
      window.location.href = "./src/home.html";
      alert("Usuario Logado!");
    })
    .catch((err) => alert(err.response.data));
}
