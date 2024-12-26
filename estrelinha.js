document.addEventListener("mousemove", (e) => {
    createStar(e.pageX, e.pageY);
  });
  
  function createStar(x, y) {
    const star = document.createElement("div");
    star.classList.add("star");
  
    // Define posição inicial da estrelinha
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
  
    // Adiciona ao corpo da página
    document.body.appendChild(star);
  
    // Remove a estrelinha após a animação
    setTimeout(() => {
      star.remove();
    }, 1000);
  }