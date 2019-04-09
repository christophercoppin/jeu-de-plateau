import {
    elements
} from './base';

export const reduirePointsDeVie = (adversaire, pointsDeVie, i, timeout) => {

    setTimeout(function () {
        $(`.joueur-${adversaire.id + 1}-log .pv-bar span`).text(`${pointsDeVie - i} pv`);
    }, timeout * i);
    $(`.joueur-${adversaire.id + 1}-log progress`).attr('value', adversaire.pointsDeVie);
}

export const turnToFightMode = (activePlayer) => {
    $(`.joueur-${activePlayer + 1}-log .combat`).removeClass('hidden');
}