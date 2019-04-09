import {
    elements
} from './base';

export const reduirePointsDeVie = (adversaire, pointsDeVie, i, timeout) => {

    setTimeout(function () {
        $(`.joueur-${adversaire + 1}-log .pv-bar span`).text(`${pointsDeVie - i} pv`);
    }, timeout * i);
}