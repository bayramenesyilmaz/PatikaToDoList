let form = document.querySelector("#form");
let input = document.querySelector("#input");
let button = document.querySelector("#btnAdd");
let uldom = document.querySelector("#list");

button.addEventListener("click", notEkle);

uldom.addEventListener("click", tamamlaVeSilFonk)

document.addEventListener("DOMContentLoaded", localStorageOku)

let ulList = document.querySelector("#list");

function addItem(note) {

    let newLi = document.createElement("li");
    newLi.innerHTML = `
    <div class="listBox">
        <li class="listId">${note} </li> 
        <i class="fa-solid fa-trash deleteBtn"></i>
    </div>
    `
    ulList.append(newLi);

}

function localStorageOku() {
    let gelenNot = localStorageArray();
    gelenNot.forEach(not => {

        addItem(not);

    });
}

function notEkle() {
    if (input.value.length > 0) {
        addItem(input.value);

        localStorageAdd(input.value);

        // localStorageOku()
        input.value = "";
        alert("Not başarıyla eklendi :)")
    } else {
        alert("Boş değer girilmez!")
    }
}

//localstorage ta array oluşturma. Bu sayede birden fazla not tutabilriz.
function localStorageArray() {
    let notlar;
    if (localStorage.getItem("notlar") === null) {
        notlar = [];
    } else {
        notlar = JSON.parse(localStorage.getItem("notlar"));
    }
    return notlar;
}

function localStorageAdd(alinanNot) {
    let not = localStorageArray();

    not.push(alinanNot)
    localStorage.setItem("notlar", JSON.stringify(not));
}

function tamamlaVeSilFonk(e) {

    let tiklanilanEleman = e.target;
    //contains : tiklanılanılan elemanun classlisti "içeriyorsa" anlamında kullanılır
    if (tiklanilanEleman.classList.contains("listId")) {
        tiklanilanEleman.parentElement.classList.toggle("tamamlandi");
        tiklanilanEleman.classList.toggle("line");
    }

    if (tiklanilanEleman.classList.contains("deleteBtn")) {

        localStorageSil(tiklanilanEleman.parentElement.children[0].innerText);
        tiklanilanEleman.parentElement.remove();

    }

}


function localStorageSil(e) {
    let notlar = localStorageArray();
    newNotes = notlar.filter(note => note != e)
    localStorage.setItem("notlar", JSON.stringify(newNotes));
}

