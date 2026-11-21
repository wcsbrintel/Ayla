/* AYLA 1.2 — members-only communications panel.
   Uses Observatory Firebase Authentication and its approved access/{uid} grant.
   Messages are never stored in GitHub Pages, only in protected Firestore.
   Security depends on deployed /ayla_chat_messages rules, not the interface. */
import {initializeApp} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {getAuth,onAuthStateChanged,signInWithEmailAndPassword,signOut,reload,sendPasswordResetEmail,sendEmailVerification} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import {getFirestore,doc,getDoc,collection,query,orderBy,limit,startAfter,getDocs,onSnapshot,addDoc,serverTimestamp} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
const config={apiKey:"AIzaSyASO8naQUK_WwKgRV9Uqanx08GcMI4UE90",authDomain:"fir-console-61443.firebaseapp.com",projectId:"fir-console-61443",storageBucket:"fir-console-61443.firebasestorage.app",appId:"1:278068161446:web:a63993ee2cb1439eacfd67"};
const $=id=>document.getElementById(id);
const T={
pt:{title:"Área restrita",intro:"Comunicação exclusiva entre usuários autorizados do Observatório.",email:"E-mail",password:"Senha",login:"Entrar",reset:"Esqueceu sua senha?",logout:"Sair",refresh:"Verificar novamente",resend:"Reenviar verificação",pending:"Seu acesso aguarda aprovação administrativa.",verify:"Confirme seu e-mail antes de acessar.",failure:"Não foi possível verificar sua autorização.",loading:"Verificando acesso...",signinError:"Não foi possível entrar. Confira seus dados.",resetSent:"Se o endereço estiver cadastrado, você receberá instruções de recuperação.",chatTitle:"Mensagens da central",online:"Canal de usuários autorizados",write:"Escreva uma mensagem para o grupo...",send:"Enviar",older:"Mensagens anteriores",newer:"Voltar às recentes",empty:"Nenhuma mensagem neste grupo.",history:"Histórico",failureChat:"As mensagens não puderam ser carregadas. Confira se as regras do chat estão publicadas no Firebase.",failureSend:"Falha ao enviar. Verifique suas permissões no Firebase.",sending:"Enviando...",self:"Você",colleague:"Investigador",time:"Agora",hint:"Cinco mensagens por vez. As anteriores ficam no histórico.",map:"Mapa da central",mapSub:"Globo geográfico em tempo real",noAccess:"Somente contas aprovadas podem ler ou enviar mensagens.",connected:"Conexão autenticada"},
en:{title:"Restricted area",intro:"Exclusive communication between authorized Observatory users.",email:"Email",password:"Password",login:"Sign in",reset:"Forgot password?",logout:"Sign out",refresh:"Check again",resend:"Resend verification",pending:"Your access is awaiting administrator approval.",verify:"Verify your email to continue.",failure:"Unable to verify your authorization.",loading:"Checking access...",signinError:"Sign-in failed. Check your credentials.",resetSent:"If registered, you will receive password recovery instructions.",chatTitle:"Headquarters messages",online:"Authorized users channel",write:"Write a message to the group...",send:"Send",older:"Older messages",newer:"Back to latest",empty:"No messages in this group.",history:"History",failureChat:"Messages could not be loaded. Check that chat security rules are deployed in Firebase.",failureSend:"Unable to send. Check your Firebase permissions.",sending:"Sending...",self:"You",colleague:"Investigator",time:"Now",hint:"Five messages at a time. Older ones remain in the history.",map:"Headquarters map",mapSub:"Live geographic globe",noAccess:"Only approved accounts can read or send messages.",connected:"Authenticated connection"},
es:{title:"Área restringida",intro:"Comunicación exclusiva entre usuarios autorizados del Observatorio.",email:"Correo",password:"Contraseña",login:"Ingresar",reset:"¿Olvidó su contraseña?",logout:"Salir",refresh:"Verificar nuevamente",resend:"Reenviar verificación",pending:"Su acceso está pendiente de aprobación administrativa.",verify:"Verifique su correo para continuar.",failure:"No se pudo comprobar su autorización.",loading:"Verificando acceso...",signinError:"No fue posible ingresar. Revise sus datos.",resetSent:"Si está registrado, recibirá instrucciones para recuperar su contraseña.",chatTitle:"Mensajes de la central",online:"Canal de usuarios autorizados",write:"Escriba un mensaje al grupo...",send:"Enviar",older:"Mensajes anteriores",newer:"Volver a recientes",empty:"No hay mensajes en este grupo.",history:"Historial",failureChat:"No se pudieron cargar los mensajes. Compruebe las reglas del chat en Firebase.",failureSend:"No se pudo enviar. Revise sus permisos en Firebase.",sending:"Enviando...",self:"Usted",colleague:"Investigador",time:"Ahora",hint:"Cinco mensajes por página. Los anteriores quedan en el historial.",map:"Mapa de la central",mapSub:"Globo geográfico en tiempo real",noAccess:"Solo cuentas aprobadas pueden leer o enviar mensajes.",connected:"Conexión autenticada"}};
let locale="pt",auth=null,db=null,user=null,approved=false,visible=false,seq=0,stopLive=null,history=[],page=0,busy=false,chatBusy=false,latestSnapshots=[],canLoadMore=false;
const tr=()=>T[locale],setText=(id,value)=>{if($(id))$(id).textContent=value},show=(id,on)=>$(id)?.classList.toggle("hidden",!on);
function status(value){setText("restrictedStatus",value)}
function views(which){for(const v of ["Login","Waiting","Approved"])show("restricted"+v,which===v)}
function stopListener(){if(stopLive){stopLive();stopLive=null}}
function clearChat(){stopListener();history=[];page=0;canLoadMore=false;latestSnapshots=[];$("restrictedMessages")?.replaceChildren();show("restrictedChat",false);$("restrictedScreen")?.classList.remove("restricted-authorized")}
function loginView(){approved=false;user=null;clearChat();views("Login");status("")}
function waiting(reason){approved=false;clearChat();views("Waiting");setText("restrictedWaitingTitle",tr()[reason]);show("restrictedResend",reason==="verify");status("")}
function formatStamp(raw){const date=raw?.toDate?.();if(!date)return tr().time;try{return new Intl.DateTimeFormat(locale,{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"}).format(date)}catch{return tr().time}}
function renderRows(snapshots){
 const box=$("restrictedMessages");if(!box)return;box.replaceChildren();
 const rows=snapshots.map(d=>d.data()).reverse();
 if(!rows.length){const el=document.createElement("div");el.className="restricted-empty";el.textContent=tr().empty;box.append(el)}
 for(const v of rows){
  const item=document.createElement("article");item.className="restricted-message"+(v.senderUid===user?.uid?" mine":"");
  const meta=document.createElement("div");meta.className="restricted-message-meta";
  const name=document.createElement("strong");
  // Firebase email addresses are not disclosed to other users.
  name.textContent=v.senderUid===user?.uid?tr().self:tr().colleague+" · "+String(v.senderUid||"").slice(0,5).toUpperCase();
  const time=document.createElement("time");time.textContent=formatStamp(v.createdAt);
  const p=document.createElement("p");p.textContent=String(v.body||"");
  meta.append(name,time);item.append(meta,p);box.append(item);
 }
 const older=$("restrictedOlder"),newer=$("restrictedNewer");
 if(older){older.disabled=!canLoadMore;show("restrictedOlder",canLoadMore)}
 show("restrictedNewer",page>0);
 setText("restrictedPage",String(page+1));
}
function pageQuery(cursor){const parts=[orderBy("createdAt","desc")];if(cursor)parts.push(startAfter(cursor));parts.push(limit(5));return query(collection(db,"ayla_chat_messages"),...parts)}
function currentSnapshots(){return history[page]?.rows||[]}
function errorChat(err){
 console.warn("[AYLA] Chat unavailable",err?.code||err?.message);
 setText("restrictedChatError",tr().failureChat);
 show("restrictedChatError",true);
}
function listenLatest(){
 if(!approved||!user||!visible)return;stopListener();
 page=0;history=[];show("restrictedChatError",false);
 stopLive=onSnapshot(pageQuery(null),snap=>{
  if(!approved||!visible)return;
  const rows=snap.docs;
  history=[{rows,cursor:rows.at(-1)||null}];
  canLoadMore=rows.length===5;
  renderRows(rows);
 },errorChat);
}
async function older(){
 if(!approved||!user||chatBusy||!canLoadMore)return;chatBusy=true;
 try{
  if(history[page+1]){page++;canLoadMore=currentSnapshots().length===5;renderRows(currentSnapshots());return}
  const cursor=history[page]?.cursor;if(!cursor)return;
  const data=await getDocs(pageQuery(cursor));
  if(!approved||!visible)return;
  const rows=data.docs;
  if(rows.length){history.push({rows,cursor:rows.at(-1)});page++;canLoadMore=rows.length===5;renderRows(rows)}
  else {canLoadMore=false;renderRows(currentSnapshots())}
 }catch(err){errorChat(err)}finally{chatBusy=false}
}
function latest(){if(!approved)return;listenLatest()}
async function send(event){
 event.preventDefault();if(!approved||!user||busy)return;
 const input=$("restrictedMessageInput"),body=input.value.trim();if(!body||body.length>700)return;
 busy=true;$("restrictedSend").disabled=true;show("restrictedChatError",false);
 try{
  await addDoc(collection(db,"ayla_chat_messages"),{senderUid:user.uid,body,createdAt:serverTimestamp()});
  input.value="";if(page>0)listenLatest();
 }catch(err){console.warn("[AYLA] Chat send",err?.code||err?.message);setText("restrictedChatError",tr().failureSend);show("restrictedChatError",true)}
 finally{busy=false;$("restrictedSend").disabled=false}
}
function authorized(){
 views("Approved");approved=true;$("restrictedScreen")?.classList.add("restricted-authorized");
 setText("restrictedAccount",user?.email||"");
 setText("restrictedApprovedTitle",tr().connected);show("restrictedChat",true);status("");
 listenLatest();
}
async function check(u){
 const token=++seq;user=u;approved=false;clearChat();
 if(!u){loginView();return}
 views("Waiting");status(tr().loading);
 try{
  await reload(u);await u.getIdToken(true);
  if(token!==seq||auth?.currentUser?.uid!==u.uid)return;
  if(!u.emailVerified){waiting("verify");return}
  const access=await getDoc(doc(db,"access",u.uid));
  if(token!==seq||auth?.currentUser?.uid!==u.uid)return;
  if(access.exists()&&access.data().approved===true){approved=true;authorized()}else waiting("pending");
 }catch(err){if(token===seq){console.warn("[AYLA] Auth check",err?.code||err?.message);waiting("failure")}}
}
function localize(l){
 locale=T[l]?l:"pt";
 const keys={restrictedHeading:"title",restrictedIntro:"intro",restrictedEmailLabel:"email",restrictedPasswordLabel:"password",restrictedLoginButton:"login",restrictedResetButton:"reset",restrictedLogout:"logout",restrictedRefresh:"refresh",restrictedResend:"resend",restrictedChannelHeading:"chatTitle",restrictedChannelSubtitle:"online",restrictedSend:"send",restrictedHistoryNote:"hint",restrictedMapTitle:"map",restrictedMapSubtitle:"mapSub"};
 for(const [id,key] of Object.entries(keys))setText(id,tr()[key]);
 const input=$("restrictedMessageInput");if(input)input.placeholder=tr().write;
 setText("restrictedOlder",tr().older);setText("restrictedNewer",tr().newer);
 if(approved){setText("restrictedApprovedTitle",tr().connected);renderRows(currentSnapshots())}
 else if(user)waiting(user.emailVerified?"pending":"verify");
 else views("Login");
}
async function init(){
 if(auth)return;
 try{
  const app=initializeApp(config,"ayla-game");
  auth=getAuth(app);db=getFirestore(app);
  onAuthStateChanged(auth,u=>check(u),()=>waiting("failure"));
 }catch(e){console.warn("[AYLA] Firebase init",e?.code||e?.message);waiting("failure")}
}
window.AYLARestricted={
 open(l){visible=true;localize(l);if(!auth){views("Waiting");status(tr().loading);init()}else if(auth.currentUser)check(auth.currentUser);else loginView()},
 close(){visible=false;seq++;clearChat()},
 setLanguage(l){localize(l)},
 authorized:()=>!!approved&&visible
};
$("restrictedAuthForm")?.addEventListener("submit",async event=>{
 event.preventDefault();if(!auth||busy)return;
 busy=true;$("restrictedLoginButton").disabled=true;status(tr().loading);
 try{await signInWithEmailAndPassword(auth,$("restrictedEmail").value.trim(),$("restrictedPassword").value);$("restrictedPassword").value=""}
 catch(err){console.warn("[AYLA] Login",err?.code);status(tr().signinError)}
 finally{busy=false;$("restrictedLoginButton").disabled=false}
});
$("restrictedResetButton")?.addEventListener("click",async()=>{
 if(!auth)return;const input=$("restrictedEmail");
 if(!input.checkValidity()){input.reportValidity();return}
 try{await sendPasswordResetEmail(auth,input.value.trim())}catch(e){console.warn("[AYLA] Reset",e?.code)}
 status(tr().resetSent);
});
async function logout(){seq++;clearChat();if(auth)await signOut(auth).catch(()=>{});loginView()}
$("restrictedLogout")?.addEventListener("click",logout);
$("restrictedWaitingLogout")?.addEventListener("click",logout);
$("restrictedRefresh")?.addEventListener("click",()=>auth?.currentUser&&check(auth.currentUser));
$("restrictedResend")?.addEventListener("click",async()=>{
 if(!auth?.currentUser)return;
 try{await sendEmailVerification(auth.currentUser);status(tr().verify)}catch{status(tr().failure)}
});
$("restrictedOlder")?.addEventListener("click",older);
$("restrictedNewer")?.addEventListener("click",latest);
$("restrictedChatForm")?.addEventListener("submit",send);
localize("pt");
