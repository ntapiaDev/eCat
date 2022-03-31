/**
 * Permet de générer de nouveaux chats
 * @constructor
 * @param {int} id - L'id du chat, génère l'id de la page du chat
 * @param {string} name - Le nom du chat
 * @param {string} race - La race du chat
 * @param {string} color - La couleur du chat
 * @param {string} age - L'âge du chat
 * @param {int} price - Le prix du chat
 * @param {boolean} statut - Définit si le chat est disponible
 */
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

/**
 * Tableau regroupant l'ensemble des chats de l'API
 */
let cats = [
    new Cat(1, "Gribouille", "Main coon", "gris", "8 ans", "12", true),
    new Cat(2, "Simba", "Sphynx", "roux", "1 an et demi", "25", true),
    new Cat(3, "Nala", "Bengal", "blanc", "2 mois", "30", false),
    new Cat(4, "Tigrou", "bengal", "tigré", "2 ans", "18", true),
    new Cat(5, "Maya", "Ragdoll", "gris", "6 mois", "15", true),
    new Cat(6, "Chipie", "Savannah", "écaille de tortue", "3 ans", "10", false),
    new Cat(7, "Filou", "Bleu russe", "blanc", "4 mois", "22", true),
    new Cat(8, "Caramel", "Main coon", "roux", "5 ans et demi", "30", true),
    new Cat(9, "Merlin", "Angora", "noir et blanc", "1 ans", "15", true)
]

export default cats