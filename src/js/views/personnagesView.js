
export const initialiserAffichagePersonnage = (joueurs, personnagesChoisi, i) => {
    $(`.joueur-${i + 1}-log h2`).text(joueurs[i].personnage.nom);
    etatInitialPersonnage(joueurs, i);
    
    $(`.joueur-${i + 1}-log progress`).attr('value', joueurs[i].pointsDeVie);
    $(`.joueur-${i + 1}-log .pv-bar span`).text(`${joueurs[i].pointsDeVie} pv`);
}

export const etatInitialPersonnage = (joueurs, activePlayer) => {
    $(`.joueur-${activePlayer + 1}-log .perso`).removeClass('degats defense');
    $(`.joueur-${activePlayer + 1}-log .perso`).css('background-image', `url("img/orc-${joueurs[activePlayer].personnage.idPersonnages}--weapon-${joueurs[activePlayer].personnage.arme.idArme}-attaque.png")`);
}

export const animationAttaque = (adversaire, activePlayer) => {
    $(`.joueur-${adversaire + 1}-log .perso`).removeClass('defense');

    $(`.joueur-${activePlayer + 1}-log .perso`).addClass('attaque');
    setTimeout(() => {
        $(`.joueur-${activePlayer + 1}-log .perso`).removeClass('attaque');
    }, 2000); 
}

export const animePersonnage = (joueurs, activePlayer, animation) => {
    $(`.joueur-${activePlayer + 1}-log .perso`).css('background-image', `url("img/orc-${joueurs[activePlayer].personnage.idPersonnages}--${animation}.png")`);
    $(`.joueur-${activePlayer + 1}-log .perso`).addClass(animation);
}