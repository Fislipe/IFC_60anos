const galeriaContainer = document.getElementById('galeria-container');
let imagens = [];

class Imagens {
    constructor(imagem, ano, descricao, tags) {
        this.imagem = `../imagens/${imagem}`;
        this.ano = ano;
        this.descricao = descricao;
        this.tags = tags;

        imagens.push(this);
    }
}

// calcular década
function getDecada(ano) {
    return Math.floor(ano / 10) * 10;
}


let filtrosAtivos = [];

document.querySelectorAll(".tag").forEach(tag => {
    tag.addEventListener("click", () => {
        const t = tag.dataset.tag;

        if (tag.classList.contains("ativo")) {
            tag.classList.remove("ativo");
            filtrosAtivos = filtrosAtivos.filter(f => f !== t);
        } else {
            // Remove any previous active filter (only one active at a time)
            document.querySelectorAll(".tag").forEach(tt => tt.classList.remove("ativo"));
            filtrosAtivos = [t];
            tag.classList.add("ativo");
        }

        carregarGaleria();
    });
});


function carregarGaleria() {
    galeriaContainer.innerHTML = "";

    // Filter images
    const fotosFiltradas = imagens.filter(foto => {
        if (filtrosAtivos.length === 0) return true;
        return filtrosAtivos.every(tag => foto.tags.includes(tag));
    });

    // Sort by year
    fotosFiltradas.sort((a, b) => a.ano - b.ano);

    // Render directly into the masonry container — flat structure, no wrappers
    fotosFiltradas.forEach(foto => {
        const item = document.createElement("div");
        item.classList.add("foto-item");

        const tagsStr = foto.tags.join(' · ');

        item.innerHTML = `
            <img src="${foto.imagem}" alt="${foto.descricao}">
            <div class="foto-overlay">
                <div>
                    <span class="foto-tag">${foto.ano} — ${tagsStr}</span>
                </div>
            </div>
        `;

        galeriaContainer.appendChild(item);
    });
}


// imagens:

new Imagens('EAgrotecnica.jpg', 1999,
    'Várias pessoas e uma bandeirona do Brasil',
    ["Alunos", "Eventos"]
);

new Imagens(
    'depenandoGalinha1969 (1).jpg',
    1979,
    'Crianças depenando galinhas',
    ["Alunos"]
);

new Imagens(
    'refeitório.jpg',
    1969,
    'Refeitório do IFC',
    ["Infraestrutura"]
);

new Imagens(
    'inauguraçãoCampo.jpg',
    1969,
    'Inauguração do Campo do IFC Concórdia',
    ["Infraestrutura", "Eventos"]
);

new Imagens(
    'formaturaPrimeiraTurma (1).jpg',
    1969,
    'Primeira turma a se formar no IFC Concórdia',
    ["Alunos", "Eventos"]
);

carregarGaleria();