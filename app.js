'use strict'

// ============================
// ELEMENTOS
// ============================

const botoes = document.getElementById('cursos')
const tela1 = document.querySelector('.tela_1')
const tela2 = document.querySelector('.tela_2')
const tela3 = document.querySelector('.tela3')

const botaoSair = document.querySelector('.sair')
const botaoVoltar = document.querySelector('.voltar')

const boxPerfil = document.getElementById('boxPerfil')
const boxEstatisticas = document.getElementById('boxEstatisticas')

// ============================
// TROCAR TELAS
// ============================

function mostrarTela(tela){
    tela1.classList.remove('active')
    tela2.classList.remove('active')
    tela3.classList.remove('active')

    tela.classList.add('active')
}

// ============================
// HEADER
// ============================

function atualizarHeader(telaAtual){
    if(telaAtual === 1){
        botaoSair.style.display = 'flex'
        botaoVoltar.style.display = 'none'
    }
    if(telaAtual === 2){
        botaoSair.style.display = 'none'
        botaoVoltar.style.display = 'flex'
    }
    if(telaAtual === 3){
        botaoSair.style.display = 'none'
        botaoVoltar.style.display = 'flex'
    }
}

mostrarTela(tela1)
atualizarHeader(1)

// ============================
// BUSCAR CURSOS
// ============================

async function verCursos(){
    const url = 'https://lion-school-phbo.onrender.com/cursos'
    const response = await fetch(url)
    const cursos = await response.json()
    return cursos
}

// ============================
// BUSCAR ALUNOS
// ============================

async function verAlunosCurso(id){
    const url = `https://lion-school-phbo.onrender.com/alunos?curso_id=${id}`
    const response = await fetch(url)
    const alunos = await response.json()
    return alunos
}

// ============================
// BUSCAR ALUNO POR ID
// ============================

async function buscarAlunoPorId(id){
    const url = `https://lion-school-phbo.onrender.com/alunos/${id}`
    const response = await fetch(url)
    const dados = await response.json()
    return dados
}

// ============================
// CRIAR BOTÕES
// ============================

async function criarBotoesCursos(){
    const cursos = await verCursos()

    cursos.forEach(curso=>{
        const botao = document.createElement('button')
        botao.textContent = curso.nome
        botoes.appendChild(botao)

        botao.addEventListener('click', async()=>{
            const alunos = await verAlunosCurso(curso.id)
            mostrarAlunos(alunos, curso.nome)
            mostrarTela(tela2)
            atualizarHeader(2)
        })
    })
}

criarBotoesCursos()

// ============================
// MOSTRAR ALUNOS
// ============================

function mostrarAlunos(alunos,nomeCurso){
    const container = document.getElementById('tela2')
    container.innerHTML = ''

    const titulo = document.createElement('h1')
    titulo.classList.add('titulo-curso')
    titulo.textContent = nomeCurso
    container.appendChild(titulo)

    const containerAlunos = document.createElement('div')
    containerAlunos.classList.add('container-alunos')

    alunos.forEach(aluno=>{
        const card = document.createElement('div')
        card.classList.add('card-aluno')

        const img = document.createElement('img')
        img.src = aluno.foto

        const nome = document.createElement('h2')
        nome.textContent = aluno.nome

        card.appendChild(img)
        card.appendChild(nome)

        card.addEventListener('click',()=>{
            mostrarPerfilAluno(aluno.id)
            mostrarTela(tela3)
            atualizarHeader(3)
        })

        containerAlunos.appendChild(card)
    })

    container.appendChild(containerAlunos)
}

// ============================
// PERFIL DO ALUNO
// ============================

async function mostrarPerfilAluno(id){
    const dados = await buscarAlunoPorId(id)

    boxPerfil.replaceChildren()
    boxEstatisticas.replaceChildren()

    const img = document.createElement('img')
    img.src = dados.foto

    const nome = document.createElement('span')
    nome.textContent = dados.nome

    boxPerfil.appendChild(img)
    boxPerfil.appendChild(nome)

    dados.desempenho.forEach(info=>{
        const coluna = document.createElement('div')
        coluna.classList.add('coluna')

        // NUMERO ACIMA DA BARRA
        const valor = document.createElement('span')
        valor.classList.add('valor')
        valor.textContent = info.valor

        // BARRA
        const barra = document.createElement('div')
        barra.classList.add('preenchimento')
        barra.style.height = `${info.valor}%`

        // LEGENDA EMBAIXO
        const legenda = document.createElement('span')
        legenda.classList.add('legenda')
        legenda.textContent = info.sigla

        // ORDEM: valor em cima, barra no meio, legenda embaixo
        coluna.appendChild(valor)
        coluna.appendChild(barra)
        coluna.appendChild(legenda)

        boxEstatisticas.appendChild(coluna)
    })
}

// ============================
// BOTÃO VOLTAR
// ============================

botaoVoltar.addEventListener('click',()=>{
    if(tela3.classList.contains('active')){
        mostrarTela(tela2)
        atualizarHeader(2)
        return
    }
    if(tela2.classList.contains('active')){
        mostrarTela(tela1)
        atualizarHeader(1)
    }
})

// ============================
// BOTÃO SAIR
// ============================

botaoSair.addEventListener('click',()=>{
    alert("Saindo do sistema")
})