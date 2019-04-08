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