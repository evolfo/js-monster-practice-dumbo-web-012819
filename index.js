// =========== Variable Declarations
const monsterContainer = document.querySelector('#monster-container');
const createMonsterContainer = document.querySelector('#monster-form');
const forwardButton = document.getElementById('forward');
const backButton = document.getElementById('back');
const baseURL = "http://localhost:3000/monsters"
let getURL = "http://localhost:3000/monsters?_limit=50&_page=0"


// =========== Event Listeners

document.addEventListener("DOMContentLoaded", (event) => {
  loadAllMonsters();
})

forwardButton.addEventListener('click', (event) => {
  if (parseInt(getURL.slice(-1)) < 50) {
    event.preventDefault();
    getURL = getURL.slice(0, -1) + (parseInt(getURL.slice(-1)) + 1);
    monsterContainer.innerHTML = "";
    loadAllMonsters();
  }
})

backButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (parseInt(getURL.slice(-1)) > 0) {
    getURL = getURL.slice(0, -1) + (parseInt(getURL.slice(-1)) - 1);
    monsterContainer.innerHTML = "";
    loadAllMonsters();
  }
})

createMonsterContainer.addEventListener('submit', (event) => {
  event.preventDefault();
  let name = event.target.name.value;
  let age = event.target.age.value;
  let description = event.target.description.value;
  addNewMonster(name, age, description);
})

// =========== Fetch Requests

function loadAllMonsters() {
  return fetch(getURL)
    .then(resp => resp.json())
    .then(monsters => {
      monsters.forEach((monster) => {
        generateMonsterHtml(monster);
      })
    })
}

function addNewMonster (name, age, description) {
  return fetch(baseURL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    body: JSON.stringify({name: name, age: age, description: description})
  })
}


// ============ HTML Generators

const generateMonsterHtml = (monster) => {
  monsterContainer.innerHTML += `
    <div>
      <h2>${monster.name}</h2>
      <h4>Age: ${monster.age}</h4>
      <p>${monster.description}</p>
    </div>
  `
}
