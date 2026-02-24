const genderRadio = document.getElementById("gender_radio");
const genderFemale = document.getElementById("gender_female");
const genderMale = document.getElementById("gender_male");
const ageInput = document.getElementById("metric__age");
const heightInput = document.getElementById("metric__height");
const weightInput = document.getElementById("metric__weight");
const activityLevelDropdown = document.getElementById("activity_lvl");
const calculateBtn = document.getElementById("calculate_btn");
const calculateForm = document.getElementById("calc_form");
const genderResult = document.getElementById("gender_result");



function changeBackground() {
  ageInput.style.backgroundColor = "red";
}

let genderValue; 
function getGenderValue() {
  if (genderFemale.checked) {
   return genderValue = genderFemale.value;
    
  } else if (genderMale.checked) {
    return genderValue = genderMale.value;
  } else {
    //add alert
    console.log("no gender");
    return;
  }
}

let ageInputValue;
function getAgeInput() {
  return ageInputValue = ageInput.value;
  
}


let heightInputValue;
function getHeightValue() {
  return heightInputValue = heightInput.value;
}

let weightInputValue;
function getWeightValue() {
 return weightInputValue = weightInput.value;
}

let activitySelected;

function activitySelectedToNumber() {
  const activitySelectedNumber = Number(activitySelected);
  return activitySelectedNumber;
}

function getActivitySelected() {
  activitySelected = activityLevelDropdown.value;
  return activitySelectedToNumber();

  }


const printScore = function() {
  genderResult.innerHTML = `
  <span>Your Result: ${genderValue} </span><br>
  <span>your age: ${ageInputValue} </span><br>
  <span>Choosen activity rate: ${activitySelected}</span><br>
  <span>Your TDEE: ${calculateTdee()};</span>
  

  `
};

const extraCaloriesForWomen = -161;
const extraCaloriesForMen = 5;

let bmrRate;
function calculateBmr(gender) {
  
  if (gender == 1) {
    bmrRate = 10 * weightInputValue + 6.25 * heightInputValue - 5 * ageInputValue + extraCaloriesForMen;
    genderResult.style.backgroundColor = "red";
    console.log(bmrRate, "Male gender");
    return bmrRate; 
  } else if (gender == 2 ) {
    bmrRate = 10 * weightInputValue + 6.25 * heightInputValue - 5 * ageInputValue + extraCaloriesForWomen;
    console.log(bmrRate, "Female gender");
    return bmrRate;
  } else {
    genderResult.innerHTML = "Choose a gender";
    console.log("choose gen"); 
    return;
  }

}


function calculateTdee() {
  let Tdee = Math.floor(calculateBmr(getGenderValue()) * getActivitySelected());
  console.log(Tdee);
  return Tdee;
}


calculateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  getGenderValue();
  console.log(getGenderValue());

  getAgeInput();
  console.log(getAgeInput());

  getHeightValue();
  console.log(getHeightValue());

  getWeightValue();
  console.log(getWeightValue());

  getActivitySelected();

  calculateBmr(getGenderValue());

  calculateTdee();
 // console.log(calculateTdee());
  
  printScore();
  changeBackground();
  
  
})





