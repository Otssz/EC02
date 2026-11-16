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
let indiceEdicao = null;

const form = document.getElementById("form-funcionarios");
const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputCargo = document.getElementById("cargo");
const inputSalario = document.getElementById("salario");
const tabela = document.getElementById("tabela-funcionarios");
const botaoSubmit = form.querySelector("button[type='submit']");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (indiceEdicao === null) {
    const funcionario = new Funcionario(
      inputNome.value,
      Number(inputIdade.value),
      inputCargo.value,
      Number(inputSalario.value),
    );
    funcionarios.push(funcionario);
  } else {
    const funcionario = funcionarios[indiceEdicao];
    funcionario.nome = inputNome.value;
    funcionario.idade = Number(inputIdade.value);
    funcionario.cargo = inputCargo.value;
    funcionario.salario = Number(inputSalario.value);

    indiceEdicao = null;
    botaoSubmit.textContent = "Cadastrar";
  }
  renderizarTabela();
  form.reset();
});

function renderizarTabela() {
  tabela.innerHTML = "";
  funcionarios.forEach(function (funcionario, indice) {
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

      indiceEdicao = indice;
      botaoSubmit.textContent = "Salvar";
    };

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.onclick = function () {
      funcionarios.splice(indice, 1);
      indiceEdicao = null;
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
