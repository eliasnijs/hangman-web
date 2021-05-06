let letters = "_";
let wrong = 0;

function reset() {
    letters = "_";
    wrong = 0;
    initButtons();
    addListeners();
    firstPattern();
    sethang();
}

function initButtons(){
    const buttons = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
    let divs = []
    for (let index = 0; index < 26; index += 1) {
         divs.push(`<button class=\"button-active\">` + buttons[index]  + `</button>`);
    }
    document.getElementById("word").classList.value = "word";
    document.getElementById("buttons-top").innerHTML =divs.slice(0,13).join("");
    document.getElementById("buttons-bottom").innerHTML = divs.slice(13,26).join("");
    document.getElementById("buttons-top").removeEventListener("click", reset);
}

function addListeners(){
    document.querySelectorAll(".button-active").forEach(b => b.addEventListener("click",buttonPressed));
    document.querySelectorAll(".reload").forEach(b => b.addEventListener("click",reset));
}

function firstPattern() {
    fetch(`./cgi-bin/firstpattern.cgi`)
        .then(antwoord => antwoord.json())
        .then(data => { document.getElementById("word").innerHTML = data["pattern"];});
}

function sethang() {
    let divs = [];
    for (let i = 0; i <= wrong; i += 1) {
        divs.push(`<div class="hang-` + i + `"></div>`);
    }
    document.getElementById("hang").innerHTML = divs.join("");
}

function endgame(word){
    const message=(wrong!==9)? "victory":"defeat";
    document.getElementById("word").innerHTML = message;
    document.getElementById("word").classList.add(message)
    const top = document.getElementById("buttons-top");
    top.innerHTML = `<h3 class=\"reload\">The correct word was <span class=\"endgame-word\">\"`+ word + `\"</span>. Press me to play again!</h3>`;
    top.addEventListener("click", reset);
    document.getElementById("buttons-bottom").innerHTML = "";
}

function buttonPressed(event) {
    const button = event.target;
    button.removeEventListener("click", buttonPressed);
    button.classList.value = "button-inactive";
    let pattern = document.getElementById("word").innerHTML.toUpperCase();
    const expansion = button.innerHTML;

    fetch(`cgi-bin/buttonpressed.cgi?pattern=${pattern}&letters=${letters}&expansion=${expansion}`)
        .then(antwoord => antwoord.json())
        .then(data => {
            letters = data["letters"]; wrong += data["wrong"];
            pattern = data["pattern"].toLowerCase(); const word = data["word"].toLowerCase();
            document.getElementById("word").innerHTML = pattern;
            sethang()
            if (wrong === 9 || !/_/.test(pattern)) {
                endgame(word);
            }
        })
}

reset()


document.querySelector("#button-audio").addEventListener("click", mute)
let a = document.querySelector("#audio");
function mute(){
    if (a.paused) {
        a.play();
    } else {
        a.pause();
    }
}
a.play();