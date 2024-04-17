"use strict";

const renderTable = function (petArr) {
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].bmi == undefined) petArr[i].bmi = "?";
  }
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    let vacCheck = document.getElementsByClassName("tableVac").className;
    let dewCheck = document.getElementsByClassName("tableVac").className;
    let sterCheck = document.getElementsByClassName("tableVac").className;
    if (petArr[i].vaccinated == true) {
      vacCheck = "bi bi-check-circle-fill tableVac check";
    } else {
      vacCheck = "bi bi-x-circle-fill tableVac check";
    }

    if (petArr[i].dewormedInput == true) {
      dewCheck = "bi bi-check-circle-fill tableVac check";
    } else {
      dewCheck = "bi bi-x-circle-fill tableVac check";
    }

    if (petArr[i].sterilizedInput == true) {
      sterCheck = "bi bi-check-circle-fill tableVac check";
    } else {
      sterCheck = "bi bi-x-circle-fill tableVac check";
    }
    row.innerHTML = `<td>${petArr[i].id}</td> 
    <td>${petArr[i].name}</td> 
    <td>${petArr[i].age}</td> 
    <td>${petArr[i].type}</td>  
    <td>${petArr[i].weight}</td> 
    <td>${petArr[i].length1}</td> 
    <td>${petArr[i].breed}</td> <td>
    <i class="bi bi-square-fill tableColor" style="color:${petArr[i].color};"></i>

    <td><i class="${vacCheck}"></i></td>
    <td><i class="${dewCheck}"></i></td>
    <td><i class="${sterCheck}"></i></td>
    <td id="bmiCheck">${petArr[i].bmi}</td>
    <td>${petArr[i].date}</td> 
    <td class="tableDelete">
    <button type="button" class="btn btn-danger" id="delete-btn-${petArr[i].id}" onclick="deletePetData('${petArr[i].id}')">
    Delete
    </button>
  </td>`;

    tableBodyEl.appendChild(row);
  }
};
// ------------- Taking neccesary DOM elements------------------------------
const submitBtn = document.getElementById("submit-btn");
let deleteBtn;
const healthyBtn = document.getElementById("healthy-btn");
const bmiBtn = document.getElementById("bmi-btn");

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const breedOptionInput = document.getElementById("input-breed");

let i = 0;
let data = {};
const idArray = [];
let petArr = getFromStorage() || [];
let jsonArr = getJsonFromStorage() || [];
console.log(jsonArr);
const checkDuplicate = function () {
  for (i = 0; i < petArr.length; i++) {
    for (let j = i + 1; j < petArr.length; j++) {
      if (petArr[i].id == petArr[j].id) {
        petArr.splice(i, 1);
        console.log(petArr);
        saveToStorage(petArr);
      }
    }
  }
};

if (jsonArr.length > 0) {
  petArr = petArr.concat(jsonArr);
  console.log(petArr);
  console.log(jsonArr);
  checkDuplicate();
}

let breedArr = getBreedFromStorage();
let dogTypeArr = [];
let catTypeArr = [];
let petId;
let healthyPetArr = [];
let count = 0;
let countBmi = 0;
let healthyPetVacArr = [];
let healthyPetDewArr = [];
let healthyPetSteArr = [];
let healthyCheck = false;
const tableBodyEl = document.getElementById("tbody");
tableBodyEl.innerHTML = "";
console.log(petArr);
if (petArr.length > 0) {
  checkDuplicate();
  renderTable(petArr);
}
let bmi;

// --------------------- SUBMIT ACTION----------------------------------------

submitBtn.addEventListener("click", function () {
  // countBmi=0;
  bmi = "?";
  data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length1: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormedInput: dewormedInput.checked,
    sterilizedInput: sterilizedInput.checked,
    date: new Date(),
  };

  validate();
  // clearInput();
});

//----------------------- VALIDATE DATA -------------------------------

// --- check ID --
const validate = function validateData() {
  if (idArray.includes(data.id)) {
    window.alert("ID must be unique!");
    return;
  } else if (data.id == "") {
    window.alert("Please input Pet ID!");
    return;
  } else if (!idArray.includes(data.id) && data.id !== "") {
    // --- check name --

    if (data.name === "") {
      window.alert("Please input Pet name!");
      return;
    }
    // --- check Age --
    else if (data.age < 1 || data.age > 15) {
      window.alert("Age must be between 1 and 15!");
      return;
    } else if (isNaN(data.age)) {
      window.alert("Please input Pet age!");
      return;
    }
    // --- check Type ---
    else if (data.type == "Select Type") {
      window.alert("Please select Type!");
      return;
    }

    // --- check Weight ---
    else if (data.weight < 1 || data.weight > 15) {
      window.alert("Weight must be between 1 and 15!");
      return;
    } else if (isNaN(data.weight)) {
      window.alert("Please input Pet weight!");
      return;
    }

    // --- check Length ---
    else if (data.length1 < 1 || data.length1 > 100) {
      window.alert("Weight must be between 1 and 100!");
      return;
    } else if (isNaN(data.length1)) {
      window.alert("Please input Pet length!");
      return;
    }

    // --- check Breed ---
    // else if (data.breed == "Select Breed") {
    //   window.alert("Please select Breed!");
    //   return;
    // }
    else idArray.push(data.id);
  }

  console.log(data);
  petArr.push(data);

  saveToStorage(petArr);
  renderTable(petArr);
  clearInput();

  // getFromStorage();
  console.log(petArr);
};

//----------------------- RENDERING DATA -------------------------------

//----------------------- CLEAR DATA -------------------------------

const clearInput = function clearTableData() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

//----------------------- DELETE DATA -------------------------------

const deletePetData = function (id) {
  console.log(id);
  // Confirm before deletePet
  if (confirm("Are you sure?")) {
    tableBodyEl.innerHTML = "";
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].id == id) {
        petArr.splice(i, 1);
        // jsonArr.splice(i, 1);
        // saveJsonToStorage(json);
        jsonArr = petArr;
        saveJsonToStorage(jsonArr);
        saveToStorage(petArr);
        console.log(petArr);
        console.log(jsonArr);
      }
    }

    renderTable(petArr);
  }
};

//----------------------- CHECK HEALTHY PET -------------------------------
healthyBtn.addEventListener("click", function () {
  let healthyPetArr = [];
  if (healthyBtn.textContent == "Show Healthy Pet") {
    healthyBtn.textContent = "Show All Pet";
    healthyCheck = true;

    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].vaccinated == true) count += 1;
      if (count == 1) {
        if (petArr[i].dewormedInput == true) count += 1;
      }
      if (count == 2) {
        if (petArr[i].sterilizedInput == true) count += 1;
      }

      if (count == 3) {
        healthyPetArr.push(petArr[i]);

        console.log(count);
      }
      count = 0;
      console.log(count);
    }
    console.log(healthyPetArr);
    console.log(petArr);
    renderTable(healthyPetArr);
  } else {
    healthyBtn.textContent = "Show Healthy Pet";
    healthyCheck = false;

    renderTable(petArr);
  }
});

//----------------------- Calculate BMI -------------------------------

const calcBmi = function (petArr) {
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].type == "Dog") {
      bmi = ((petArr[i].weight * 703) / petArr[i].length1 ** 2).toFixed(2);
    } else if (petArr[i].type == "Cat") {
      bmi = ((petArr[i].weight * 886) / petArr[i].length1 ** 2).toFixed(2);
    } else if (petArr[i].type == "Select Type") {
      bmi = "?";
    }

    if (countBmi !== 0 && countBmi % 2 !== 0) {
      petArr[i].bmi = bmi;
    } else
      for (let i = 0; i < petArr.length; i++) {
        petArr[i].bmi = "?";
      }
  }
};

bmiBtn.addEventListener("click", function () {
  countBmi++;

  calcBmi(petArr);
  renderTable(petArr);
});

// ==================== ASM2 ===============================================

const showNavBar = document.getElementById("sidebar-title");

// let petArr = JSON.parse(getFromStorage("petArr")) ?? [];

showNavBar.addEventListener("click", function () {
  var sideBar = document.getElementById("sidebar");
  sideBar.classList.toggle("active");
});

// ==================== visualize Breed =========================================

const renderBreed = function () {
  breedOptionInput.innerHTML = `<option id="input-selectBreed">Select Breed</option>`;

  if (typeInput.value == "Dog") {
    dogTypeArr = breedArr.filter(function (dogType) {
      return dogType.type == "Dog";
    });
    console.log(dogTypeArr);
    createDogOption();
  } else if (typeInput.value == "Cat") {
    catTypeArr = breedArr.filter(function (catType) {
      return catType.type == "Cat";
    });
    console.log(catTypeArr);
    createCatOption();
  }
};

typeInput.addEventListener("change", renderBreed());

const createDogOption = function () {
  for (i = 0; i < dogTypeArr.length; i++) {
    // console.log(dogTypeArr);
    const option = document.createElement("option");
    option.innerHTML = `<option>${dogTypeArr[i].breed}</option>`;
    console.log(dogTypeArr[i].breed);
    breedOptionInput.appendChild(option);
    console.log(option);
  }
};

const createCatOption = function () {
  for (i = 0; i < catTypeArr.length; i++) {
    // console.log(dogTypeArr);
    const option = document.createElement("option");
    option.innerHTML = `<option>${catTypeArr[i].breed}</option>`;
    console.log(catTypeArr[i].breed);
    breedOptionInput.appendChild(option);
  }
};
