const conteinerProjetos = document.querySelector('#meus-projetos');

async function buscarProjetos() {
  try {
    //Busca meus repositórios públicos
    const resposta = await fetch('https://api.github.com/users/LaislaODSouzza/repos');
    const repositorios = await resposta.json();

    conteinerProjetos.innerHTML = '';
    
    repositorios.forEach(repo => {
        // Cria o card com a estrutura do meu css
        const cartao = `
            <div class="projeto-card">
            <!-- Espaço para a imagem (ou fundo escuro enquanto não tem imagem) -->
            <div class="projeto-topo">
                ${repo.language ? `<span class="badge-linguagem" data-lang="${repo.language}">${repo.language}</span>` : ''}
            </div>

            <h2>${repo.name}</h2>
            <p>${repo.description || ""}</p>
            
            <div class="links">
                <a href="${repo.html_url}" target="_blank" class="btn-projeto">Código</a>
                ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="btn-projeto">Site</a>` : ''}
            </div>
            </div>
        `;
        conteinerProjetos.innerHTML += cartao;
    });
    
  } catch (error) {
    console.error("Erro ao buscar projetos! :", error);
  }
}

buscarProjetos();