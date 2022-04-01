import cats from "./cats.js"

// Gestion de la langue
let params = new URLSearchParams(window.location.search)
let lang = ""
if (params.get('lang') !== null) {
    lang = "&lang=" + params.get('lang')
    console.log(lang);
}

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
        document.querySelectorAll(".main__cat a")[i].href = `./cats.php?id=${cats[i].id}${lang}`
        document.querySelectorAll(".main__cat img")[i].src = `./assets/img/${cats[i].id}_small.png`
        document.querySelectorAll(".main__cat__name")[i].textContent = cats[i].name
        document.querySelectorAll(".main__cat__race")[i].textContent = cats[i].race
        document.querySelectorAll(".main__cat__color")[i].textContent = cats[i].color
        document.querySelectorAll(".main__cat__age")[i].textContent = cats[i].age
    }
}

// Page chats-info dynamique
if (document.querySelector(".main__cat-info")) {
    // let id = window.location.search.slice(4)
    let id = params.get('id')
    document.querySelector(".main__cat-info__title").textContent = cats[id - 1].name
    document.querySelector(".main__cat-info__img").src = `./assets/img/${id}.png`
    document.querySelector(".color").textContent = cats[id - 1].color
    document.querySelector(".age").textContent = cats[id - 1].age
    document.querySelector(".race").textContent = cats[id - 1].race
    let price = cats[id - 1].price
    document.querySelector(".price").textContent = price + "€ seulement"
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

    // Mise à jour du prix
    document.querySelector(".main__cat-info__number").value = 1
    document.querySelector("#vaccin").addEventListener("change", setPrice)
    document.querySelector("#puces").addEventListener("change", setPrice)
    document.querySelector(".main__cat-info__number").addEventListener("change", setPrice)
    /**
     * Fonction pour définir le prix des chats en fonction du vaccin et du traitement anti-puces
     */
    function setPrice() {
        if (document.querySelector("#vaccin").checked && document.querySelector("#puces").checked) {
            update(15)
        } else if (document.querySelector("#vaccin").checked) {
            update(5)
        } else if (document.querySelector("#puces").checked) {
            update(10)
        } else {
            update(0)
        }
        /**
         * Fonction pour mettre à jour le prix en fonction du prix en entrée
         * @param {int} value - 0 (aucune sélection), 5 (vaccin), 10 (traitement anti-puces), 15 (vaccin + traitement)
         */
        function update(value) {
            document.querySelector(".price").textContent = parseInt(price * document.querySelector(".main__cat-info__number").value) + value * document.querySelector(".main__cat-info__number").value + "€ seulement"
        }
    }

    /**
     * Fonction pour ajouter un nouveau chat dans le panier
     */
    function addCat() {
        if (document.querySelector(".main__cat-info__number").value > 0) {
            /**
             * Crée un nouveau chat à insérer au panier
             * @constructor
             * @param {int} id - id du chat
             * @param {boolean} statut - vérifie si le chat est disponible ou non
             * @param {boolean} vaccin - vérifie si la vaccination est sélectionnée
             * @param {boolean} puces - vérifie si le traitement anti-puces est sélectionné
             * @param {int} quantity - quantité de jours demandés
             */
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
            let quantity = parseInt(document.querySelector(".main__cat-info__number").value)
            let cat = JSON.stringify(new choosenCat(id, statut, vaccin, puces, quantity))
            localStorage.setItem(id, cat);
        } else {
            alert("Vous n'avez pas sélectionné de quantité valide.")
            document.querySelector(".main__cat-info__btn").parentNode.href = "#"
        }
    }

    // Ajout au panier
    document.querySelector(".main__cat-info__btn").addEventListener("click", addCat)
    document.querySelector(".main__cat-info__number").addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            e.preventDefault()
            addCat()
            location.href = "/cart.php"
        }
    })
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
                let jours = "jour"
                if (storage.quantity > 1) {
                    jours = "jours"
                }
                let quantity = document.querySelector("#quantity")
                let cloneQ = document.importNode(quantity.content, true)
                document.querySelectorAll(".main__cart__cat")[j].appendChild(cloneQ)
                document.querySelectorAll(".main__cart__cat__quant")[j].textContent = storage.quantity + " " + jours

                // Vaccin & puces
                let vaccinInfo = ""
                let pucesInfo = ""
                let vacPuc = document.querySelector("#vac-puc")
                let cloneVP = document.importNode(vacPuc.content, true)
                document.querySelectorAll(".main__cart__cat")[j].appendChild(cloneVP)
                document.querySelectorAll(".vaccination-statut")[j].classList.add("fa-solid")
                document.querySelectorAll(".vaccination-statut")[j].classList.add("fa-vac")
                if (storage.vaccin) {
                    document.querySelectorAll(".vaccination-statut")[j].classList.add("fa-check")
                    price += 5 * storage.quantity
                    vaccinInfo = "vaccination"
                } else {
                    document.querySelectorAll(".vaccination-statut")[j].classList.add("fa-xmark")
                }
                document.querySelectorAll(".puces-statut")[j].classList.add("fa-solid")
                document.querySelectorAll(".puces-statut")[j].classList.add("fa-puc")
                if (storage.puces) {
                    document.querySelectorAll(".puces-statut")[j].classList.add("fa-check")
                    price += 10 * storage.quantity
                    pucesInfo = "traitement anti-puces"
                } else {
                    document.querySelectorAll(".puces-statut")[j].classList.add("fa-xmark")
                }

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
            let storage = JSON.parse(localStorage.getItem(dismiss[i].getAttribute("value")))
            // Supprimer
            dismiss[i].addEventListener("click", function() {
                localStorage.removeItem(dismiss[i].getAttribute("value"))
                location.reload()
            })
            // Ajouter une quantité
            add[i].addEventListener("click", function() {
                storage.quantity = parseInt(storage.quantity) + 1
                localStorage.setItem(dismiss[i].getAttribute("value"), JSON.stringify(storage))
                location.reload()
            })
            // Retirer une quantité
            remove[i].addEventListener("click", function() {
                if (storage.quantity > 1) {
                    storage.quantity = parseInt(storage.quantity) - 1
                    localStorage.setItem(dismiss[i].getAttribute("value"), JSON.stringify(storage))
                } else {
                    localStorage.removeItem(dismiss[i].getAttribute("value"))
                }
                location.reload()
            })
            // Modification du vaccin
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
            // Modification du traitement anti-puces
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
        let displayPrice = document.querySelector("#price")
        let clone = document.importNode(displayPrice.content, true)
        document.querySelector(".main__cart__price").textContent = ""
        document.querySelector(".main__cart__price").appendChild(clone)
        document.querySelector(".price").textContent = " " + price + "€"
        document.querySelector("#message").textContent += `\nPrix total : ${price}€ \n \n==================== \n \nVotre message : `

        // Contrôle du formulaire
        let textareaLength = document.querySelector("#message").value.length
        /**
         * Fonction pour la vérification des champs utilisateurs envoyés via regex
         * @param {string} e - event pour faire un preventDefault en cas d'échec 
         * @returns Un booléen définissant le succès ou l'échec de la vérification
         */
        function regex(e) {
            let valid = true
            let regexName = /[^a-zA-ZÀ-ÿ]/
            let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
            let regexMessage = /[a-z0-9\.\-\_]+@[a-z]+\.[a-z]{2,3}$/
            
            // Controle du nom
            if (regexName.test(document.querySelector("#name").value) || document.querySelector("#name").value.length < 3) {
                document.querySelector("#name").style.border = "3px double red"
                document.querySelector(".label-name").textContent = "Merci de rentrer un nom valide (3 caractères minimum)"
                valid = false
                e.preventDefault()
            } else {
                document.querySelector("#name").style.border = "3px double green"
                document.querySelector(".label-name").textContent = ""
            }
            // Controle de l'adresse email
            if (!regexEmail.test(document.querySelector("#email").value)) {
                document.querySelector("#email").style.border = "3px double red"
                document.querySelector(".label-email").textContent = "Merci de rentrer une adresse valide"
                valid = false
                e.preventDefault()
            } else {
                document.querySelector("#email").style.border = "3px double green"
                document.querySelector(".label-email").textContent = ""
            }
            // Controle du message
            if (regexMessage.test(document.querySelector("#message").value) || document.querySelector("#message").value.length < textareaLength + 10) {
                document.querySelector("#message").style.border = "3px double red"
                document.querySelector(".label-message").textContent = "Merci de nous laisser un message complémentaire (10 caractères minimum)"
                valid = false
                e.preventDefault()
            } else {
                document.querySelector("#message").style.border = "3px double green"
                document.querySelector(".label-message").textContent = ""
            }
            return valid
        }

        // Préparation du message
        /**
         * Fonction qui récupère le contenu des champs du formulaire, les stock et renvoie les données dans la commande (order)
         */
        function sendMessage() {
            let name = document.querySelector("#name").value
            let email = document.querySelector("#email").value
            let content = document.querySelector("#message").value
            let message = [name, email, content]
            order.push(message)
        }

        // Envoi du panier
        document.querySelector(".main__cart__form__submit").addEventListener("click", function(e) {
            let isValid = regex(e)
            if (isValid) {
                sendMessage()
                console.log("La commande est : " + JSON.stringify(order))
                alert("Merci pour votre commande, nous allons revenir vers vous très prochainement !")
                localStorage.clear()
            }
        })
    }
}