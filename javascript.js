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
 

function enviarMensagem(){
 
     mensagemEnviada = document.querySelector('.mensagem').value;
     mensagem.text = mensagemEnviada;
     console.log(mensagem);
     promessa =  axios.post("https://mock-api.driven.com.br/api/vm/uol/messages", mensagem);
     renderizaMensagens();
 }

function usuarioDefinido(){
     divLogin.remove();
    renderizaMensagens();
     mensagem.from = usuario.name;
     console.log(mensagem);
}

function erroUsuario(){
     alert("Erro! ");
 

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
               boxMensagens.innerHTML += 
               `<li data-test="message"><p>
               <time>(${asMensagens[asMensagens.length - [i]].time})</time><strong>${asMensagens[asMensagens.length -[i]].from}</strong>Para <strong>${asMensagens[asMensagens.length - [i]].to}</strong>${asMensagens[asMensagens.length -[i]].text}</p></li>`
               }
     })
 };
 