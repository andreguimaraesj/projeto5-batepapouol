axios.defaults.headers.common['Authorization'] = 'loWHc3NYULzWE2LfdmJZ02W8';

let boxMensagens = document.querySelector('.conteudoMensagens');
boxMensagens.innerHTML = '';
let mensagemEnviada;
let usuario = {
     name: ''
}
let promessaUsuario;
let divLogin = document.getElementById("login0");
let mensagem = {
     from: "",
     to: "Todos",
     text: "",
     type: "message"
 }
 let promessa;
 let todasMensagens;
 let statusAtual;
 let usuarioValido;
 

function enviarMensagem(){
 
     mensagemEnviada = document.querySelector('.mensagem').value;
     mensagem.text = mensagemEnviada;
     mensagem.type = 'message'
     console.log(mensagem);
     promessa =  axios.post("https://mock-api.driven.com.br/api/vm/uol/messages", mensagem);
     renderizaMensagens();
     promessa.then(renderizaMensagens);
     promessa.catch(atualizaPagina);
 }

 function atualizaPagina(){
     window.location.reload();
 }

function usuarioDefinido(){
     divLogin.remove();
     mensagem.from = usuario.name;
     mensagem.type = 'status'
     renderizaMensagens();
     setInterval(renderizaMensagens, 3000);
     setInterval(verificaStatus, 5000);
    // 
     console.log(mensagem);     

}

function erroUsuario(){
     alert("Erro! Este usuário já foi utilizado.");
     atualizaPagina();
 

}

function defineUsuario(){

     usuario.name = document.querySelector('.inputUsuario').value;
     promessaUsuario = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants ', usuario);
     promessaUsuario.then(usuarioDefinido);
     promessaUsuario.catch(erroUsuario);
 
}

  let asMensagens;
  function renderizaMensagens(){

  
          todasMensagens = axios.get("https://mock-api.driven.com.br/api/vm/uol/messages");
          todasMensagens.then((mensagens) =>{
               asMensagens = mensagens.data;
               boxMensagens.innerText = ""
               for(let i = asMensagens.length; i > 0 ; i-- ) {

                 //   if(asMensagens[i].type == "message"){
               boxMensagens.innerHTML += 
               `<li data-test="message"><p>
               <time>(${asMensagens[asMensagens.length-[i]].time})</time>
               <strong>${asMensagens[asMensagens.length-[i]].from}</strong>
               para <strong>${asMensagens[asMensagens.length-[i]].to}</strong>
               ${asMensagens[asMensagens.length-[i]].text}</p></li>`


               
               }
 
               boxMensagens.scrollTop = boxMensagens.scrollHeight;
               console.log(asMensagens);

               
      })
 };

 function verificaStatus(){
     statusAtual = axios.post("https://mock-api.driven.com.br/api/vm/uol/status", usuario)
  }
 