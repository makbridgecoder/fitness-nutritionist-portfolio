
const ageInput = document.getElementById("metric__age");
const heightInput = document.getElementById("metric__height");
const weightInput = document.getElementById("metric__weight");
const activityLevelDropdown = document.getElementById("activity_lvl");
const calculateForm = document.getElementById("calc_form");
const ageAlertContainer = document.getElementById("age_alert_cnt");
const heightAlertContainer = document.getElementById("height_alert_cnt");
const weightAlertContainer = document.getElementById("weight_alert_cnt");
const messegeContainer = document.getElementById("messege_cnt");


const ageRange = { min: 18,  max: 100, alertLokalization: ageAlertContainer};

const heightRange = { min: 60, max: 250, alertLokalization: heightAlertContainer};

const weightRange = { min: 20, max: 250, alertLokalization: weightAlertContainer};



function isValid(range, inputType) {
  
  inputType.addEventListener("input", () => {
    if (inputType.value === "") {
      console.log("empty");
      range.alertLokalization.innerHTML = "";
    }
    else if (inputType.value < range.min || inputType.value > range.max) {
      range.alertLokalization.innerHTML = 
      `<span>Choose value between ${range.min} and ${range.max}</span>
      `;
    } else {
      //maybe check marK?
      range.alertLokalization.innerHTML = "";
      console.log("ok")
    }
  })

}

isValid(ageRange, ageInput);
isValid(heightRange, heightInput);
isValid(weightRange, weightInput);


function getExtraCalories(gender) {
  return gender === 1 ? -161 : 5;
}

function calculateBmr(weight, height, age, extraCalories ) {
  
  return 10 * weight + 6.25 * height - 5 * age + extraCalories;
  
}

function calculateTdee(bmr, activity) {
  return Math.floor(bmr * activity);
  
}

function printScore(tdee) {
  messegeContainer.innerHTML = `
  
  <span>Your TDEE: ${tdee}</span>
  `
  
};


calculateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const selectedGender = document.querySelector('input[name="gender"]:checked');

  if (!selectedGender) {
    messegeContainer.innerHTML = "Choose a gender";
    return;
  }
  
  const gender = Number(selectedGender.value);
  const age = Number(ageInput.value);
  const weight = Number(weightInput.value);
  const height = Number(heightInput.value);
  const activity = Number(activityLevelDropdown.value);
  

 const extraCalories = getExtraCalories(gender);
 const bmr = calculateBmr(weight, height, age, extraCalories);
 const tdee = calculateTdee(bmr, activity);
 
 printScore(tdee);

 //alert that input form cannot be empty

});





