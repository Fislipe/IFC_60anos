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

        if (tag.classList.contains("selected")) {
            tag.classList.remove("selected");
            filtrosAtivos = filtrosAtivos.filter(f => f !== t);
        } else {
            tag.classList.add("selected");
            filtrosAtivos.push(t);
        }

        carregarGaleria();
    });
});


function carregarGaleria() {
    galeriaContainer.innerHTML = "";

    const decadasMap = {};

    imagens.forEach(img => {
        const decada = getDecada(img.ano);
        if (!decadasMap[decada]) decadasMap[decada] = [];
        decadasMap[decada].push(img);
    });

    const decadasOrdenadas = Object.keys(decadasMap).sort((a, b) => a - b);

    decadasOrdenadas.forEach(decada => {

        const fotosFiltradas = decadasMap[decada].filter(foto => {
            if (filtrosAtivos.length === 0) return true;
            return filtrosAtivos.every(tag => foto.tags.includes(tag));
        });

        if (fotosFiltradas.length === 0) return;

        // Título da década
        const titulo = document.createElement("h2");
        titulo.classList.add("decada-titulo");
        titulo.textContent = decada + "s";
        galeriaContainer.appendChild(titulo);

        // Grid da década
        const grid = document.createElement("div");
        grid.classList.add("fotos-grid");

        fotosFiltradas.forEach(foto => {
            const card = document.createElement("div");
            card.classList.add("foto-card");

            card.innerHTML = `
                <img src="${foto.imagem}" alt="${foto.descricao}">
                <h3 class="foto-ano">${foto.ano}</h3>
                <p class="foto-desc">${foto.descricao}</p>
            `;

            grid.appendChild(card);
        });

        galeriaContainer.appendChild(grid);
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
    ["Infraestrutura", "Evento"]
);

new Imagens(
    'formaturaPrimeiraTurma (1).jpg',
    1969,
    'Primeira turma a se formar no IFC Concórdia',
    ["Alunos", "Evento"]
);

carregarGaleria();