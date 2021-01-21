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
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.getElementById("closeBtn");
// FORM Elements
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const tournamentNumber = document.getElementById("quantity");
const submitBtn = document.getElementById("submit-btn");
const location1 = document.getElementById("location1");
const location2 = document.getElementById("location2");
const location3 = document.getElementById("location3");
const location4 = document.getElementById("location4");
const location5 = document.getElementById("location5");
const location6 = document.getElementById("location6");
const checkboxCondition = document.getElementById("checkbox1");
// VALIDITY CHECKER
let validityResult = true;


// submit form
function validate(e){
  e.preventDefault();
  checkFirst(firstName.value);
  checkLast(lastName.value);
  checkEmail(email.value);
  isBirthDate(birthdate.value);
  checkTournamentNumber(quantity.value);
  isCityBtnSelected();
  isConditionChecked(checkboxCondition);
  console.log("formulaire envoyé");
  //validateMessageDisplay(validityResult);
  
}
submitBtn.addEventListener("click",validate);
  
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

// vérification des données

function checkFirst(data){
  if(data.length > 1){
    //console.log("first:ok");
    document.getElementById("missingFirstName").style.display = "none";
    validityResult = true;
  }else{
    //console.log("first:error");
    document.getElementById("missingFirstName").style.display = "block";
    validityResult = false;
  }
}

function checkLast(data){
  if(data.length > 1){
    //console.log("last:ok");
    document.getElementById("missingLastName").style.display = "none";
    validityResult = true;
  }else{
    //console.log("last:error");
    document.getElementById("missingLastName").style.display = "block";
    validityResult = false;
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
    validityResult = true;
  }else{
    //console.log("mail:error");
    document.getElementById("missingMail").style.display = "block";
    validityResult = false;
  }
}

/*** VERIFICATION VALIDITE DATE ***/
function validateDate(date){
  let datePattern = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
  //console.log(datePattern.test(date));
  return datePattern.test(date);
}
/*** ***/

function isBirthDate(birthdate){
  if(validateDate(birthdate)){
    //console.log("birthdate:ok");
    document.getElementById("missingBirthdate").style.display = "none";
    validityResult = true;
  }else{
    //console.log("birthdate:error");
    document.getElementById("missingBirthdate").style.display = "block";
    validityResult = false;
  }
}

function checkTournamentNumber(data){
  if(!isNaN(data) && data>=0){
    //console.log("tournament:ok");
    document.getElementById("missingTournamentQuantity").style.display = "none";
    validityResult = true;
  }else{
    //console.log("tournament:error");
    document.getElementById("missingTournamentQuantity").style.display = "block";
    validityResult = false;
  }
}

function isCityBtnSelected(){
 if((location1.checked == true ||
  location2.checked == true ||
  location3.checked == true ||
  location4.checked == true ||
  location5.checked == true ||
  location6.checked == true
  )&& (quantity.value > 0)){
    console.log("city:ok");
    document.getElementById("missingCity").style.display = "none";
    validityResult = true;
  }else if((quantity.value == 0)&&(location1.checked == false &&
    location2.checked == false &&
    location3.checked == false &&
    location4.checked == false &&
    location5.checked == false &&
    location6.checked == false
    )){
    console.log("0 city:ok");
    document.getElementById("missingCity").style.display = "none";
    validityResult = true;
  }else{
    console.log("no-check");
    document.getElementById("missingCity").style.display = "block";
    validityResult = false;
  }
}

function isConditionChecked(data){
  if(data.checked == true){
    //console.log("check-condition:ok");
    document.getElementById("missingValidation").style.display = "none";
    validityResult = true;
  }else{
    //console.log("check-condition:error");
    document.getElementById("missingValidation").style.display = "block";
    validityResult = false;
  }
}

function validateMessageDisplay(result){
  if(result){
    window.alert("Votre message a bien été transféré. Merci à vous.");
    close();
  }
}
