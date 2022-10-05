const counterValue = document.querySelector("#counter-value");
const incrementBtn = document.querySelector(".increment");
const decrementBtn = document.querySelector(".decrement");
const resetBtn = document.querySelector(".reset");

let store = Redux.createStore(reducer);
let payload = 5;
let maxValue = 15;
counterValue.innerHTML = store.getState();

store.subscribe(() => {
  counterValue.innerHTML = store.getState();
});

function reducer(state = 0, { type, payload }) {
  switch (type) {
    case "increment":
      return state + payload;
    case "decrement":
      return state - payload;
    case "reset":
      return 0;
    default:
      return state;
  }
}

function setPayload(step) {
  document.querySelectorAll(".steps").forEach((elm) => {
    elm.classList.remove("active");
  });
  document.getElementById("payload" + step).classList.add("active");
  payload = step;
}

function setMaxValue(max) {
  document.querySelectorAll(".maxvalue").forEach((elm) => {
    elm.classList.remove("active");
  });
  document.getElementById("maxValue" + max).classList.add("active");
  maxValue = max;
}

incrementBtn.addEventListener("click", () => {
  if (store.getState() >= maxValue) return;
  store.dispatch({ type: "increment", payload: payload });
});
decrementBtn.addEventListener("click", () => {
  store.dispatch({ type: "decrement", payload: payload });
});
resetBtn.addEventListener("click", () => {
  store.dispatch({ type: "reset", payload: payload });
});
