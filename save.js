// VALIDITY CHECKER
class checkResults {
    constructor(
      firstNameValidate,
      lastNameValidate,
      emailValidate,
      birthdateValidate,
      tournamentNumberValidate,
      isCitySelectedValidate,
      isConditionCheckedValidate){
        this.firstNameValidate = firstNameValidate;
        this.lastNameValidate = lastNameValidate;
        this.emailValidate = emailValidate;
        this.birthdateValidate = birthdateValidate;
        this.tournamentNumberValidate = tournamentNumberValidate;
        this.isCitySelectedValidate = isCitySelectedValidate;
        this.isConditionCheckedValidate = isConditionCheckedValidate;
      }
  }
  let resultsForm = new checkResults();
  console.log(resultsForm);

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