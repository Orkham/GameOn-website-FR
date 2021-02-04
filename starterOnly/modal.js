// navigation responsive
function editNav() {
  var responsiveDisplay = document.getElementById("myTopnav");
  if (responsiveDisplay.className === "topnav") {
    responsiveDisplay.className += " responsive";
  } else {
    responsiveDisplay.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalSuccess = document.querySelector(".modalSuccess");
const modalBtn = document.querySelectorAll(".modal-btn");
//const formData = document.querySelectorAll(".formData");
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
/*const location1 = document.getElementById("location1");
const location2 = document.getElementById("location2");
const location3 = document.getElementById("location3");
const location4 = document.getElementById("location4");
const location5 = document.getElementById("location5");
const location6 = document.getElementById("location6");*/
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

console.log(document.forms.reserve);
// responsive nav
navBtn.addEventListener("click",editNav);

function validate(e){
  e.preventDefault();
  checkForm();
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


// vérification des données

// vérification si prénom au moins deux lettres et composé de lettres uniquement
function checkFirst(data){
  if((data.length > 1)&&(isLetterOnly(data))==0){
    //console.log("first:ok");
    document.getElementById("missingFirstName").style.display = "none";
    firstNameValidate = true;
  }else{
    //console.log("first:error");
    document.getElementById("missingFirstName").style.display = "block";
    firstNameValidate = false;
  }
}

// vérification si nom au moins deux lettres et composé de lettres uniquement
function checkLast(data){
  if((data.length > 1)&&(isLetterOnly(data))==0){
    //console.log("last:ok");
    document.getElementById("missingLastName").style.display = "none";
    lastNameValidate = true;
  }else{
    //console.log("last:error");
    document.getElementById("missingLastName").style.display = "block";
    lastNameValidate = false;
  }
}


/*** VERIFICATION VALIDITE ADRESSE MAIL REGEX ***/
function validateEmail(email){      
  let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  //console.log(emailPattern.test(email));
  return emailPattern.test(email); 
} 
/*** ***/

function checkEmail(email){
  if(validateEmail(email)){
    //console.log("mail:ok");
    document.getElementById("missingMail").style.display = "none";
    emailValidate = true;
  }else{
    //console.log("mail:error");
    document.getElementById("missingMail").style.display = "block";
    emailValidate = false;
  }
}

/*** VERIFICATION VALIDITE DATE ***/
//vérification si la date est bien rentrée
function validateDate(date){
  let datePattern = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
  //console.log(datePattern.test(date));
  //console.log(date);
  return datePattern.test(date);
}
/*** ***/

function isBirthDate(birthdate){
  //vérification si date valide et antérieur à aujourd'hui
  let today = new Date();
  let birthdateObj = new Date(birthdate);
  console.log(birthdateObj.getFullYear());
  //console.log(today.getFullYear());
  if((validateDate(birthdate)) && (birthdateObj <= today) && birthdateObj.getFullYear()>1900){
    //console.log("birthdate:ok");
    document.getElementById("missingBirthdate").style.display = "none";
    birthdateValidate = true;
  }else{
    //console.log("birthdate:error");
    document.getElementById("missingBirthdate").style.display = "block";
    birthdateValidate = false;
  }
}

function checkTournamentNumber(data){
  //vérification si le nombre de tournois est un nombre positif ou nul (.trim pour annuler espaces)
  
  if(Number.isInteger(data.valueAsNumber) && data.valueAsNumber>=0 && data.valueAsNumber<100 && data.valueAsNumber.trim()!=""){
    console.log(Number.isInteger(data));
    
    document.getElementById("missingTournamentQuantity").style.display = "none";
    tournamentNumberValidate = true;
  }else{
    //console.log("tournament:error");
    document.getElementById("missingTournamentQuantity").style.display = "block";
    tournamentNumberValidate = false;
  }
}

function isCityBtnSelected(){
  //vérification une seule ville de sélectionnée
  
  if (!hiddenRadio.checked){
    //console.log("ok");
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
    //console.log("check-condition:ok");
    document.getElementById("missingValidation").style.display = "none";
    isConditionCheckedValidate = true;
  }else{
    //console.log("check-condition:error");
    document.getElementById("missingValidation").style.display = "block";
    isConditionCheckedValidate = false;
  }
}

//apparition de la fenêtre de succès de validation
function validateMessageDisplay(){
    close();
    modalSuccess.style.display = "flex";
}



//fonction pour vérifier si un string est composé que de lettres, tirets ou apostrophes

function isLetterOnly(str){
  let re = new RegExp("^[a-zàéèêâôîûçäëïöüù'-]+$");
  let firstNameArray = str.toLowerCase().split("");
  let verifLetter = 0;
  for(let i = 0; i < firstNameArray.length; i++){
    if(!re.test(firstNameArray[i])){
      verifLetter++;
    }
  }
  return verifLetter;
}



/*** FONCTION ENVOI DU FORMULAIRE ***/

function sendData() {
  let XHR = new XMLHttpRequest();
  let form = document.getElementById("form");
  let FD  = new FormData(form);
  
  // Définissez ce qui se passe si la soumission s'est opérée avec succès
  XHR.addEventListener('load', function(event) {
    validateMessageDisplay();
  });

  // Definissez ce qui se passe en cas d'erreur
  XHR.addEventListener('error', function(event) {
    alert('Oups! Quelque chose s\'est mal passé.');
  });

  // Configurez la requête
  XHR.open('GET', 'index.html');

  // Expédiez l'objet FormData ; les en-têtes HTTP sont automatiquement définies
  XHR.send(FD); 
  
}  