import {
    elements
} from './base';

export const creationCarte = ( nombreDeCasesHorizontal = 10, nombreDeCasesVertical = 10) => {

/* <div class="case case--1-1" data-caseY="1" data-caseX="1"></div> */

    const carteElement = document.createElement('div');
    $(carteElement).addClass('carte');
    
    for( let ligne = 1; ligne <= nombreDeCasesVertical; ligne++) {
        for( let colonne = 1; colonne <= nombreDeCasesHorizontal; colonne++) {
            const casesElement = document.createElement('div');
            $(casesElement).addClass(`case`).attr({
                'data-casex': colonne,
                'data-casey': ligne}).appendTo(carteElement);
        }
    }

    $(carteElement).appendTo('.plateau');

    if( nombreDeCasesHorizontal !== 10 || nombreDeCasesVertical !== 10) {
        document.querySelector('.carte').style.gridTemplateRows = `repeat(${nombreDeCasesHorizontal}, ${100 / nombreDeCasesHorizontal}%)`;
        document.querySelector('.carte').style.gridTemplateColumns = `repeat(${nombreDeCasesVertical}, minmax(${100 / nombreDeCasesHorizontal}%, ${100 / nombreDeCasesHorizontal}%))`;
    }

}

export const initialisationMouvements = (activePlayer) => {

    $(`.joueur-${activePlayer}`).addClass('joueur-actif');
    $('.choix-possible').removeClass('choix-possible');

    let activePlayerCell = $(`.joueur-${activePlayer}`).data();
    const activePlayerCellX = activePlayerCell.casex;
    const activePlayerCellY = activePlayerCell.casey;
    
    const directions = ['gauche', 'droite', 'haut', 'bas']
    
    for ( let direction of directions ) {
        let caseX = activePlayerCellX;
        let caseY = activePlayerCellY;
        
        
        for (let i = 1; i <= 3; i++) {

            switch (direction) {
                case 'gauche':
                    caseX = activePlayerCellX + i;
                    break;
                case 'droite':
                    caseX = activePlayerCellX - i;
                    break;
                case 'haut':
                    caseY = activePlayerCellY + i;
                    break;
                case 'bas':
                    caseY = activePlayerCellY - i;
                    break;
                default:
                    break;
            }
            
            if ($(`[data-casex="${caseX}"][data-casey="${caseY}"]`).hasClass('wall') || $(`[data-casex="${caseX}"][data-casey="${caseY}"]`).is('[class*=joueur-]')) {
                break;
            } else {
                $(`[data-casex="${caseX}"][data-casey="${caseY}"]`).addClass('choix-possible');
            }
        }
    }

}

export const afficherMurs = (coordonneesMurs) => {
    for ( let coordonneesMur of coordonneesMurs) {
        $(`[data-casex="${coordonneesMur[0]}"][data-casey="${coordonneesMur[1]}"]`).html('<img src="img/300w/wall.png" alt="">').addClass('wall');
    }
}

export const controleAccessible = (coordonneesArmes, positionJoueur2X, positionJoueur2Y) => {

    let armesTrouve, personnageTrouve;

    for (const arme of coordonneesArmes) {
        if($(`[data-casex="${arme[0]}"][data-casey="${arme[1]}"]`).hasClass('checked')) {
            armesTrouve = true;
        } else {
            armesTrouve = false;
            break;
        }
    }

    if($(`[data-casex="${positionJoueur2X}"][data-casey="${positionJoueur2Y}"]`).hasClass('checked')) {
        personnageTrouve = true;
    } else {
        personnageTrouve = false;
    }

    if(armesTrouve && personnageTrouve) {
        $('.checked').removeClass('checked');
        return false; 
    } else {

        $('.checked').removeClass('checked');
        return true;
    }
}

export const controleCases = (positionX, positionY) => {

    const positionXAvant = parseInt(positionX) - 1;
    const positionXApres = parseInt(positionX) + 1;
    const positionYAvant = parseInt(positionY) - 1;
    const positionYApres = parseInt(positionY) + 1;

    $(`[data-casex="${positionX}"][data-casey="${positionY}"]`).addClass('checked');

    const positionTop = $(`[data-casex="${positionXAvant}"][data-casey="${positionY}"]`);
    const positionBottom = $(`[data-casex="${positionXApres}"][data-casey="${positionY}"]`);
    const positionLeft = $(`[data-casex="${positionX}"][data-casey="${positionYAvant}"]`);
    const positionRight = $(`[data-casex="${positionX}"][data-casey="${positionYApres}"]`);

        if($(positionTop).length !== 0 && !$(positionTop).hasClass('checked')) {

            if($(positionTop).hasClass('wall')) {
                console.log(positionTop);
            } else {
                controleCases($(positionTop).attr('data-casex'), $(positionTop).attr('data-casey'));
            }
        }
        
        if($(positionBottom).length !== 0 && !$(positionBottom).hasClass('checked')) {

            if($(positionBottom).hasClass('wall')) {
                console.log(positionBottom);
            } else {
                controleCases($(positionBottom).attr('data-casex'), $(positionBottom).attr('data-casey'));
            }
        }

        if($(positionLeft).length !== 0 && !$(positionLeft).hasClass('checked')) {

            if($(positionLeft).hasClass('wall')) {
                console.log(positionLeft);
            } else {
                controleCases($(positionLeft).attr('data-casex'), $(positionLeft).attr('data-casey'));
        }
    }

        if($(positionRight).length !== 0 && !$(positionRight).hasClass('checked')) {

            if($(positionRight).hasClass('wall')) {
                console.log(positionRight);
            } else {
                controleCases($(positionRight).attr('data-casex'), $(positionRight).attr('data-casey'));
        }
    }
}

export const definirDirectionPersonnage = () => {
    const posJoueur1 = [$('.joueur-0').data().casex, $('.joueur-0').data().casey];
    const posJoueur2 = [$('.joueur-1').data().casex, $('.joueur-1').data().casey];

    if (posJoueur1[0] > posJoueur2[0] || (posJoueur1[0] === posJoueur2[0] && posJoueur1[1] > posJoueur2[1])) {
        console.log('tu dois regarder a gauche');
        console.log(`${posJoueur1[1]} <= ${posJoueur2[1]}`);
        $('.joueur-0').addClass('direction-gauche');
        $(`.joueur-1`).removeClass('direction-gauche');
    } else {
        $('.joueur-0').removeClass('direction-gauche');
        $('.joueur-1').addClass('direction-gauche');
    }
}

export const afficherArmes = (nombreArme, coordonneesArmes) => {

    $('.weapon').empty().removeClass('weapon');

    for (let i = 0; i < nombreArme; i++) {

        const choixArme = random(4, 2);

        $(`[data-casex="${coordonneesArmes[i][0]}"][data-casey="${coordonneesArmes[i][1]}"]`).html(`<img src="img/300w/weapon-${choixArme}.png" alt="">`).addClass('weapon').data('id-arme', choixArme);
    }
}

export const afficherPersonnage = (coordonneesPersonnage, personnageChoisi, i) => {

    $(`.joueur-${i}`).empty().removeClass(`joueur-${i}`)
    $(`[data-casex="${coordonneesPersonnage[0]}"][data-casey="${coordonneesPersonnage[1]}"]`).html(`<img src="img/300w/orc-${personnageChoisi}--weapon-1.png" alt="">`).addClass(`joueur-${i}`);
}

export const assignerArme = (caseActive, activePlayer, joueur) => {
    if (joueur.idAncienneArme !== '') {
        $(`.joueur-actif`).html(`<img src="img/300w/weapon-${joueur.idAncienneArme}.png" alt="">`).addClass('weapon').data('id-arme', joueur.idAncienneArme);

        joueur.idAncienneArme = '';
    }
    
    $('.joueur-actif').removeClass(`joueur-actif joueur-${activePlayer} direction-gauche direction-droite`);

    if ($(caseActive).hasClass('weapon')) {
        joueur.assignerArme($(caseActive).data('id-arme'), joueur.personnage.arme.idArme);

        $(`.joueur-${activePlayer + 1}-log .perso`).css('background-image', `url("img/orc-${joueur.personnage.idPersonnages}--weapon-${joueur.personnage.arme.idArme}-attaque.png")`);

        $(caseActive).removeClass('weapon');
    }
}

const random = (total, min) => {
    return Math.floor(Math.random() * total) + min;
}