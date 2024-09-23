// select all elements
let theInput = document.querySelector("input");
let allSpans = document.querySelectorAll(".buttons span");
let results = document.querySelector(".results > span");
let cntLocal = document.querySelector(".cnt-local > span");

let cnt = localStorage.getItem("cnt")
  ? parseInt(localStorage.getItem("cnt"))
  : 0;
cntLocal.innerHTML = cnt;

allSpans.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (e.target.classList.contains("check-item")) {
      checkItem();
    }

    if (e.target.classList.contains("add-item")) {
      AddItem();
    }

    if (e.target.classList.contains("delete-item")) {
      DeleteItem();
    }

    if (e.target.classList.contains("show-items")) {
      ShowItems();
    }
  });
});

function EmptyInput() {
  results.innerHTML = `Input Can't Be Empty`;
}

function checkItem() {
  let val = theInput.value;
  if (val !== "") {
    if (localStorage.getItem(val)) {
      results.innerHTML = `Found Local Item Called <span>${val}</span>`;
    } else {
      results.innerHTML = `No Local Storage Item With The Name <span>${val}</span>`;
    }
    theInput.value = "";
  } else {
    EmptyInput();
  }
}

// add
function AddItem() {
  let val = theInput.value;
  if (val !== "") {
    if (localStorage.getItem(val)) {
      results.innerHTML = `Item ${val} Is Added Before`;
    } else {
      localStorage.setItem(val, "test");
      results.innerHTML = `Local Storage Item <span>${val}</span> Added`;
      theInput.value = "";
      cnt++;
      localStorage.setItem("cnt", cnt);
      cntLocal.innerHTML = cnt;
    }
  } else {
    EmptyInput();
  }
}

// delete
function DeleteItem() {
  let val = theInput.value;
  if (val !== "") {
    if (localStorage.getItem(val)) {
      localStorage.removeItem(val);
      results.innerHTML = `Local Storage Item <span>${val}</span> deleted`;
      cnt--;
      localStorage.setItem("cnt", cnt);
      cntLocal.innerHTML = cnt;
    } else {
      results.innerHTML = `Local Storage Item <span>${val}</span> Not Found`;
    }
    theInput.value = "";
  } else {
    EmptyInput();
  }
}

// show
function ShowItems() {
  if (localStorage.length > 1) {
    results.innerHTML = "";
    for (const [key, value] of Object.entries(localStorage)) {
      if (key === "cnt") continue;
      results.innerHTML += `
          <span>${key}</span> <br>
      `;
    }
  } else if (localStorage.length === 1) {
    results.innerHTML = `Local Storage Is Empty`;
  }
}
