
const ageInput = document.getElementById("metric__age");
const heightInput = document.getElementById("metric__height");
const weightInput = document.getElementById("metric__weight");
const activityLevelDropdown = document.getElementById("activity_lvl");
const calculateForm = document.getElementById("calc_form");
const messegeContainer = document.getElementById("messege_cnt");


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
  const weight = Number(weightInput.value);
  const height = Number(heightInput.value);
  const age = Number(ageInput.value);
  const activity = Number(activityLevelDropdown.value);

  const extraCalories = getExtraCalories(gender);
  const bmr = calculateBmr(weight, height, age, extraCalories);
  const tdee = calculateTdee(bmr, activity);

  printScore(tdee);

});





