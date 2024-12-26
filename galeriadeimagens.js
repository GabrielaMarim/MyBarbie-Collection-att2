document.addEventListener("DOMContentLoaded", () => {
    const imageForm = document.getElementById("imageForm");
    const imageInput = document.getElementById("imageInput");
    const gallery = document.getElementById("gallery");
  
    // Adicionar imagem
    imageForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const file = imageInput.files[0];
      if (file) {
        const reader = new FileReader();
  
        reader.onload = () => {
          const imgElement = document.createElement("div");
          imgElement.classList.add("gallery-item");
          imgElement.innerHTML = `
            <img src="${reader.result}" alt="Imagem do Usuário">
            <button class="delete-btn" title="Excluir">X</button>
          `;
          gallery.appendChild(imgElement);
  
          // Adicionar funcionalidade ao botão de exclusão
          imgElement.querySelector(".delete-btn").addEventListener("click", () => {
            gallery.removeChild(imgElement);
          });
        };
  
        reader.readAsDataURL(file);
      }
  
      // Limpar o campo de arquivo
      imageInput.value = "";
    });
  });
  
  