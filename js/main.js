let bill = document.querySelector("#bill-input");
let peopleInput = document.getElementById("input-people");
const selectedTip = document.querySelector(".selected-tip");
const tipButtons = document.querySelectorAll(".tip");
const customTip = document.querySelector(".input-tip");
const tipPerPerson = document.querySelector(".tip-per-person .value p");
const totalAmount = document.querySelector(".total-person .value p");
const resetButton = document.querySelector(".reset");

bill.addEventListener("input", setBillValue);
selectedTip.addEventListener("click", handleClick);
customTip.addEventListener("input", setCustomTip);
peopleInput.addEventListener("input", setPeopleNumber);

let billValue = 0;
let tipValue = 0.15;
let peopleNumber;

function validateIninput(v) {
  var rgx = /^[0-9]*\.?[0-9]*$/;
  return v.match(rgx);
}

function setBillValue() {
  const errorBillMsg = document.querySelector(".error-bill-msg");

  if (!bill.value) {
    errorBillMsg.classList.remove("show");
    billValue = 0
  } else if (!validateIninput(bill.value)) {
    errorBillMsg.classList.add("show");
  } else {
    errorBillMsg.classList.remove("show");
    billValue = parseFloat(bill.value);
    
  }
  calculateResult();
}

function handleClick(e) {
  let tip = e.target;

  tipButtons.forEach((btn) => {
    btn.classList.remove("btn-active");
  });

  tip.classList.add("btn-active");

  tipValue = parseInt(tip.innerHTML) / 100;

  calculateResult();
}

function setCustomTip() {
  tipValue = parseFloat(customTip.value / 100);

  tipButtons.forEach((btn) => {
    btn.classList.remove("btn-active");
  });
  calculateResult();
}

function setPeopleNumber() {
  const errorPeopleMsg = document.querySelector(".error-people-msg");

  if (!validateIninput(peopleInput.value)) {
    errorPeopleMsg.textContent = "Enter only numbers";
    errorPeopleMsg.classList.add("show");
    peopleInput.classList.add("red-border");

  } else if (parseFloat(peopleInput.value) === 0) {
    errorPeopleMsg.textContent = "Can't be zero";
    errorPeopleMsg.classList.add("show");
    peopleInput.classList.add("red-border");
    
  } else {
    errorPeopleMsg.classList.remove("show");
    peopleInput.classList.remove("red-border");

    peopleNumber = parseFloat(peopleInput.value);
    calculateResult();
  }
}

function calculateResult() {
  let tipAmount = (billValue * tipValue) / peopleNumber;
  let total = billValue / peopleNumber + tipAmount;

  if (isNaN(tipAmount)) {
    tipPerPerson.textContent = "invaild result";
    totalAmount.textContent = "invaild result";
  } else {
    tipPerPerson.textContent = "$" + tipAmount.toFixed(2);
    totalAmount.textContent = "$" + total.toFixed(2);
  }

  console.log(bill.value)
}

resetButton.addEventListener("click", function () {
  bill.value = "";
  peopleInput.value = "";
  customTip.value = "";

  tipPerPerson.textContent = "$0.0";
  totalAmount.textContent = "$0.0";

  errorPeopleMsg.classList.remove("show");
  peopleInput.classList.remove("red-border");
});
