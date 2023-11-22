//Definindo a dimensão do palco do jogo

//definimos as variáveis fora da função para elas poderem ser usadas de forma global
var altura = 0
var largura = 0
var vidas = 1
var tempo = 30

var criaMosquistoTempo = 1500

var nivel = window.location.search
nivel = nivel.replace('?', '') //removendo o caracter ?
if (nivel === 'normal') {
    criaMosquistoTempo = 1500
}
else if (nivel === 'medio') {
    criaMosquistoTempo = 1000
}
else if (nivel === 'dificil') {
    criaMosquistoTempo = 750
}

function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight
    largura = window.innerWidth

    console.log(largura, altura)
}

ajustaTamanhoPalcoJogo()

//Criando posições randômicas
var cronometro = setInterval(function () {

    tempo -= 1
    if (tempo < 0) { //se o usuário chegar até o tempo 0 então ele venceu
        clearInterval(cronometro)
        clearInterval(criaMosca)
        window.location.href = 'vitoria.html'
    }
    else {
        document.getElementById('cronometro').innerHTML = tempo // innerHtml é valor contido dentro da tag
    }


}, 1000)

function posicaoRandomica() {

    //remover mosquito anterior caso exista
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()

        if (vidas > 3) {
            window.location.href = 'fim_de_jogo.html'
        }
        else {
            document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png"

            vidas++
        }

    }


    var posicaoX = Math.floor(Math.random() * largura) - 90 //math.random gera valores entre 0 e 1
    var posicaoY = Math.floor(Math.random() * altura) - 90 //-90 para a posição não estore o limite já que a imagem tem 50px

    posicaoX = posicaoX < 0 ? 0 : posicaoX //se posiçãoX for menor que 0 ela recebe o valor 0 senão ela recebe seu proprio valor
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    console.log(posicaoX, posicaoY)

    //criar o elemento html
    var mosquito = document.createElement('img')
    mosquito.src = 'imagens/mosquito.png'
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'
    mosquito.onclick = function () {
        this.remove() //O this faz referência ao próprio elemento html //se clicarmos antes do tempo acabar então o elemento não irá existir e portanto não entra na condição de remover vidas
    }

    document.body.appendChild(mosquito)

    ladoAleatorio()

}




var criaMosca = setInterval(function () {
    posicaoRandomica()
}, criaMosquistoTempo)

//Tamanhos randômicos
function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3)

    switch (classe) {
        case 0:
            return 'mosquito1'

        case 1:
            return 'mosquito2'

        case 2:
            return 'mosquito3'
    }
}

function ladoAleatorio() {
    var classe = Math.floor(Math.random() * 2)

    switch (classe) {
        case 0:
            return 'ladoA'

        case 1:
            return 'ladoB'

    }
}

