const addBtn = document.querySelector("#add-btn");
const clearBtn = document.querySelector("#clear-btn");
const toggleBtn = document.querySelector("#toggle-btn");

const hint = document.querySelector("#hint");
const cardList = document.querySelector("#card-list");
const template = document.querySelector("#card-template");

// console.log(clearBtn)
addBtn.addEventListener("click", () => {
  const clone = template.content.cloneNode(true);
  cardList.append(clone);
  //    for (let i = 0; i < 3; i++) { this is if I want to open all 3 cards together
  //     const clone = template.content.cloneNode(true);
  //    cardList.append(clone);
  //   }
  updateUI();
});

function updateUI() {
  const hasCards = cardList.children.length > 0;

  hint.hidden = hasCards;
  toggleBtn.hidden = !hasCards;
}

//clear
clearBtn.addEventListener("click", () => {
  cardList.innerHTML = "";
  cardList.classList.remove("show-results");
  updateUI();
});

//X clear event delegation
cardList.addEventListener("click", (event) => {
  const closeBtn = event.target.closest(".card__close");

  if (!closeBtn) return;

  closeBtn.closest(".card").remove();

  updateUI();
});

toggleBtn.addEventListener("click", () => {
  const showingResults = cardList.classList.toggle("show-results");
  //   console.log(showingResults);
  if (!showingResults) return; // switched back to inputs → nothing to fetch

  const cards = cardList.querySelectorAll(".card");

  cards.forEach(async (card) => {
    const ip = card.querySelector(".card__input").value.trim();

    const data = await lookupIp(ip);
    renderResult(card, data);
  });
});

async function lookupIp(ip) {
  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`);

    if (!response.ok) {
      return null; // no data
    }

    const data = await response.json();
    console.log(data);

    return data; // give the data back
  } catch (error) {
    console.error(error);
    return null; // no data
  }
}

// lookupIp("8.8.8.8").then((result) => console.log("returned:", result));



function renderResult(card, data) {
  // 1. no data? mark the card as empty and stop
  card.classList.toggle('is-empty', !data);
  if (!data) return;

  // 2. fill in the info
  card.querySelector('.card__country').textContent = data.country_name;
  card.querySelector('.card__timezone').textContent = data.timezone;

  // 3. the flag
  const flag = card.querySelector('.card__flag');
  flag.src = `https://flagcdn.com/w40/${data.country_code.toLowerCase()}.png`;
  flag.alt = data.country_name;
}