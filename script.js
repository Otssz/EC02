class Funcionario {
  constructor(nome, idade, cargo, salario) {
    this._nome = nome;
    this._idade = idade;
    this._cargo = cargo;
    this._salario = salario;
    this._id = Date.now();
  }

  get nome() {
    return this._nome;
  }
  set nome(valor) {
    this._nome = valor;
  }

  get idade() {
    return this._idade;
  }
  set idade(valor) {
    this._idade = valor;
  }

  get cargo() {
    return this._cargo;
  }
  set cargo(valor) {
    this._cargo = valor;
  }

  get salario() {
    return this._salario;
  }
  set salario(valor) {
    this._salario = valor;
  }

  get id() {
    return this._id;
  }

  toString() {
    return `${this.nome}, ${this.idade} anos, ${this.cargo}, R$ ${this.salario.toFixed(2)}`;
  }
}

let funcionarios = [];
let idEdicao = null;

const form = document.getElementById("form-funcionarios");
const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputCargo = document.getElementById("cargo");
const inputSalario = document.getElementById("salario");
const tabela = document.getElementById("tabela-funcionarios");
const botaoSubmit = form.querySelector("button[type='submit']");
const buscarPorId = (id) => funcionarios.find((f) => f.id === id);
const removerPorId = (id) => {
  funcionarios = funcionarios.filter((f) => f.id !== id);
};
const adicionarFuncionario = (nome, idade, cargo, salario) => {
  funcionarios.push(new Funcionario(nome, idade, cargo, salario));
};
const atualizarFuncionario = (id, nome, idade, cargo, salario) => {
  const funcionario = buscarPorId(id);
  funcionario.nome = nome;
  funcionario.idade = idade;
  funcionario.cargo = cargo;
  funcionario.salario = salario;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = inputNome.value;
  const idade = Number(inputIdade.value);
  const cargo = inputCargo.value;
  const salario = Number(inputSalario.value);

  if (idEdicao === null) {
    adicionarFuncionario(nome, idade, cargo, salario);
  } else {
    atualizarFuncionario(idEdicao, nome, idade, cargo, salario);
    idEdicao = null;
    botaoSubmit.textContent = "Cadastrar";
  }
  renderizarTabela();
  form.reset();
});

function renderizarTabela() {
  tabela.innerHTML = "";
  funcionarios.forEach((funcionario) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `<td>${funcionario.nome}</td>
      <td>${funcionario.idade}</td>
      <td>${funcionario.cargo}</td>
      <td>R$ ${funcionario.salario.toFixed(2)}</td>
    `;
    const celulaAcoes = document.createElement("td");
    const botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar";

    botaoEditar.onclick = function () {
      inputNome.value = funcionario.nome;
      inputIdade.value = funcionario.idade;
      inputCargo.value = funcionario.cargo;
      inputSalario.value = funcionario.salario;

      idEdicao = funcionario.id;
      botaoSubmit.textContent = "Salvar";
    };

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.onclick = function () {
      removerPorId(funcionario.id);
      idEdicao = null;
      botaoSubmit.textContent = "Cadastrar";
      form.reset();
      renderizarTabela();
    };

    celulaAcoes.appendChild(botaoEditar);
    celulaAcoes.appendChild(botaoExcluir);
    linha.appendChild(celulaAcoes);
    tabela.appendChild(linha);
  });
}
