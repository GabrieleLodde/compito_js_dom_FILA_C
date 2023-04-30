const tagInputTitolo = document.querySelector("#inputTitolo")
const tagInputGenere = document.querySelector("#inputGenere")
const tagInputDurata = document.querySelector("#inputDurata")
const tagInputNazione = document.querySelector("#inputNazione")
const tagFiltroGenere = document.querySelector("#filtroGenere")
const tagFiltroNazione = document.querySelector("#filtroNazione")
const tagOutputFilms = document.querySelector("#outputFilms")

let films = []
let film


function clearInput(){
    tagInputTitolo.value = ""
    tagInputGenere.value = "Commedia"
    tagInputDurata.value = ""
    tagInputNazione.value = "ITA"
}

function checkInput(){
    if(tagInputTitolo.value.trim() == "" || tagInputGenere.value == "-1" || tagInputDurata.value == "" || tagInputNazione.value == "-1")
        return false
    else
        return true
}

function aggiungiFilm(){
    if(checkInput()){
        film = {
            titolo: tagInputTitolo.value,
            genere: tagInputGenere.value,
            durata: tagInputDurata.value,
            nazione: tagInputNazione.value
        }
        films.push(film)
        stampaFilm(films)
    }
    clearInput()
}

function filtraFilm() {
    let filmFiltrati = []
    if(tagFiltroGenere.value != "" && tagFiltroNazione.value != ""){
        filmFiltrati = films.filter(element => element.genere == tagFiltroGenere.value && element.nazione == tagFiltroNazione.value)
    }
    else if(tagFiltroGenere.value != "" && tagFiltroNazione.value == ""){
        filmFiltrati = films.filter(element => element.genere == tagFiltroGenere.value)
    }
    else if(tagFiltroGenere.value == "" && tagFiltroNazione.value != ""){
        filmFiltrati = films.filter(element => element.nazione == tagFiltroNazione.value)
    }
    else{
        filmFiltrati = films
    }
    stampaFilm(filmFiltrati)
}

function stampaFilm(arrayDaStampare){
    while (tagOutputFilms.hasChildNodes()) {
        tagOutputFilms.removeChild(tagOutputFilms.firstChild)
    }
    let riga
    let datoRiga
    let testoDatoRiga
    arrayDaStampare.sort( (a,b) => {
        if(a.titolo > b.titolo) return 1
        else if(a.titolo < b.titolo) return -1
        return 0
    })
    arrayDaStampare.forEach(element => {
        riga = document.createElement("tr")

        datoRiga = document.createElement("td")
        testoDatoRiga = document.createTextNode(element.titolo)
        datoRiga.appendChild(testoDatoRiga)
        riga.appendChild(datoRiga)

        datoRiga = document.createElement("td")
        testoDatoRiga = document.createTextNode(element.genere)
        datoRiga.appendChild(testoDatoRiga)
        riga.appendChild(datoRiga)

        datoRiga = document.createElement("td")
        testoDatoRiga = document.createTextNode(element.durata)
        datoRiga.appendChild(testoDatoRiga)
        riga.appendChild(datoRiga)

        datoRiga = document.createElement("td")
        testoDatoRiga = document.createTextNode(element.nazione)
        datoRiga.appendChild(testoDatoRiga)
        riga.appendChild(datoRiga)

        tagOutputFilms.appendChild(riga)
    });
}

function salvaLocalStorage() {
    let filmSalvati = []
    let righeTabella = tagOutputFilms.querySelectorAll('tr')
    righeTabella.forEach( riga => {
        let filmSalva = {
            titolo: riga.children[0].innerHTML,
            genere: riga.children[1].innerHTML,
            durata: riga.children[2].innerHTML,
            nazione: riga.children[3].innerHTML
        }
        filmSalvati.push(filmSalva)
    } )
    localStorage.setItem("Film salvati", JSON.stringify(filmSalvati)) 
}

function aggiornaTabella(){
    let arrayMemoria = localStorage.getItem("Film salvati")
    if(arrayMemoria == null){
        return false
    }
    else {
        films = JSON.parse(arrayMemoria)
    }
    stampaFilm(films)
}

