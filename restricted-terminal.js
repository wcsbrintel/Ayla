/* AYLA / Restricted terminal. Firebase config comes from public Observatory code.
   Only the signed-in user's access/{uid} approval is read. No private
   Observatory data is fetched and no Firestore writes are performed. */
import {initializeApp} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {getAuth,onAuthStateChanged,signInWithEmailAndPassword,signOut,reload,sendPasswordResetEmail,sendEmailVerification} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import {getFirestore,getDoc,doc} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
const cfg={
 apiKey:"AIzaSyASO8naQUK_WwKgRV9Uqanx08GcMI4UE90",
 authDomain:"fir-console-61443.firebaseapp.com",
 projectId:"fir-console-61443",
 storageBucket:"fir-console-61443.firebasestorage.app",
 appId:"1:278068161446:web:a63993ee2cb1439eacfd67"
};
const $=id=>document.getElementById(id);
const phrases={
 pt:{title:"Área restrita",intro:"Entre com sua conta do Observatório. O acesso exige e-mail verificado e aprovação administrativa.",email:"E-mail",password:"Senha",login:"Entrar",reset:"Esqueceu sua senha?",logout:"Sair",refresh:"Verificar novamente",resend:"Reenviar confirmação",loading:"Verificando sua conta...",invalid:"Não foi possível entrar. Confira os dados e tente novamente.",resetSent:"Se o endereço estiver cadastrado, você receberá instruções de recuperação.",verify:"Confirme seu e-mail para continuar.",pending:"Sua conta ainda não possui autorização administrativa.",failure:"Não foi possível validar as permissões. Confira as regras do Firebase e tente novamente.",welcome:"Acesso autorizado",granted:"Seu cadastro foi aprovado. Uma atividade adicional está disponível.",activity:"Treinamento avançado · Avaliação de evidências",description:"Exercício de treinamento com dados demonstrativos. Nenhuma informação restrita do Observatório é carregada.",begin:"Começar",answer:"Confirmar",redo:"Repetir",correct:"Correto. Diferencie fatos documentados de alegações.",incorrect:"Esta opção não é sustentada pelas evidências.",complete:"Treinamento concluído. Progresso armazenado apenas neste navegador.",note:"A aprovação é verificada no Firestore. O progresso deste exercício fica somente neste navegador.",step:"Etapa"},
 en:{title:"Restricted area",intro:"Sign in with your Observatory account. Verified email and administrator approval are required.",email:"Email",password:"Password",login:"Sign in",reset:"Forgot password?",logout:"Sign out",refresh:"Check again",resend:"Resend verification",loading:"Checking your account...",invalid:"Sign-in failed. Check your credentials and retry.",resetSent:"If the email is registered, recovery instructions will be sent.",verify:"Verify your email before continuing.",pending:"Your account has not yet been approved by an administrator.",failure:"Access could not be verified. Check Firebase rules and try again.",welcome:"Access authorized",granted:"Your account is approved. An additional activity is available.",activity:"Advanced training · Evidence assessment",description:"Training exercise using sample information. No restricted Observatory data is loaded.",begin:"Start",answer:"Confirm",redo:"Restart",correct:"Correct. Distinguish documented facts from claims.",incorrect:"This conclusion is not supported by the evidence.",complete:"Training completed. Progress stored only in this browser.",note:"Approval is verified in Firestore. Exercise progress remains in this browser.",step:"Step"},
 es:{title:"Área restringida",intro:"Ingrese con su cuenta del Observatorio. Se requiere correo verificado y aprobación administrativa.",email:"Correo",password:"Contraseña",login:"Ingresar",reset:"¿Olvidó su contraseña?",logout:"Salir",refresh:"Verificar nuevamente",resend:"Reenviar confirmación",loading:"Verificando cuenta...",invalid:"No se pudo ingresar. Revise sus datos e inténtelo de nuevo.",resetSent:"Si el correo está registrado, recibirá instrucciones de recuperación.",verify:"Verifique su correo para continuar.",pending:"Su cuenta aún no cuenta con aprobación administrativa.",failure:"No se pudo comprobar el acceso. Revise las reglas de Firebase e inténtelo otra vez.",welcome:"Acceso autorizado",granted:"Su cuenta fue aprobada. Hay una actividad adicional disponible.",activity:"Entrenamiento avanzado · Evaluación de evidencia",description:"Ejercicio con datos de demostración. No se cargan datos restringidos del Observatorio.",begin:"Comenzar",answer:"Confirmar",redo:"Repetir",correct:"Correcto. Distinga hechos documentados de alegaciones.",incorrect:"La evidencia no respalda esta conclusión.",complete:"Entrenamiento concluido. El progreso solo se guarda en este navegador.",note:"La aprobación se verifica en Firestore. El progreso se conserva solo en este navegador.",step:"Etapa"}
};
const exercises={
 pt:[
  {q:"Um boletim oficial documenta 18 aves apreendidas; uma postagem sem fontes afirma que foram 31. Qual registro é adequado?",a:["31 confirmadas","18 documentadas; 31 é alegação não verificada","24 como média"],ok:1},
  {q:"A fonte menciona um destino suposto, sem bilhete ou documento de transporte. O que fazer?",a:["Registrar rota confirmada","Eliminar a ocorrência","Marcar o destino como hipótese e buscar confirmação"],ok:2},
  {q:"Uma notícia possui data de publicação, mas não informa a data da ocorrência. O que registrar?",a:["Separar publicação e data de ocorrência desconhecida","Usar publicação como ocorrência","Estimar uma data qualquer"],ok:0}
 ],
 en:[
  {q:"An official bulletin records 18 seized birds; an unsourced post claims 31. What should be recorded?",a:["31 confirmed","18 documented; 31 remains an unverified claim","Average them to 24"],ok:1},
  {q:"A source alleges a destination without tickets or transport records. What should an analyst do?",a:["Mark a confirmed route","Discard the event","Treat the destination as a lead needing corroboration"],ok:2},
  {q:"A news item has a publication date but no event date. What should be recorded?",a:["Keep publication and unknown event date separate","Use publication as event date","Estimate a date"],ok:0}
 ],
 es:[
  {q:"Un comunicado oficial registra 18 aves incautadas; una publicación sin fuente afirma 31. ¿Qué anotar?",a:["31 confirmadas","18 documentadas; 31 sigue sin verificar","El promedio de 24"],ok:1},
  {q:"Una fuente indica un supuesto destino sin documentos de transporte. ¿Qué hacer?",a:["Registrar ruta confirmada","Eliminar el evento","Tratar el destino como hipótesis pendiente de corroboración"],ok:2},
  {q:"Una noticia tiene fecha de publicación, pero no indica la fecha del hecho. ¿Cómo registrarlo?",a:["Separar publicación y fecha del hecho desconocida","Usar publicación como fecha del hecho","Estimar una fecha"],ok:0}
 ]
};
let locale="pt",app=null,auth=null,db=null,account=null,authorized=false,busy=false,seq=0,step=0,finished=false;
const t=()=>phrases[locale];const text=(id,value)=>{if($(id))$(id).textContent=value};
const show=(id,yes)=>{if($(id))$(id).classList.toggle("hidden",!yes)};
const state=(name)=>{for(const v of ["Login","Waiting","Approved","Training"])show("restricted"+v,name===v)};
function localize(l){
 locale=phrases[l]?l:"pt";
 for(const [id,key]of Object.entries({restrictedHeading:"title",restrictedIntro:"intro",restrictedEmailLabel:"email",restrictedPasswordLabel:"password",restrictedLoginButton:"login",restrictedResetButton:"reset",restrictedLogout:"logout",restrictedRefresh:"refresh",restrictedResend:"resend",restrictedExerciseHeading:"activity",restrictedExerciseIntro:"description",restrictedExerciseSubmit:"answer",restrictedFinePrint:"note"}))text(id,t()[key]);
 if(authorized)renderApproved();
 else if(account)renderWaiting(account.emailVerified?"pending":"verify");
 else state("Login");
}
function status(message){text("restrictedStatus",message)}
function renderWaiting(reason){state("Waiting");text("restrictedWaitingTitle",t()[reason]);show("restrictedResend",reason==="verify");status("");}
function renderApproved(){
 state("Approved");text("restrictedApprovedTitle",t().welcome);text("restrictedApprovedDesc",t().granted);
 text("restrictedAccount",account?.email||"");
 const key="ayla-exercise-v1-"+account.uid;try{finished=localStorage.getItem(key)==="done"}catch(_){finished=false}
 text("restrictedStartExercise",finished?t().redo:t().begin);status("");
}
function loginScreen(){account=null;authorized=false;state("Login");status("");}
async function checkAccess(user){
 const check=++seq;account=user;authorized=false;
 if(!user){loginScreen();return}
 state("Waiting");status(t().loading);
 try{
  await reload(user);await user.getIdToken(true);
  if(check!==seq||auth.currentUser?.uid!==user.uid)return;
  if(!user.emailVerified){renderWaiting("verify");return}
  const access=await getDoc(doc(db,"access",user.uid));
  if(check!==seq||auth.currentUser?.uid!==user.uid)return;
  if(access.exists()&&access.data().approved===true){authorized=true;renderApproved()}
  else renderWaiting("pending");
 }catch(e){if(check===seq){console.warn("[AYLA] Approval check:",e.code||e.message);renderWaiting("failure")}}
}
async function initialize(){
 if(auth)return;
 try{
  app=initializeApp(cfg,"ayla-game");auth=getAuth(app);db=getFirestore(app);
  onAuthStateChanged(auth,checkAccess,()=>{state("Login");status(t().failure)});
 }catch(e){console.warn("[AYLA] Firebase:",e.code||e.message);state("Login");status(t().failure)}
}
function renderQuestion(){
 if(!authorized||!account)return;
 state("Training");text("restrictedExerciseHeading",t().activity);text("restrictedExerciseIntro",t().description);
 const list=$("restrictedExerciseOptions");list.replaceChildren();
 const q=exercises[locale][step];text("restrictedStep",t().step+" "+(step+1)+" / 3");
 text("restrictedQuestion",q.q);
 for(let i=0;i<q.a.length;i++){
  const label=document.createElement("label");label.className="restricted-option";
  const input=document.createElement("input");input.type="radio";input.name="restrictedChoice";input.value=String(i);
  const span=document.createElement("span");span.textContent=q.a[i];
  label.append(input,span);list.append(label);
 }
 text("restrictedAnswerFeedback","");
}
function begin(){if(!authorized||!account)return;step=0;finished=false;renderQuestion()}
function submit(){
 if(!authorized||!account)return;
 const selected=document.querySelector('input[name="restrictedChoice"]:checked');if(!selected)return;
 if(Number(selected.value)!==exercises[locale][step].ok){text("restrictedAnswerFeedback",t().incorrect);return}
 step++;
 if(step<exercises[locale].length){renderQuestion();return}
 try{localStorage.setItem("ayla-exercise-v1-"+account.uid,"done")}catch(_){}
 finished=true;renderApproved();text("restrictedStatus",t().complete);
}
window.AYLARestricted={open(l){localize(l);if(!auth){state("Waiting");status(t().loading);initialize()}else if(auth.currentUser)checkAccess(auth.currentUser);else loginScreen()},close(){seq++},setLanguage(l){localize(l)}};
$("restrictedAuthForm")?.addEventListener("submit",async e=>{
 e.preventDefault();if(!auth||busy)return;
 busy=true;$("restrictedLoginButton").disabled=true;
 status(t().loading);
 try{await signInWithEmailAndPassword(auth,$("restrictedEmail").value.trim(),$("restrictedPassword").value);$("restrictedPassword").value=""}
 catch(err){console.warn("[AYLA] Sign-in:",err.code);status(t().invalid)}
 finally{busy=false;$("restrictedLoginButton").disabled=false}
});
$("restrictedResetButton")?.addEventListener("click",async()=>{
 if(!auth)return;
 const email=$("restrictedEmail");
 if(!email.checkValidity()){email.reportValidity();return}
 try{await sendPasswordResetEmail(auth,email.value.trim())}catch(e){console.warn("[AYLA] Reset:",e.code)}
 status(t().resetSent)
});
$("restrictedLogout")?.addEventListener("click",async()=>{if(!auth)return;seq++;await signOut(auth);loginScreen()});
$("restrictedRefresh")?.addEventListener("click",()=>auth?.currentUser&&checkAccess(auth.currentUser));
$("restrictedResend")?.addEventListener("click",async()=>{
 if(!auth?.currentUser)return;
 try{await sendEmailVerification(auth.currentUser);status(t().verify)}catch(e){status(t().failure)}
});
$("restrictedStartExercise")?.addEventListener("click",begin);
$("restrictedExerciseSubmit")?.addEventListener("click",submit);
localize("pt");
