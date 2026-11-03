(function(){
var fls=document.querySelectorAll('.fl');
fls.forEach(function(b){b.addEventListener('click',function(){var f=b.getAttribute('data-f');fls.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});document.querySelectorAll('#pf .pcard').forEach(function(c){c.hidden=!(f==='all'||c.getAttribute('data-areas').split(' ').indexOf(f)>-1)})})});
var f=document.getElementById('f');
if(f){
var fb=document.getElementById('fb'),btn=f.querySelector('button[type=submit]');
function msg(t,ok){fb.textContent=t;fb.className='note '+(ok?'ok':'err');fb.hidden=false}
f.addEventListener('submit',function(e){
 e.preventDefault();
 var g=function(n){return f.elements[n]};
 if(!g('ciente').checked){msg('Marque a ciência da política de privacidade para enviar.');return}
 if(!f.checkValidity()){f.reportValidity();return}
 var tk=f.querySelector('[name="cf-turnstile-response"]');
 if(!tk||!tk.value){msg('Aguarde a verificação anti-spam terminar e tente de novo.');return}
 btn.disabled=true;msg('Enviando…',true);
 fetch('/api/contato',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({
  assunto:g('assunto').value,nome:g('nome').value,empresa:g('empresa').value,email:g('email').value,
  mensagem:g('mensagem').value,ciente:true,site:g('site').value,token:tk.value})})
 .then(function(r){return r.json().catch(function(){return{ok:false}}).then(function(d){return{r:r,d:d}})})
 .then(function(x){
  if(x.r.ok&&x.d.ok){f.reset();msg('Mensagem enviada. Obrigado! Respondemos em breve.',true)}
  else{if(x.d&&x.d.detalhe)console.warn('contato:',x.d.detalhe);msg((x.d&&x.d.erro)||'Não foi possível enviar agora. Escreva para contato@b2b-company.com.')}
 })
 .catch(function(){msg('Sem conexão. Tente de novo ou escreva para contato@b2b-company.com.')})
 .then(function(){btn.disabled=false;if(window.turnstile)try{turnstile.reset()}catch(_){}});
});
}
})();
