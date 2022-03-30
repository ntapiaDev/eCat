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