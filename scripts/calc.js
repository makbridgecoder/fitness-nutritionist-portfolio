const genderRadio = document.getElementById("gender_radio");
const genderFemale = document.getElementById("gender_female");
const genderMale = document.getElementById("gender_male");
const ageInput = document.getElementById("metric__age");
const heightInput = document.getElementById("metric__height");
const weightInput = document.getElementById("metric__weight");
const activityLevelDropdown = document.getElementById("activity_lvl");
const calculateBtn = document.getElementById("calculate_btn");
const calculateForm = document.getElementById("calc_form");
const messegeContainer = document.getElementById("messege_cnt");



let genderValueFemale;
genderFemale.addEventListener("change", (e) => {

  genderValueFemale = Number(e.target.value);
  genderValueMale = "";
  getGender();
  
});

let genderValueMale;
genderMale.addEventListener("change", (e) => {
  
  genderValueMale = Number(e.target.value);
  genderValueFemale = "";
  getGender();

});



let genderValue;
function getGender() {

  if (genderValueFemale == 1) {
    return genderValue = Number(genderValueFemale);
  } else if (genderValueMale == 2) {
    return genderValue = Number(genderValueMale);
  } else {
    messegeContainer.innerHTML = "choose a gender";
    return genderValue = 0;
  }
}




let ageValue = 0;
ageInput.addEventListener("input", (e) => {
  ageValue = Number(e.target.value);
});

let heightValue = 0;
heightInput.addEventListener("input", (e) => {
  heightValue = Number(e.target.value);
});

let weightValue = 0;
weightInput.addEventListener("input", (e) => {
  weightValue = Number(e.target.value);
});

let activitySelected;
activityLevelDropdown.addEventListener("change", (e) => {
  activitySelected = Number(e.target.value);
});




const extraCaloriesForWomen = -161;
const extraCaloriesForMen = 5;



let bmrRate;
function calculateBmr(gender) {
  
  if (gender == 2) {
    bmrRate = 10 * weightValue + 6.25 * heightValue - 5 * ageValue + extraCaloriesForMen;
    console.log(bmrRate, "Male gender");
    return bmrRate; 
  } else if (gender == 1 ) {
    bmrRate = 10 * weightValue + 6.25 * heightValue - 5 * ageValue + extraCaloriesForWomen;
    console.log(bmrRate, "Female gender");
    return bmrRate;
  } else {
    messegeContainer.innerHTML = "Choose a gender";
    console.log("choose gen"); 
    return;
  }
  
}




function calculateTdee() {
  let Tdee = Math.floor(bmrRate * activitySelected);
  return Tdee;
}



const printScore = function() {
  messegeContainer.innerHTML = `

  <span>Your TDEE: ${calculateTdee()};</span>
  `
};



calculateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  calculateBmr(genderValue);
  const tdee = calculateTdee();
  printScore();

});





