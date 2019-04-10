import { rejects } from "assert";

export const initialiserAffichagePersonnage = (joueurs, personnagesChoisi, i) => {
    $(`.joueur-${i + 1}-log h2`).text(joueurs[i].personnage.nom);
    etatInitialPersonnage(joueurs[i]);
    
    $(`.joueur-${i + 1}-log progress`).attr('value', joueurs[i].pointsDeVie);
    $(`.joueur-${i + 1}-log .pv-bar span`).text(`${joueurs[i].pointsDeVie} pv`);
}

export const etatInitialPersonnage = (joueur) => {
    $(`.joueur-${joueur.id + 1}-log .perso`)
        .removeClass('degats defense')
        .css('background-image', `url("img/orc-${joueur.personnage.idPersonnages}--weapon-${joueur.personnage.arme.idArme}-attaque.png")`);
}

export const animationAttaque = (adversaire, activePlayer) => {
    return new Promise((resolve, reject) => {
        $(`.joueur-${adversaire + 1}-log .perso`).removeClass('defense');
    
        $(`.joueur-${activePlayer + 1}-log .perso`).addClass('attaque').one('webkitAnimationend oAnimationEnd msAnimationEnd animationend',   
        function(e) {

            $(`.joueur-${activePlayer + 1}-log .perso`).removeClass('attaque');
            resolve('done');
      });
    });
}

export const animePersonnage = (joueur, animation) => {
    $(`.joueur-${joueur.id + 1}-log .perso`)
    .css('background-image', `url("img/orc-${joueur.personnage.idPersonnages}--${animation}.png")`)
    .addClass(animation);
}