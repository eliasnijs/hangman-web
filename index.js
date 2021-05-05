let letters = "_";
let wrong = 0;

function reset() {
    letters = "_";
    wrong = 0;
    initButtons();
    addListeners();
    firstPattern();
    setGallows();
}

function initButtons(){
    const buttons = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
    let divs = []
    for (let index = 0; index < 26; index += 1) {
         divs.push(`<button class=\"button-active\">` + buttons[index]  + `</button>`);
    }
    document.getElementById("buttons-top").innerHTML =divs.slice(0,13).join("");
    document.getElementById("buttons-bottom").innerHTML = divs.slice(13,26).join("");
}

function addListeners(){
    document.querySelectorAll(".button-active").forEach(b => b.addEventListener("click",buttonPressed));
    document.querySelectorAll("#reload").forEach(b => b.addEventListener("click",reset));
}

function firstPattern() {
    fetch(`./cgi-bin/firstpattern.cgi`)
        .then(antwoord => antwoord.json())
        .then(data => { document.getElementById("word").innerHTML = data["pattern"];});
}

function setGallows() {
    let divs = [];
    for (let i = 0; i <= wrong; i += 1) {
        divs.push(`<div class="gallows-` + i + `"></div>`);
    }
    document.getElementById("gallows").innerHTML = divs.join("");
}

function buttonPressed(event) {
    const button = event.target;
    button.removeEventListener("click", buttonPressed);
    button.classList.value = "button-inactive";

    const pattern = document.getElementById("word").innerHTML.toUpperCase();
    const expansion = button.innerHTML;

    fetch(`cgi-bin/buttonpressed.cgi?pattern=${pattern}&letters=${letters}&expansion=${expansion}`)
        .then(antwoord => antwoord.json())
        .then(data => {
            letters = data["letters"];
            wrong += data["wrong"]
            document.getElementById("word").innerHTML = data["pattern"].toLowerCase();
            setGallows()
        })
}

reset()