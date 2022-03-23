/* Criando variaveis de controle de interface */
let seuVotoPara = document.querySelector('.div-one-1 span');
let cargo = document.querySelector('.div-one-2 span');
let descricao = document.querySelector('.div-one-4');
let aviso = document.querySelector('.div-two');
let lateral = document.querySelector('.div-one-right');
let numeros = document.querySelector('.div-one-3');
/* Sempre que declarar uma variavel usar: nomeDaVariavel.innerHTML = '' Sempre que utilizar isso ele vai apagar temporariamente o elemento que voce quer testar */

/* Criando variaveis de Controle de Ambiente */
let etapaAtual = 0;
let numero = ''; /* variavel para deixar numeros zerados e quando eu for preenchendo pelo teclado ele joga dentro dessa variavel */
let votoBranco = false;
let votos = []; /* Criando esse array eu poso armazenar as informaçoes dos votos para utilizar em outro lugar ou de outra forma */

/* Criando uma function para: zerar tela, pegar informaçoes da etapa atual e preencher o que precisa ser preenchido */
function comecarEtapa() {
    let etapa = etapas[etapaAtual]; /* Cria outra variavel, pega todo o conteudo da variavel etapas do etapa.js e coloca como valor da variavel etapa o valor passado no etapaAtual -> 0 */

    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for(let i = 0; i < etapa.numeros; i++) {/*Criando um for para montar os quadradinhos com um loop de acordo com o tanto de numeros referentes ao numeros que tem em cada titulo */
        if (i === 0) { /* Entao para ele aparecer eu preciso colocar não para que ele só mostre quando tiver a classe numero e sim a classe NUMERO PISCA. Logo SE a classe for numero pisca e o i for igual a 0 */
            numeroHtml += '<div class="numero pisca"></div>';
        } else {
            numeroHtml += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none'; /* posso usar a expressao para zerar do mesmo modo que nomeDaVariavel.innerHTML = '' */
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml; /* a variavel numeroHtml vai ser preenchida a cima */
}

function atualizaInterface() { /* Vou executar essa função sempre que eu executar uma ação. Se eu digito um numero ele preenche o numero na let numero que esta vazia e atualiza a inteface */
    let etapa = etapas[etapaAtual];

    let candidato = etapa.candidatos.filter((item) => {
        if(item.numero === numero) { /* Foi criado essa arrow function para saber se o numero digitado é igual ao numero do meu candidato */
            return true;
        } else {
            return false;
        }
    }); /* Agora eu preciso procurar um candidato que tenha esse numero. Essa busca vai ser feita por um filtro */

    if(candidato.length > 0) { /* Se foi encontrado algum candidato */
        candidato = candidato [0]; /* Pegando o primeiro candidato e agora que ele foi encontrado eu preciso preencher as informaçoes dele na tela */
        seuVotoPara.style.display = 'block'; /* seuVotoPara não sera mais none, agora ele aparecerá */
        aviso.style.display = 'block'; /* Aviso agora aparecerá tambem */
        descricao.innerHTML = `Nome: ${candidato.nome}<br/> Partido: ${candidato.partido}`; /* descrição aparecerá */
    
        let fotosHtml = ''; /* montando a estrutura de fotos do candidato */
        for(let i in candidato.fotos) {
            if(candidato.fotos[i].small) {
                fotosHtml += `<div class="div-one-right-image small"><img src="img/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`; /* Selecionando as fotos dos candidatos que possuem 5 digitos */
            }else {
                fotosHtml += `<div class="div-one-right-image"><img src="img/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            }
        }
        lateral.innerHTML = fotosHtml;
    } else { /* Caso voce digite um numero errado se qualifica com voto nulo */
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        /* nao aparecera foto, nem nome e descrição do candidato, só aparecera um aviso informando que o voto foi nulo ou em branco */
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>';
    }
}
/* Criando funçoes para cada botão do teclado */
function clicou(n) {
    /* alert('clicou em '+n); */
    let elNumero = document.querySelector('.numero.pisca'); /* Aqui ele vai procurar um numero que esteja piscando que é nele que eu vou colocar algum conteudo */
    if (elNumero !== null) { /* Se numero for diferente de null ele pode preencher nesse espaço caso precionado o botão */
        elNumero.innerHTML = n; /* Vai preencher o numero que eu digitei, porem ele deve ser preenchido na let numero */
        numero = `${numero}${n}`; /* template string para concatenar e não somar. Esta pronto porem não vai aparecer nada pq só ficar no lugar quando ja tiver um numero piscando, como declarado acima */

        elNumero.classList.remove('pisca'); /* Aqui eele vai tirar a classe pisca quando o numero for preenchido para que possa passar para os proximos quadrados a serem preenchidos */

        if (elNumero.nextElementSibling !== null) { /* Se eu so deixo para ele ir adicionando no proximo a classe pisca ele gera um erro pois chega no ultimo e ele não tem como adicionar mais. Portanto preciso criar uma condição, para que SE o proximo item for diferente de nulo, ou seja, tem um proximo item ele executa a função de adicionar o pisca */
            elNumero.nextElementSibling.classList.add('pisca'); /* primeiro eu pego o proximo elemento, proximo quadrado e adiciono a classe pisca nele para que a proxima que quando eu apertar o primeiro, esse pare de piscar e comece o segundo a piscar e assim por diante. */
        } else { /* Caso contrario, eu passo para proxima função para alterar minha interface */
            atualizaInterface(); /* Caso ja esteja tudo preenchido, essa função vai verificar o numero e se tem algum com esse numero e mostrar as informaçoes do cidadao na tela */
        }
        
    }
}
function branco() {
    /* alert('clicou em BRANCO'); */
    numero = '';
    votoBranco = true;

    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO</div>';
    lateral.innerHTML = '';
}
function corrige() {
    /* alert('clicou em CORRIGE'); */
    comecarEtapa();
}
function confirma() {
    /* alert('clicou em CONFIRMA'); */
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false; /* Variavel para confirmar se o voto foi realizado */
    
    if(votoBranco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });

    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto:numero
        });
    }
    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
        } else {
       document.querySelector('.tela').innerHTML = '<div class="aviso-gigante pisca">FIM</div>'
       console.log(votos);
       }
    }
}
/* Criar alert quando declarar uma função para assim testar se a função esta funcionando */

comecarEtapa(); /* Chamo a função começar etapa para ele iniciar, zerando tudo no caso */