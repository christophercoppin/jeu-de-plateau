import Armes from "./Armes";

const puissances = [];

for(let i = 0; i < 4; i++) {
    const puissance = Math.floor(Math.random() * 10) + 11;
    let controleDoublon = false;

    puissances.forEach(element => {
        if (element === puissance) {
            i--;
            controleDoublon = true;
        }
    });

    if( !controleDoublon) {
        puissances.push(puissance);
    }
}

export default class Personnages {
    constructor ( idPersonnages, nom = `Joueur ${idPersonnages}`, ancienneArme = '') {
        this.idPersonnages = idPersonnages;
        this.nom = nom ;
        this.ancienneArme = ancienneArme;
    }

    assignerNouvelleArme(idArme) {
        let puissance;

        switch (idArme) {
            case 1:
                puissance = 10;
                break;
            case 2:
            puissance = puissances[0];
                break;
            case 3:
            puissance = puissances[1];
                break;
            case 4:
            puissance = puissances[2];
                break;
            case 5:
            puissance = puissances[3];;
                break;
        
            default:
                break;
        }

        this.ancienneArme = this.idArme;
        

        this.adressePng = `<img src="img/300w/orc-${this.idPersonnages}--weapon-${idArme}.png" alt="">`;
        this.arme = new Armes(idArme, puissance);
    }
}