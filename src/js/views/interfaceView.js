
export const reduirePointsDeVie = (adversaire, pointsDeVie, degats, timeout) => {
    for(let i = 1; i <= degats; i++) {
    setTimeout(function () {
        $(`.joueur-${adversaire.id + 1}-log .pv-bar span`).text(`${pointsDeVie - i} pv`);
    }, timeout * i);
    $(`.joueur-${adversaire.id + 1}-log progress`).attr('value', adversaire.pointsDeVie);
}
}

export const turnToFightMode = (activePlayer) => {
    $(`.joueur-${activePlayer + 1}-log .combat`).removeClass('hidden');
}

export const animationVictoire = (activePlayer, joueurs) => { 
    return new Promise((resolve, reject) => {
        console.log(joueurs[activePlayer]);
        $('.fin-jeu').html(`<p>${joueurs[activePlayer].personnage.nom}<br/>Gagne!!</p>`);
        $('.fin-jeu').toggleClass('hidden');

        $('.fin-jeu').animate({
            fontSize: "70px",
            opacity: "1"
        }, 700);


            $('.fin-jeu').animate({
                fontSize: "30px"
            }, 500).animate({
                fontSize: "50px"
            }, 500 ).animate({
                fontSize: "30px"
            }, 500).animate({
                fontSize: "50px"
            }, 500 ).animate({
                fontSize: "30px"
            }, 500).animate({
                fontSize: "50px"
            }, 500 ).animate({
                fontSize: "30px"
            }, 500).animate({
                fontSize: "50px"
            }, 500, () => {
                $('.reload').removeClass('hidden');
                resolve('done');
            } );        
        
    })
}

export const visibiliteCommandes = (activePlayer) => {
    $(`.joueur-${activePlayer + 1}-log .combat`).toggleClass('hidden');
}