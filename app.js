'use strict'

// ============================
// ELEMENTOS PRINCIPAIS
// ============================

const botoes = document.getElementById('cursos')
const tela1 = document.querySelector('.tela_1')
const tela2 = document.querySelector('.tela_2')
const tela3 = document.querySelector('.tela3')

const botaoSair = document.querySelector('.sair')
const botaoVoltar = document.querySelector('.voltar')

// ============================
// FUNÇÃO GLOBAL DE TROCA DE TELAS
// ============================

function mostrarTela(tela) {
    tela1.classList.remove('active')
    tela2.classList.remove('active')
    tela3.classList.remove('active')

    tela.classList.add('active')
}

// ============================
// CONTROLE DO HEADER
// ============================

function atualizarHeader(telaAtual) {

    if (telaAtual === 1) {
        botaoSair.style.display = 'flex'
        botaoVoltar.style.display = 'none'
    }

    if (telaAtual === 2) {
        botaoSair.style.display = 'none'
        botaoVoltar.style.display = 'flex'
    }

    if (telaAtual === 3) {
        botaoSair.style.display = 'none'
        botaoVoltar.style.display = 'flex'
    }
}

// Inicia na tela 1
mostrarTela(tela1)
atualizarHeader(1)


// ============================
// BUSCAR CURSOS
// ============================

async function verCursos() {
    const url = 'https://lion-school-phbo.onrender.com/cursos'
    const response = await fetch(url)
    const cursos = await response.json()
    return cursos
}

// ============================
// BUSCAR ALUNOS POR CURSO
// ============================

async function verAlunosCurso(id) {
    const url = `https://lion-school-phbo.onrender.com/alunos?curso_id=${id}`
    const response = await fetch(url)
    const alunos = await response.json()
    return alunos
}

// ============================
// CRIAR BOTÕES DOS CURSOS
// ============================

async function criarBotoesCursos() {

    const cursos = await verCursos()

    cursos.forEach(curso => {

        const botao = document.createElement('button')
        botao.classList.add('curso')
        botao.textContent = curso.nome

        botoes.appendChild(botao)

        botao.addEventListener('click', async () => {

            const alunos = await verAlunosCurso(curso.id)

            mostrarAlunos(alunos, curso.nome)

            mostrarTela(tela2)
            atualizarHeader(2)
        })
    })
}

criarBotoesCursos()


// ============================
// MOSTRAR ALUNOS NA TELA 2
// ============================

function mostrarAlunos(alunos, nomeCurso) {

    const containerTela2 = document.getElementById('tela2')
    containerTela2.innerHTML = ''

    // Título do curso
    const titulo = document.createElement('h1')
    titulo.classList.add('titulo-curso')
    titulo.textContent = nomeCurso

    containerTela2.appendChild(titulo)

    // Container dos cards
    const containerAlunos = document.createElement('div')
    containerAlunos.classList.add('container-alunos')

    alunos.forEach(aluno => {

        const card = document.createElement('div')
        card.classList.add('card-aluno')

        const imagem = document.createElement('img')
        imagem.src = aluno.foto || 'img/padrao.png'
        imagem.alt = aluno.nome

        const nome = document.createElement('h2')
        nome.textContent = aluno.nome

        card.appendChild(imagem)
        card.appendChild(nome)

        // 👇 IR PARA TELA 3 AO CLICAR NO ALUNO
        card.addEventListener('click', () => {

            console.log('Aluno selecionado:', aluno)

            mostrarTela(tela3)
            atualizarHeader(3)
        })

        containerAlunos.appendChild(card)
    })

    containerTela2.appendChild(containerAlunos)
}


// ============================
// BOTÃO VOLTAR
// ============================

botaoVoltar.addEventListener('click', () => {

    if (tela3.classList.contains('active')) {
        mostrarTela(tela2)
        atualizarHeader(2)
        return
    }

    if (tela2.classList.contains('active')) {
        mostrarTela(tela1)
        atualizarHeader(1)
    }
})


// ============================
// BOTÃO SAIR
// ============================

botaoSair.addEventListener('click', () => {
    alert('Saindo do sistema...')
})