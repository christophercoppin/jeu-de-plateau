
export const reduirePointsDeVie = (adversaire, pointsDeVie, i, timeout) => {

    setTimeout(function () {
        $(`.joueur-${adversaire.id + 1}-log .pv-bar span`).text(`${pointsDeVie - i} pv`);
    }, timeout * i);
    $(`.joueur-${adversaire.id + 1}-log progress`).attr('value', adversaire.pointsDeVie);
}

export const turnToFightMode = (activePlayer) => {
    $(`.joueur-${activePlayer + 1}-log .combat`).removeClass('hidden');
}

export const animationVictoire = (activePlayer, joueurs) => { 
    return new Promise((resolve, reject) => {
        console.log(joueurs[activePlayer]);
        $('.fin-jeu').text(`${joueurs[activePlayer].personnage.nom} Gagne!!`);
        $('.fin-jeu').toggleClass('hidden');

        $('.fin-jeu').animate({
            fontSize: "70px",
            opacity: "1"
        }, 700);

        for (let i = 0; i < 6; i++) {

            $('.fin-jeu').animate({
                fontSize: "30px"
            }, 500).animate({
                fontSize: "50px"
            }, 500);
            
        }
                
        setTimeout(() => {
            $('.reload').removeClass('hidden');
            resolve('done');
        },2000);
        
    })
}

export const visibiliteCommandes = (activePlayer) => {
    $(`.joueur-${activePlayer + 1}-log .combat`).toggleClass('hidden');
}