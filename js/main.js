let bill = document.querySelector("#bill-input");
const selectedTip = document.querySelector(".selected-tip");
const tipButtons = document.querySelectorAll(".tip");
let peopleInput = document.getElementById("people");
const tipPerPerson = document.querySelector(".tip-per-person .value");
const totalAmount = document.querySelector(".total-person .value");
const customTip = document.querySelector(".input-tip");
const errorMsg = document.querySelector(".error-msg");
const resetButton = document.querySelector(".reset");

bill.addEventListener("input", setBillValue);
selectedTip.addEventListener("click", handleClick);
customTip.addEventListener("input", setCustomTip);
peopleInput.addEventListener("input", setPeopleNumber);

let billValue = 0.0;
let tipValue = 0.15;
let peopleNumber = 1;

function setBillValue() {
  billValue = parseFloat(bill.value);
  calculateResult();
}

function handleClick(e) {
  
    let tip = e.target;
    tipButtons.forEach((btn) => {
      btn.classList.remove("btn-active");
    });
    tip.classList.add("btn-active");

    tipValue = parseInt(tip.innerHTML) / 100;

    customTip.value = "";
  calculateResult();
}

function setCustomTip(e) {
  tipValue = parseFloat(customTip.value / 100);
  tipButtons.forEach((btn) => {
    btn.classList.remove("btn-active");
  });

  if (customTip.value !== " ") {
    calculateResult();
  }
}

function setPeopleNumber() {
  peopleNumber = parseFloat(peopleInput.value);

  if (peopleNumber <= 0) {
    errorMsg.classList.add("show");
    peopleInput.classList.add("red-border");
    peopleNumber = 1;
  } else {
    errorMsg.classList.remove("show");
    peopleInput.classList.remove("red-border");
  }
  calculateResult();
}

function calculateResult() {
  let tipAmount = (billValue * tipValue) / peopleNumber;
  let total = tipAmount + billValue * tipValue;

  tipPerPerson.textContent = "$" + tipAmount.toFixed(2);
  totalAmount.textContent = "$" + total.toFixed(2);

  console.log({ billValue });
  console.log({ tipValue });
  console.log({ peopleNumber });
}

resetButton.addEventListener("click", function () {
  bill.value = "0.0";
  setBillValue();

  peopleInput.value = "1";
  setPeopleNumber();
});
