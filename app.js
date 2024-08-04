/*pego a área h1 e p do html e coloco uma String dentro delas
let titulo = document.querySelector('h1');
titulo.innerHTML = "Jogo do número secreto";
let paragrafo = document.querySelector('p');
paragrafo.innerHTML = "Escolha um número entre 1 e 10";*/

let listaNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
console.log(numeroSecreto);
let tentativas = 1;

function exibirTextoNaTela(tag,texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}
function exibirMensagemInicial(){
    exibirTextoNaTela('h1',"Jogo do número secreto");
    exibirTextoNaTela('p',`Escolha um número entre 1 e ${numeroLimite}`);     
}

function verificarChute() {
    //pego o valor digitado dentro do campo input
     let chute = document.querySelector('input').value;

     if(chute == 0){
        alert('Favor inserir um valor');
        return;
     }
         
     if(chute == numeroSecreto){
        exibirTextoNaTela('h1', "Acertou");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Voce descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p',mensagemTentativas);
        //removo o disabled do botão e deixo ele 'clicável'
        document.getElementById('reiniciar').removeAttribute('disabled');
     } else 
          if(chute > numeroSecreto){
              exibirTextoNaTela('p', "O número secreto é menor!")
           } else{
                exibirTextoNaTela('p', "O número secreto á maior");
              } 
              tentativas ++;
              limparCampo();
     }


function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementoNaLista = listaNumerosSorteados.length;

    if (quantidadeElementoNaLista == numeroLimite){//se a lista encher, eu esvazio ela
         listaNumerosSorteados = [];
    }

    //verifico se o número escolhido consta na lista de numeros sorteados
    if(listaNumerosSorteados.includes(numeroEscolhido)){
        //se ja contem na lista, chamo a função novamente
         return gerarNumeroAleatorio();
    } else {//adiciona o numero gerado na lista  
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo(){//limpo o campo input colocando uma String vazia
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    //para desabilitar novamente o botão reiniciar
    document.getElementById('reiniciar').setAttribute('disabled',true);
}
//preciso chamar esta função fora de qualquer lugar, para ser lida assim que abrir o app
exibirMensagemInicial();