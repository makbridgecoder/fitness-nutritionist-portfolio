
const ageInput = document.getElementById("metric__age");
const heightInput = document.getElementById("metric__height");
const weightInput = document.getElementById("metric__weight");
const activityLevelDropdown = document.getElementById("activity_lvl");
const calculateForm = document.getElementById("calc_form");
const genderAlertContainer = document.getElementById("gender_alert_cnt");
const ageAlertContainer = document.getElementById("age_alert_cnt");
const heightAlertContainer = document.getElementById("height_alert_cnt");
const weightAlertContainer = document.getElementById("weight_alert_cnt");
const activityAlertContainer = document.getElementById("activity_alert_cnt");
const messageContainer = document.getElementById("message_cnt");


const ageRange = { min: 18,  max: 100, alertLokalization: ageAlertContainer};

const heightRange = { min: 60, max: 250, alertLokalization: heightAlertContainer};

const weightRange = { min: 20, max: 250, alertLokalization: weightAlertContainer};



   
   
function isValid(range, inputType) {
  
  inputType.addEventListener("input", () => {
    if (inputType.value === "") {
      range.alertLokalization.innerHTML = "";
      return;
    }
    else if (inputType.value < range.min || inputType.value > range.max) {
      range.alertLokalization.innerHTML = 
      `<span>Wybierz pomiędzy ${range.min} i ${range.max}</span>
      `;
    } else {
      range.alertLokalization.innerHTML = "";
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
  messageContainer.innerHTML = `
  
  <span>Twoje TDEE: ${tdee}</span>
  `
  
};
    

calculateForm.addEventListener("submit", (e) => {
      e.preventDefault();
      messageContainer.innerHTML = "";
  
  const selectedGender = document.querySelector('input[name="gender"]:checked');
      
  if (!selectedGender) {
    genderAlertContainer.innerHTML = "Wybierz płeć";
    return;
  } else genderAlertContainer.innerHTML = "";
  
  if (ageInput.value === "") {
    ageAlertContainer.innerHTML = "Podaj wiek";
    return;
  } else ageAlertContainer.innerHTML = "";
  
  if (heightInput.value === "") {
    heightAlertContainer.innerHTML = "Podaj wzrost";
    return;
  } else heightAlertContainer.innerHTML = "";
  
  if (weightInput.value === "") {
    weightAlertContainer.innerHTML = "Podaj wagę";
    return;
  } else weightAlertContainer.innerHTML = "";
  
  const activity = Number(activityLevelDropdown.value);
  
  if (activity ===  0) {
    activityAlertContainer.innerHTML = "Wybierz poziom aktywności";
    return;
    } else  {
      activityAlertContainer.innerHTML = "";
    }
  
    
  
  const gender = Number(selectedGender.value);
  const age = Number(ageInput.value);
  const weight = Number(weightInput.value);
  const height = Number(heightInput.value);

  const extraCalories = getExtraCalories(gender);
  const bmr = calculateBmr(weight, height, age, extraCalories);
  const tdee = calculateTdee(bmr, activity);
   
 printScore(tdee);


});





