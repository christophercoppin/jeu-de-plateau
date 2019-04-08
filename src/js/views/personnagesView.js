import {
    elements
} from './base';

export const initialiserAffichagePersonnage = (joueurs, personnagesChoisi, i) => {
    $(`.joueur-${i + 1}-log h2`).text(joueurs[i].personnage.nom);
    $(`.joueur-${i + 1}-log .perso`).css('background-image', `url("img/orc-${personnagesChoisi[i]}--weapon-1-attaque.png")`);
    
    $(`.joueur-${i + 1}-log progress`).attr('value', joueurs[i].pointsDeVie);
    $(`.joueur-${i + 1}-log .pv-bar span`).text(`${joueurs[i].pointsDeVie} pv`);
}