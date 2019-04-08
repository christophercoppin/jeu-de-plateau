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

}

export const initialisationMouvements = (activePlayer) => {
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