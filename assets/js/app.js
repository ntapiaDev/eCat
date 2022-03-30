class Cat {
    constructor(id, name, race, color, age, price, statut) {
        this.id = id
        this.name = name
        this.race = race
        this.color = color
        this.age = age
        this.price = price
        this.statut = statut
    }
}

let cats = [
    gribouille = new Cat(1, "Gribouille", "Main coon", "gris", "8 ans", "12", true),
    simba = new Cat(2, "Simba", "Sphynx", "roux", "1 an et demi", "25", true),
    nala = new Cat(3, "Nala", "Bengal", "blanc", "6 mois", "30", false),
    tigrou = new Cat(4, "Tigrou", "bengal", "tigré", "1 ans", "18", true),
    maya = new Cat(5, "Maya", "Ragdoll", "gris", "1 ans", "15", true),
    chipie = new Cat(6, "Chipie", "Savannah", "blanc", "1 ans", "10", false),
    filou = new Cat(7, "Filou", "Bleu russe", "gris", "1 ans", "22", true),
    caramel = new Cat(8, "Caramel", "Main coon", "roux", "1 ans", "30", true),
    merlin = new Cat(9, "Merlin", "Angora", "noir et blanc", "1 ans", "15", true)
]

// Affichage de la page d'accueil dynamique
if (document.querySelector(".main__cats")) {
    // Utilisation du template
    if ("content" in document.createElement("template")) {
        for (let i = 0; i < cats.length; i++) {
            let mainCat = document.querySelector("#main__cat")
            let clone = document.importNode(mainCat.content, true)  
            document.querySelector(".main__cats__container").appendChild(clone)
        }
    }
    for (let i = 0; i < cats.length; i++) {
        document.querySelectorAll(".main__cat a")[i].href = `./cats.html?id=${cats[i].id}`
        document.querySelectorAll(".main__cat img")[i].src = `./assets/img/${cats[i].id}_small.png`
        document.querySelectorAll(".main__cat__name")[i].textContent = cats[i].name
        document.querySelectorAll(".main__cat__race")[i].textContent = cats[i].race
        document.querySelectorAll(".main__cat__color")[i].textContent = cats[i].name
        document.querySelectorAll(".main__cat__age")[i].textContent = cats[i].age
    }
}

// Page chats-info dynamique
if (document.querySelector(".main__cat-info")) {
    let id = window.location.search.slice(4)
    document.querySelector(".main__cat-info__title").textContent = cats[id - 1].name
    document.querySelector(".main__cat-info__img").src = `./assets/img/${id}.png`
    document.querySelector(".color").textContent = cats[id - 1].color
    document.querySelector(".age").textContent = cats[id - 1].age
    document.querySelector(".race").textContent = cats[id - 1].race
    let price = cats[id - 1].price
    document.querySelector(".price").textContent = price + "€/jour seulement"
    document.querySelector(".main__cat-info__btn").value = `Ajouter ${cats[id - 1].name} au panier`
    let readyInfo = document.querySelector(".main__cat-info__ready")
    if (cats[id - 1].statut) {
        readyInfo.textContent = "Votre chat est prêt à être adopté"
        readyInfo.classList.add("ready")
        document.querySelector(".main__cat-info__btn").classList.add("enable")
    } else {
        readyInfo.textContent = "Nous avons encore besoin de nous occuper de ce chat avant qu'il ne puisse être adopté"
        document.querySelector(".main__cat-info__btn").disabled = true
    }
    

    // Ajout au panier
    document.querySelector(".main__cat-info__btn").addEventListener("click", addCat)
    document.querySelector(".main__cat-info__number").addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            e.preventDefault()
            addCat()
            location.href = "/cart.html"
        }
    })

    document.querySelector(".main__cat-info__number").value = 1

        // Mise à jour du prix
        document.querySelector("#vaccin").addEventListener("change", setPrice)
        document.querySelector("#puces").addEventListener("change", setPrice)
        document.querySelector(".main__cat-info__number").addEventListener("change", setPrice)
        function setPrice() {
            if (document.querySelector("#vaccin").checked && document.querySelector("#puces").checked) {
                document.querySelector(".price").textContent = parseInt(price * document.querySelector(".main__cat-info__number").value) + 15 * document.querySelector(".main__cat-info__number").value + "€ seulement"
            } else if (document.querySelector("#vaccin").checked) {
                document.querySelector(".price").textContent = parseInt(price * document.querySelector(".main__cat-info__number").value) + 5 * document.querySelector(".main__cat-info__number").value + "€ seulement"
            } else if (document.querySelector("#puces").checked) {
                document.querySelector(".price").textContent = parseInt(price * document.querySelector(".main__cat-info__number").value) + 10 * document.querySelector(".main__cat-info__number").value + "€ seulement"
            } else {
                document.querySelector(".price").textContent = parseInt(price * document.querySelector(".main__cat-info__number").value) + "€ seulement"
            }
        }

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
            alert("Vous n'avez pas sélectionné de quantité valide.")
            document.querySelector(".main__cat-info__btn").parentNode.href = "#"
        }
    }
}

// Panier

let order = []
if (localStorage.length > 0) {
    let j = 0
    let price = 0
    for (let i = 0; i < 9; i++) {
        if (localStorage.getItem(i + 1) !== null) {
            let storage = JSON.parse(localStorage.getItem(i + 1))
            console.log(storage);

            // Affichage des chats sélectionnés
            if (document.querySelector(".main__cart__content")) {
                // Div contenant le chat
                let catInCart = document.createElement("div")
                catInCart.classList.add("main__cart__cat")
                document.querySelector(".main__cart__content").appendChild(catInCart)
        
                // Image du chat
                let catinCartImg = document.createElement("img")
                catinCartImg.classList.add("main__cart__cat__img")    
                document.querySelectorAll(".main__cart__cat")[j].appendChild(catinCartImg)
                catinCartImg.src = `./assets/img/${storage.id}.png`
                console.log(catinCartImg.src);
                
                // Nom du chat
                let catinCartName = document.createElement("p")
                let dismiss = document.createElement("span")
                dismiss.classList.add("fa-solid")
                dismiss.classList.add("fa-circle-minus")
                dismiss.setAttribute("value", `${storage.id}`)
                catinCartName.textContent = cats[storage.id - 1].name + " "
                catinCartName.classList.add("main__cart__cat__name")
                catinCartName.appendChild(dismiss)
                document.querySelectorAll(".main__cart__cat")[j].appendChild(catinCartName)

                // Quantité de chats
                let catinCartQuant = document.createElement("p")
                let jours = "jour"
                if (storage.quantity > 1) {
                    jours = "jours"
                }
                let quantity = document.createElement("span")
                quantity.classList.add("underline")
                quantity.textContent = "Quantité :"
                let spanEmpty = document.createElement("span")
                spanEmpty.textContent = " "
                let spanQuant = document.createElement("span")
                spanQuant.classList.add("main__cart__cat__quant")
                spanQuant.textContent = storage.quantity + " " + jours + " "
                let spanDebut = document.createElement("span")
                spanDebut.textContent = "("
                let spanAdd = document.createElement("span")
                spanAdd.classList.add("add")
                spanAdd.textContent = "ajouter"
                let span = document.createElement("span")
                span.textContent = " - "
                let spanRemove = document.createElement("span")
                spanRemove.classList.add("remove")
                spanRemove.textContent = "retirer"
                let spanFinal = document.createElement("span")
                spanFinal.textContent = ")"
                catinCartQuant.appendChild(quantity)
                catinCartQuant.appendChild(spanEmpty)
                catinCartQuant.appendChild(spanQuant)
                catinCartQuant.appendChild(spanDebut)
                catinCartQuant.appendChild(spanAdd)
                catinCartQuant.appendChild(span)
                catinCartQuant.appendChild(spanRemove)
                catinCartQuant.appendChild(spanFinal)
                document.querySelectorAll(".main__cart__cat")[j].appendChild(catinCartQuant)

                // Vaccin & puces
                let catinCartTreatment = document.createElement("p")
                let vacStatut = document.createElement("span")
                vacStatut.classList.add("underline")
                vacStatut.textContent = "Vaccination"
                let vacCheck = document.createElement("span")
                    vacCheck.classList.add("fa-solid")
                    vacCheck.classList.add("fa-vac")
                let vaccinInfo = ""
                if (storage.vaccin) {
                    vacCheck.classList.add("fa-check")
                    price += 5 * storage.quantity
                    vaccinInfo = "vaccination"
                } else {
                    vacCheck.classList.add("fa-xmark")
                }

                let pucStatut = document.createElement("span")
                pucStatut.classList.add("underline")
                pucStatut.textContent = "Traitement anti-puces"
                let pucCheck = document.createElement("span")
                    pucCheck.classList.add("fa-solid")
                    pucCheck.classList.add("fa-puc")
                let pucesInfo = ""
                if (storage.puces) {
                    pucCheck.classList.add("fa-check")
                    price += 10 * storage.quantity
                    pucesInfo = "traitement anti-puces"
                } else {
                    pucCheck.classList.add("fa-xmark")
                }

                let spanEmpty2 = document.createElement("span")
                spanEmpty2.textContent = " "
                let spanEmpty3 = document.createElement("span")
                spanEmpty3.textContent = " "

                catinCartTreatment.appendChild(vacStatut)
                catinCartTreatment.appendChild(spanEmpty2)
                catinCartTreatment.appendChild(vacCheck)
                catinCartTreatment.appendChild(pucStatut)
                catinCartTreatment.appendChild(spanEmpty3)
                catinCartTreatment.appendChild(pucCheck)

                document.querySelectorAll(".main__cart__cat")[j].appendChild(catinCartTreatment)

                j++
                order.push(storage)

                // Calcul du prix
                price += storage.quantity * cats[i].price

                // Génération du message récapitulatif
                if (vaccinInfo === "" && pucesInfo === "") {
                    vaccinInfo = "aucune"
                } else if (vaccinInfo !== "" && pucesInfo !== "") {
                    vaccinInfo = "vaccination et"
                }
                document.querySelector("#message").textContent += `Chat désiré : ${cats[storage.id - 1].name} - Quantité : ${storage.quantity} - Options : ${vaccinInfo} ${pucesInfo} \n`
            }
        }
    }
    if (document.querySelector(".main__cart__content")) {

        // Edition du panier
        let dismiss = document.querySelectorAll(".main__cart__cat__name span")
        let add = document.querySelectorAll(".add")
        let remove = document.querySelectorAll(".remove")
        let vaccin = document.querySelectorAll(".fa-vac")
        let puces = document.querySelectorAll(".fa-puc")
        for (let i = 0; i < dismiss.length; i++) {
            dismiss[i].addEventListener("click", function() {
                localStorage.removeItem(dismiss[i].getAttribute("value"))
                location.reload()
            })
            add[i].addEventListener("click", function() {
                let storage = JSON.parse(localStorage.getItem(dismiss[i].getAttribute("value")))
                storage.quantity = parseInt(storage.quantity) + 1
                localStorage.setItem(dismiss[i].getAttribute("value"), JSON.stringify(storage))
                location.reload()
            })
            remove[i].addEventListener("click", function() {
                let storage = JSON.parse(localStorage.getItem(dismiss[i].getAttribute("value")))
                if (storage.quantity > 1) {
                    storage.quantity = parseInt(storage.quantity) - 1
                    localStorage.setItem(dismiss[i].getAttribute("value"), JSON.stringify(storage))
                } else {
                    localStorage.removeItem(dismiss[i].getAttribute("value"))
                }
                location.reload()
            })
            let storage = JSON.parse(localStorage.getItem(dismiss[i].getAttribute("value")))
            vaccin[i].addEventListener("click", function() {
                if (storage.vaccin) {
                    vaccin[i].classList.remove("fa-check")
                    vaccin[i].classList.add("fa-xmark")
                    storage.vaccin = false
                    localStorage.setItem(dismiss[i].getAttribute("value"), JSON.stringify(storage))
                } else {
                    vaccin[i].classList.remove("fa-xmark")
                    vaccin[i].classList.add("fa-check")
                    storage.vaccin = true
                    localStorage.setItem(dismiss[i].getAttribute("value"), JSON.stringify(storage))
                }
                location.reload()
            })
            puces[i].addEventListener("click", function() {
                if (storage.puces) {
                    puces[i].classList.remove("fa-check")
                    puces[i].classList.add("fa-xmark")
                    storage.puces = false
                    localStorage.setItem(dismiss[i].getAttribute("value"), JSON.stringify(storage))
                } else {
                    puces[i].classList.remove("fa-xmark")
                    puces[i].classList.add("fa-check")
                    storage.puces = true
                    localStorage.setItem(dismiss[i].getAttribute("value"), JSON.stringify(storage))
                }
                location.reload()
            })
        }

        // Prix total et message
        let spanPrice = document.createElement("span")
        spanPrice.classList.add("underline")
        spanPrice.textContent = "Prix total :"
        let spanEmpty4 = document.createElement("span")
        spanEmpty4.textContent = " "
        let spanPriceValue = document.createElement("span")
        spanPriceValue.textContent = price + "€"
        document.querySelector(".main__cart__price").textContent = ""
        document.querySelector(".main__cart__price").appendChild(spanPrice)
        document.querySelector(".main__cart__price").appendChild(spanEmpty4)
        document.querySelector(".main__cart__price").appendChild(spanPriceValue)
        document.querySelector("#message").textContent += `\nPrix total : ${price}€ \n \n==================== \n \nVotre message : `

        // Vérification du formulaire
        let regexName = new RegExp('[^a-zA-ZÀ-ÿ]')
        let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        let regexMessage = /[a-z0-9\.\-\_]+@[a-z]+\.[a-z]{2,3}$/

        document.querySelector(".main__cart__form__submit").addEventListener("click", function(e) {
            if (regexName.test(document.querySelector("#name").value) || document.querySelector("#name").value.length < 3) {
                document.querySelector("#name").style.border = "3px double red"
                e.preventDefault()
            } else if (!regexEmail.test(document.querySelector("#email").value)) {
                document.querySelector("#name").style.border = "3px double green"
                document.querySelector("#email").style.border = "3px double red"
                e.preventDefault()
            } else if (regexMessage.test(document.querySelector("#message").value) || document.querySelector("#message").value.length < 50) {
                document.querySelector("#name").style.border = "3px double green"
                document.querySelector("#email").style.border = "3px double green"
                document.querySelector("#message").style.border = "3px double red"
                e.preventDefault()
            } else {
                document.querySelector("#name").style.border = "3px double green"
                document.querySelector("#email").style.border = "3px double green"
                document.querySelector("#message").style.border = "3px double green"
                alert("Merci pour votre commande, nous allez revenir vers vous très bientôt !")
                // localStorage.clear()
            }
        })

        console.log("La commande est : " + JSON.stringify(order))
    }
}