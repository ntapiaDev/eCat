class Cat {
    constructor(name, race, color, age, statut) {
        this.name = name
        this.race = race
        this.color = color
        this.age = age
        this.statut = statut
    }
}

let gribouille = new Cat("Gribouille", "Main coon", "gris", "8 ans", true)
let simba = new Cat("Simba", "Sphynx", "roux", "1 an et demi", true)
let nala = new Cat("Nala", "Bengal", "blanc", "6 mois", false)
let tigrou = new Cat("Tigrou", "bengal", "tigré", "1 ans", true)
let maya = new Cat("Maya", "Ragdoll", "gris", "1 ans", true)
let chipie = new Cat("Chipie", "Savannah", "blanc", "1 ans", false)
let filou = new Cat("Filou", "Bleu russe", "gris", "1 ans", true)
let caramel = new Cat("Caramel", "Main coon", "roux", "1 ans", true)
let merlin = new Cat("Merlin", "Angora", "noir et blanc", "1 ans", true)

let cats = []
cats.push(gribouille, simba, nala, tigrou, maya, chipie, filou, caramel, merlin)

// Affichage de la page d'accueil
if (document.querySelector(".main__cats")) {
    for (let i = 0; i < cats.length; i++) {
        document.querySelectorAll(".main__cat__name")[i].textContent = cats[i].name
        document.querySelectorAll(".main__cat__race")[i].innerHTML = "<strong>Race : </strong>" + cats[i].race
        document.querySelectorAll(".main__cat__color")[i].innerHTML = "<strong>Couleur : </strong>" + cats[i].name
        document.querySelectorAll(".main__cat__age")[i].innerHTML = "<strong>Age : </strong>" + cats[i].age
    }
}

// Page chats-info dynamique
if (document.querySelector(".main__cat-info")) {
    let id = window.location.search.slice(4)
    document.querySelector(".main__cat-info__title").textContent = cats[id - 1].name
    document.querySelector(".main__cat-info__img").src = `./assets/img/${id}_small.png`
    document.querySelector(".color").textContent = cats[id - 1].color
    document.querySelector(".age").textContent = cats[id - 1].age
    document.querySelector(".race").textContent = cats[id - 1].race
    document.querySelector(".main__cat-info__btn").value = `Ajouter ${cats[id - 1].name} au panier`
    let readyInfo = document.querySelector(".main__cat-info__ready")
    if (cats[id - 1].statut) {
        readyInfo.innerHTML = "Votre chat est prêt à être adopté"
        readyInfo.classList.add("ready")
        document.querySelector(".main__cat-info__btn").classList.add("enable")
    } else {
        readyInfo.innerHTML = "Nous avons encore besoin de nous occuper de ce chat avant qu'il ne puisse être adopté"
        document.querySelector(".main__cat-info__btn").disabled = true
    }
    

    // Ajout au panier
    document.querySelector(".main__cat-info__btn").addEventListener("click", addCat)
    document.querySelector(".main__cat-info__number").value = 1
    function addCat() {
        
        if (document.querySelector(".main__cat-info__number").value > 0) {
            class choosenCat {
                constructor(id, statut, vaccin, puces, quantity) {
                    this.id = id
                    this.statut = statut
                    this.vaccin = vaccin
                    this.puces = puces
                    this.quantity = quantity
                }
            }

            let statut = cats[id - 1].statut
            let vaccin = document.querySelector("#vaccin").checked
            let puces = document.querySelector("#puces").checked
            let quantity = document.querySelector(".main__cat-info__number").value
            let cat = JSON.stringify(new choosenCat(id, statut, vaccin, puces, quantity))
            localStorage.setItem(id, cat);
        } else {
            alert("Vous n'avez pas sélectionné de quantité")
            document.querySelector(".main__cat-info__btn").parentNode.href = "#"
        }
    }
}

// Panier

if (localStorage.length > 0) {
    let j = 0
    for (let i = 0; i < 9; i++) {
        if (localStorage.getItem(i + 1) !== null) {
            let storage = JSON.parse(localStorage.getItem(i + 1))
            console.log(storage);

            if (document.querySelector(".main__cart__content")) {
                let catInCart = document.createElement("div")
                catInCart.classList.add("main__cart__cat")
                document.querySelector(".main__cart__content").appendChild(catInCart)
        
                let catinCartImg = document.createElement("img")
                catinCartImg.classList.add("main__cart__cat__img")    
                document.querySelectorAll(".main__cart__cat")[j].appendChild(catinCartImg)
                catinCartImg.src = `./assets/img/${storage.id}.png`
                console.log(catinCartImg.src);
                
                let catinCartName = document.createElement("p")
                catinCartName.textContent = cats[storage.id - 1].name
                document.querySelectorAll(".main__cart__cat")[j].appendChild(catinCartName)
                j++
        
                document.querySelector(".main__cart__form__submit").addEventListener("click", getMyCat)
        
                function getMyCat() {
                    localStorage.clear()
                }
            }
        }
    }

    //JSON.parse("{\"id\":\"3\",\"quantity\":\"2\"}")

    // marche avec un mais pas avec deux
    // [,] liste à faire
}