import Personnages from "./Personnages";

export default class Joueurs {
  constructor(idJoueur) {
    this.id = idJoueur;
    this.pointsDeVie = 100;
    this.attaque = 10;
    this.defense = false;
  }

  assignerPersonnage(idPersonnage) {
    this.personnage = new Personnages(idPersonnage);
  }

  assignerArme(idArme, idAncienneArme = "") {
    this.idArme = idArme;
    this.personnage.assignerNouvelleArme(idArme);
    this.idAncienneArme = idAncienneArme;
  }

  assignerPosition(position) {
    this.position = position;
  }

  estProche(coordonnees) {
    console.log(this.position);
    console.log(coordonnees);

    if (
      (this.position[0] === coordonnees[0] &&
        this.position[1] === coordonnees[1] + 1) ||
      (this.position[0] === coordonnees[0] &&
        this.position[1] === coordonnees[1] - 1) ||
      (this.position[0] === coordonnees[0] + 1 &&
        this.position[1] === coordonnees[1]) ||
      (this.position[0] === coordonnees[0] - 1 &&
        this.position[1] === coordonnees[1])
    ) {
      return true;
    } else {
      return false;
    }
  }
}
