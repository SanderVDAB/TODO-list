var taak = document.getElementById("taak");
var tijd = document.getElementById("tijd");
var taakjes = document.getElementById("taakjes");
var taakje = document.getElementsByClassName("taakje");
var titel = document.getElementById("titel");
var bewerkknopjes = document.getElementsByClassName("bewerkknopjes");
var aan = document.getElementsByClassName("aan")
var mopjes = [];
var geweest = [];
var seconden = 0;
var pauze_bool = true;

function voegToe() {
    taakjes.innerHTML = localStorage.getItem("data");
    taakjes.innerHTML += `<div class="taakje"><p>${taak.value}</p><button onclick="play(this)">|></button><span>${tijd.value}:00</span><div class="bewerkknopjes"><button onclick="omhoog(this)"><i class="fas fa-hand-point-up"></i></button><button onclick="wissen(this)">X</button><button onclick="omlaag(this)"><i class="fas fa-hand-point-down"></i></button></div></div>`
    localStorage.setItem("data", taakjes.innerHTML)
    taak.value = ""
    tijd.value = ""
}

function wissen(sluit) {
    sluit.parentElement.parentElement.remove();
    localStorage.setItem("data", taakjes.innerHTML);
}

function wisselen(oude, nieuwe) {
    var temp = oude.children[2].outerHTML;
    oude.children[2].outerHTML = nieuwe.children[2].outerHTML;
    nieuwe.children[2].outerHTML = temp;
    var temp = oude.children[0].outerHTML;
    oude.children[0].outerHTML = nieuwe.children[0].outerHTML;
    nieuwe.children[0].outerHTML = temp;
}

function omhoog(knop) {
    if (knop.parentElement.parentElement.previousElementSibling === null) {
        alert("Dit staat al vanboven eh noob")
    } else {
        oorspronkelijk = knop.parentElement.parentElement;
        nieuw = knop.parentElement.parentElement.previousElementSibling;
        wisselen(oorspronkelijk, nieuw)
    }
}

function omlaag(knop) {
    if (knop.parentElement.parentElement.nextElementSibling === null) {
        alert("Deze is al vanonder eh paljaske")
    } else {
        oorspronkelijk = knop.parentElement.parentElement;
        nieuw = knop.parentElement.parentElement.nextElementSibling;
        wisselen(oorspronkelijk, nieuw)
    }

}

function geefTijd(play) {
    var temp = play.parentElement.children[2].innerHTML;
    temp = temp.split(":");
    if (temp[2] === undefined) {
        return parseInt(temp[0]) * 3600 + parseInt(temp[1]) * 60;
    } return parseInt(temp[0]) * 3600 + parseInt(temp[1]) * 60 + parseInt(temp[2]);
}

function veranderTijd(getal) {
    var hours = Math.floor(getal / 3600);
    var minutes = Math.floor((getal - (hours * 3600)) / 60);
    var seconds = Math.floor((getal - (hours * 3600)) - (minutes * 60))
    return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes + ":" + (seconds <= 9 ? "0" : "") + seconds
}

function playButtons(children) {
    for (let i = 0; i < children.length; i++) {
        children[i].style
    }
}

function play(play) {
    play.setAttribute("onclick", `pauze()`);
    play.setAttribute("class", "aan")
    pauze(play);
    var getal = geefTijd(play.parentElement.children[2]) - 1;
    play.parentElement.children[2].innerHTML = veranderTijd(getal);
    if (getal < 601) {
        play.parentElement.children[2].style.color = "red";
    }
}

function pauzeknoppen(parent, teken, kleur) {
    for (let i = 0; i < parent.length; i++) {
        parent[i].innerHTML = teken;
        parent[i].style.backgroundColor = kleur;
    }
}

function pauze() {
    (pauze_bool === false ? pauze_bool = true : pauze_bool = false)
    var countdownAan = () => {
        if (pauze_bool === false) {
            pauzeknoppen(aan, "||", "green");
            countdown();
        } else {
            pauzeknoppen(aan, "|>", "");
            clearInterval(zetaan)
        }
    }
    var zetaan = setInterval(countdownAan, 1000);
}

function leesJSON() {
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        localStorage.setItem("mopjes", JSON.parse(this.responseText));
    }
    xhttp.open("GET", "sara.JSON", true);
    xhttp.send();
}

function mopjesMaker() {
    if (mopjes.length === 0) {
        leesJSON();
        mopjes = JSON.stringify(localStorage.getItem("mopjes")).split(",");
    }
    nummer_mopje = Math.floor(Math.random() * mopjes.length);
    return_mopje = mopjes[nummer_mopje];
    if (return_mopje.length < 7) {
        return_mopje = "tis nie omda ik wijs, da ge moet kijken eh"
    }
    mopjes.splice(nummer_mopje, 1);
    localStorage.setItem("mopjes", mopjes);
    return return_mopje.replaceAll("\\", "")
}

function laatsteMinuten(getal, i) {
    if (getal < 0) {
        alert(`Je taakje is afgelopen \n${mopjesMaker()}`)
        taakje[i].remove()
    }
    else if (getal < 601) {
        return taakje[i].children[2].style.color = "red";
    }
}

function countdown() {
    for (let i = 0; i < taakje.length; i++) {
        var getal = geefTijd(taakje[i].children[2]);
        if (taakje[i].children[1].onclick.toString() === 'function onclick(event) {\npauze()\n}') {
            getal--;
            taakje[i].children[2].innerHTML = veranderTijd(getal);
            laatsteMinuten(getal, i);
        }
    }
    localStorage.setItem("data", taakjes.innerHTML);
}

function bewerk() {
    titel.innerHTML = `<input type="text" placeholder="${localStorage.getItem("Titel_TODO")}" style="height: 50px; font-size: 30px; width: 300px"><button class="pasaan" onclick="gedaan(this)"><i class="fas fa-check"></i></button>`
    for (let i = 0; i < bewerkknopjes.length; i++) {
        bewerkknopjes[i].style.display = "flex"
    }
}

function gedaan(bewerkbutton) {
    if (localStorage.getItem("Titel_TODO") === null) {
        console.log("undefined")
        localStorage.setItem("Titel_TODO", "Sander = God");
    } else {
        if (bewerkbutton !== undefined) {
            console.log("defined")
            if (bewerkbutton.parentElement.children[0].value !== "") {
                localStorage.setItem("Titel_TODO", bewerkbutton.parentElement.children[0].value)
            } else {
                localStorage.setItem("Titel_TODO", "Sander = God");
            }
        }
    }
    titel.innerHTML = `<h1>${localStorage.getItem("Titel_TODO")}</h1><button class="bewerk" onclick="bewerk()"><i class="far fa-edit"></i></button>`
    for (let i = 0; i < bewerkknopjes.length; i++) {
        bewerkknopjes[i].style.display = "none"
    }
}

window.addEventListener("load", () => taakjes.innerHTML = localStorage.getItem("data"), gedaan());
