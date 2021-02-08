/****************************/
/*        DECLARATIONS      */
/****************************/

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalSuccess = document.querySelector(".modalSuccess");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.getElementById("closeBtn");
const navBtn = document.getElementById("navButton");

// FORM Elements
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const tournamentNumber = document.getElementById("quantity");
const submitBtn = document.getElementById("submit-btn");
const hiddenRadio = document.getElementById("hiddenRadio");
const checkboxCondition = document.getElementById("checkbox1");
const endButton = document.getElementById("end-btn");
const form = document.getElementById("form");

// CHECK VALIDATION ELEMENTS
let firstNameValidate;
let lastNameValidate;
let emailValidate;
let birthdateValidate;
let tournamentNumberValidate;
let isCitySelectedValidate;
let isConditionCheckedValidate;


/****************************/
/*   RESPONSIVE NAVIGATION  */
/****************************/

//Affichage du menu de navigation en fonction du display utilisateur
function editNav() {
  let responsiveDisplay = document.getElementById("myTopnav");
  if (responsiveDisplay.className === "topnav") {
    responsiveDisplay.className += " responsive";
  } else {
    responsiveDisplay.className = "topnav";
  }
}

navBtn.addEventListener("click",editNav);

/****************************************/
/*   VALIDATION ET ENVOI DU FORMULAIRE  */
/****************************************/

function validate(e){
  //ne pas envoyer le formulaire avant qu'il ne soit validé
  e.preventDefault();
  //vérification des champs
  checkForm();
  //validation des tests, envoi et reset du formulaire
  if( firstNameValidate == true &&
    lastNameValidate == true &&
    emailValidate == true &&
    birthdateValidate == true &&
    tournamentNumberValidate == true &&
    isCitySelectedValidate == true &&
    isConditionCheckedValidate == true){
      sendData();
      form.reset();
  }else{
    //ne pas envoyer le formulaire si erreur
    e.preventDefault();
  };
  
}
//écouteur bouton soumission formulaire
submitBtn.addEventListener("click",validate);

// check validation form
function checkForm(){
  checkFirst(firstName.value);
  checkLast(lastName.value);
  checkEmail(email.value);
  isBirthDate(birthdate.value);
  checkTournamentNumber(tournamentNumber);
  isCityBtnSelected();
  isConditionChecked(checkboxCondition);
}

/****************************************/
/* GESTION OUVERTURE ET FERMETURE MODAL */
/****************************************/

// fermeture modal
function close(){
  modalbg.style.display = "none";
}
closeBtn.addEventListener("click",close);

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// fermeture fenêtre validation formulaire
function closeSuccess(){
  modalSuccess.style.display ="none";
}
endButton.addEventListener("click",closeSuccess);

//apparition de la fenêtre de succès de validation
function validateMessageDisplay(){
  close();
  modalSuccess.style.display = "flex";
}

/****************************************/
/* VERIFICATION DES DONNEES RENSEIGNEES */
/****************************************/

//fonction pour vérifier si un string est composé que de lettres, tirets ou apostrophes
function isLetterOnly(str){
  let re = new RegExp("^[a-zàéèêâôîûçäëïöüù'-]+$");
  //découpage du string en tableau de lettre pour pouvoir le parcourir
  let firstNameArray = str.toLowerCase().split("");
  //variable devant resté à zéro pour valider la fonction
  let verifLetter = 0;
  for(let i = 0; i < firstNameArray.length; i++){
    //pour chaque caractère ne passant pas le test regex on incrémente
    if(!re.test(firstNameArray[i])){
      verifLetter++;
    }
  }
  //on retourne la valeur qui servira à tester
  return verifLetter;
}

// vérification si prénom au moins deux lettres et composé de lettres uniquement
function checkFirst(data){
  if((data.length > 1)&&(isLetterOnly(data))==0){
    document.getElementById("missingFirstName").style.display = "none";
    firstNameValidate = true;
  }else{
    document.getElementById("missingFirstName").style.display = "block";
    firstNameValidate = false;
  }
}

// vérification si nom au moins deux lettres et composé de lettres uniquement
function checkLast(data){
  if((data.length > 1)&&(isLetterOnly(data))==0){
    document.getElementById("missingLastName").style.display = "none";
    lastNameValidate = true;
  }else{
    document.getElementById("missingLastName").style.display = "block";
    lastNameValidate = false;
  }
}


/*** VERIFICATION VALIDITE ADRESSE MAIL REGEX ***/
function validateEmail(email){      
  let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email); 
} 

function checkEmail(email){
  if(validateEmail(email)){
    document.getElementById("missingMail").style.display = "none";
    emailValidate = true;
  }else{
    document.getElementById("missingMail").style.display = "block";
    emailValidate = false;
  }
}

/*** VERIFICATION VALIDITE DATE ***/
//vérification si la date est bien rentrée
function validateDate(date){
  let datePattern = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
  return datePattern.test(date);
}

function isBirthDate(birthdate){
  //vérification si date valide et antérieure à aujourd'hui
  let today = new Date();
  let birthdateObj = new Date(birthdate);

  if((validateDate(birthdate)) && (birthdateObj <= today) && birthdateObj.getFullYear()>1900){
    document.getElementById("missingBirthdate").style.display = "none";
    birthdateValidate = true;
  }else{
    document.getElementById("missingBirthdate").style.display = "block";
    birthdateValidate = false;
  }
}

//vérification si le nombre de tournois est un nombre positif ou nul
function checkTournamentNumber(data){
  if(Number.isInteger(data.valueAsNumber) && data.valueAsNumber>=0 && data.valueAsNumber<100){
    document.getElementById("missingTournamentQuantity").style.display = "none";
    tournamentNumberValidate = true;
  }else{
    document.getElementById("missingTournamentQuantity").style.display = "block";
    tournamentNumberValidate = false;
  }
}

//vérification ville sélectionnée
function isCityBtnSelected(){
  if (!hiddenRadio.checked){
    document.getElementById("missingCity").style.display = "none";
    isCitySelectedValidate = true;
  }else{
    document.getElementById("missingCity").style.display = "block";
    isCitySelectedValidate = false;
  }
}

//vérification des conditions d'utilisation
function isConditionChecked(data){
  if(data.checked == true){
    document.getElementById("missingValidation").style.display = "none";
    isConditionCheckedValidate = true;
  }else{
    document.getElementById("missingValidation").style.display = "block";
    isConditionCheckedValidate = false;
  }
}


/************************************/
/*   FONCTION ENVOI DU FORMULAIRE   */
/************************************/

function sendData() {
  let XHR = new XMLHttpRequest();
  let form = document.getElementById("form");
  let FD  = new FormData(form);
  
  // succès
  XHR.addEventListener('load', function(event) {
    validateMessageDisplay();
  });

  // erreur
  XHR.addEventListener('error', function(event) {
    alert('Oups! Quelque chose s\'est mal passé.');
  });

  // requête
  XHR.open('GET', 'index.html');

  // Envoi
  XHR.send(FD); 
  
}  