document.addEventListener("DOMContentLoaded", () => {
  const API_URL = `https://viacep.com.br/ws/`;

  const cepInput = document.querySelector("#cep");
  const ruaInput = document.querySelector("#rua");
  const complementoInput = document.querySelector("#complemento");
  const bairroInput = document.querySelector("#bairro");
  const cidadeInput = document.querySelector("#cidade");
  const estadoInput = document.querySelector("#uf");

  async function fetchCep(cep) {
    const response = await fetch(`${API_URL}${cep}/json/`);
    const data = await response.json();
    return data;
  }

  function displayAddress(address) {
    ruaInput.value = address.logradouro;
    complementoInput.value = address.complemento;
    bairroInput.value = address.bairro;
    cidadeInput.value = address.localidade;
    estadoInput.value = address.uf;
  }

  cepInput.addEventListener("blur", async () => {
    const cep = cepInput.value.trim().replace("-", "");
    if (cep.length === 8) {
      try {
        const address = await fetchCep(cep);
        if (!address.erro) {
          displayAddress(address);
        } else {
          alert("CEP não encontrado!");
        }
      } catch (error) {
        alert("Erro ao buscar o CEP!");
      }
    } else {
      alert("CEP inválido!");
    }
  });
});
