

export default class Armes {
    constructor ( idArme = 1, puissance) {
        this.idArme = idArme;
        this.puissance = puissance ;
        this.adressePng = `img/300w/weapon-${idArme}.png`;
    }
}