document.addEventListener("DOMContentLoaded", () => {
    const listaHistorico = document.getElementById("listaHistorico");
    const adicionarBtn = document.getElementById("adicionarAquisicao");
  
    let aquisicoes = JSON.parse(localStorage.getItem("aquisicoes")) || [];
  
    function renderizarHistorico() {
      listaHistorico.innerHTML = ""; 
      aquisicoes.forEach((item, index) => {
        const li = document.createElement("li");
  
        li.innerHTML = `
          <div class="item-header">
            <strong class="nome">${item.nome}</strong>
            <button onclick="alternarEdicao(${index})">Editar</button>
            <button onclick="removerAquisicao(${index})">Remover</button>
          </div>
          <div class="item-body">
            <p><strong>Data de Aquisição:</strong> <span class="valor">${item.data}</span></p>
            <p><strong>Estado:</strong> <span class="valor">${item.estado}</span></p>
            <p><strong>Status:</strong> <span class="valor">${item.status}</span></p>
            <p><strong>Valor:</strong> <span class="valor">R$${item.valor}</span></p>
            <p><strong>Nota:</strong> <span class="valor">${item.nota}</span></p>
          </div>
        `;
        li.dataset.index = index;
        listaHistorico.appendChild(li);
      });
    }
  
    window.alternarEdicao = (index) => {
      const li = document.querySelector(`li[data-index="${index}"]`);
      const item = aquisicoes[index];
      const modoEdicaoAtivo = li.querySelector(".edit-mode");
  
      if (modoEdicaoAtivo) {
        // Salvar alterações
        const nomeInput = li.querySelector(".nome-input");
        const inputs = li.querySelectorAll(".item-body input");
        aquisicoes[index] = {
          nome: nomeInput.value || item.nome,
          data: inputs[0].value || item.data,
          estado: inputs[1].value || item.estado,
          status: inputs[2].value || item.status,
          valor: inputs[3].value || item.valor,
          nota: inputs[4].value || item.nota,
        };
        localStorage.setItem("aquisicoes", JSON.stringify(aquisicoes));
        renderizarHistorico();
      } else {
        // Habilitar modo de edição
        const nomeSpan = li.querySelector(".nome");
        const nomeInput = document.createElement("input");
        nomeInput.type = "text";
        nomeInput.value = nomeSpan.textContent;
        nomeInput.className = "nome-input";
        nomeSpan.replaceWith(nomeInput);
  
        const valores = li.querySelectorAll(".valor");
        valores.forEach((span, i) => {
          const campoInput = document.createElement("input");
          campoInput.type = i === 3 ? "number" : "text"; // Campo 'Valor' é numérico
          campoInput.value = span.textContent.replace("R$", "").trim();
          span.replaceWith(campoInput);
        });
  
        li.querySelector(".item-body").classList.add("edit-mode");
        const editarBtn = li.querySelector(".item-header button");
        editarBtn.textContent = "Salvar";
      }
    };
  
    window.removerAquisicao = (index) => {
      aquisicoes.splice(index, 1);
      localStorage.setItem("aquisicoes", JSON.stringify(aquisicoes));
      renderizarHistorico();
    };
  
    adicionarBtn.addEventListener("click", () => {
      const nome = prompt("Digite o nome do item:");
      if (!nome) return;
  
      const data = prompt("Digite a data de aquisição (DD/MM/AAAA):", new Date().toLocaleDateString("pt-BR"));
      const estado = prompt("Digite o estado (novo, usado, seminovo):");
      const status = prompt("Digite o status (completa, incompleta):");
      const valor = prompt("Digite o valor (R$):");
      const nota = prompt("Deixe uma nota sobre o item (opcional):");
  
      const aquisicao = { nome, data, estado, status, valor, nota: nota || "Sem nota" };
      aquisicoes.push(aquisicao);
      localStorage.setItem("aquisicoes", JSON.stringify(aquisicoes));
      renderizarHistorico();
    });
  
    renderizarHistorico();
  });