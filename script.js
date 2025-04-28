const equipes = [
    "Da Nata & Aranda", "Goiás F.C", "Vila Virgínia", "C.A Paulista", "Estilo Negro",
    "Vila Real", "Jamaica", "Águias da Vila", "Tigers F.C", "Altinópolis F.C",
    "Cravinhos", "Verde Parque", "KRT", "Aliança F.C", "Ribeirão Verde",
    "Sampaio Correia", "Desbravadores", "Unidos dos Bairros", "Resenha F.C", "Quintinense F.C"
];

const equipesDiv = document.getElementById('equipes');
const confirmadosUl = document.getElementById('confirmados');

equipes.forEach(equipe => {
    const button = document.createElement('button');
    button.textContent = equipe;
    button.onclick = () => confirmarPresenca(equipe);
    equipesDiv.appendChild(button);
});

async function confirmarPresenca(equipe) {
    const nome = prompt(`Digite seu nome para confirmar na equipe "${equipe}"`);
    if (!nome) return;

    await fetch('/confirmar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ equipe, nome })
    });

    carregarConfirmados();
}

async function carregarConfirmados() {
    const resposta = await fetch('/confirmacoes');
    const confirmados = await resposta.json();

    confirmadosUl.innerHTML = '';
    confirmados.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nome} - ${item.equipe}`;
        confirmadosUl.appendChild(li);
    });
}

// Atualizar a lista ao carregar a página
carregarConfirmados();
// Atualizar a lista a cada 10 segundos
setInterval(carregarConfirmados, 10000);
