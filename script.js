class Funcionario {
  constructor(nome, idade, cargo, salario) {
    this._nome = nome;
    this._idade = idade;
    this._cargo = cargo;
    this._salario = salario;
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

  toString() {
    return `${this.nome}, ${this.idade} anos, ${this.cargo}, R$ ${this.salario.toFixed(2)}`;
  }
}

let funcionarios = [];

const form = document.getElementById("form-funcionarios");
const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputCargo = document.getElementById("cargo");
const inputSalario = document.getElementById("salario");
const tabela = document.getElementById("tabela-funcionarios");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const funcionario = new Funcionario(
    inputNome.value,
    Number(inputIdade.value),
    inputCargo.value,
    Number(inputSalario.value),
  );

  funcionarios.push(funcionario);
  renderizarTabela();
  form.reset();
});

function renderizarTabela() {
  tabela.innerHTML = "";
  funcionarios.forEach(function (funcionario) {
    const linha = document.createElement("tr");
    linha.innerHTML = `<td>${funcionario.nome}</td>
      <td>${funcionario.idade}</td>
      <td>${funcionario.cargo}</td>
      <td>R$ ${funcionario.salario.toFixed(2)}</td>
    `;
    tabela.appendChild(linha);
  });
}
