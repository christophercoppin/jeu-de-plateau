import "../sass/main.scss";
import Joueur from "./models/Joueurs";

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}


let activePlayer = 0;
/* const persoJoueur1 = `<img src="img/300w/orc-1--weapon-2.png" alt="">`;
const persoJoueur2 = `<img src="img/300w/orc-2--weapon-1.png" alt="">`; */
const coordonneesMurs = [];
const coordonneesArmes = [];
const coordonneesPersonnages = [];
const ensembleCoordonnees = [coordonneesMurs, coordonneesArmes, coordonneesPersonnages];

const joueur1 = new Joueur(1);
const joueur2 = new Joueur(2);
const joueurs = [joueur1, joueur2];

/* if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  } */




$(window).on('load', function () {
        $('.chargement').removeClass('chargement-en-cours');
        console.log('Chargement termine');;

});

$(document).ready(() => {

    const initialiationMouvements = () => {
        $('.choix-possible').removeClass('choix-possible');

        let activePlayerCell = $(`.joueur-${activePlayer}`).data();

        for (let i = 1; i <= 3; i++) {
            var negativeX = activePlayerCell.casex - i;
            if ($(`[data-casex="${negativeX}"][data-casey="${activePlayerCell.casey}"]`).hasClass('wall') || $(`[data-casex="${negativeX}"][data-casey="${activePlayerCell.casey}"]`).is('[class*=joueur-]')) {
                break;
            } else {
                $(`[data-casex="${negativeX}"][data-casey="${activePlayerCell.casey}"]`).addClass('choix-possible');
            }
        }

        for (let i = 1; i <= 3; i++) {
            var positiveX = activePlayerCell.casex + i;
            if ($(`[data-casex="${positiveX}"][data-casey="${activePlayerCell.casey}"]`).hasClass('wall') || $(`[data-casex="${positiveX}"][data-casey="${activePlayerCell.casey}"]`).is('[class*=joueur-]')) {
                break;
            } else {
                $(`[data-casex="${positiveX}"][data-casey="${activePlayerCell.casey}"]`).addClass('choix-possible');
            }
        }

        for (let i = 1; i <= 3; i++) {
            var negativeY = activePlayerCell.casey - i;
            if ($(`[data-casex="${activePlayerCell.casex}"][data-casey="${negativeY}"]`).hasClass('wall') || $(`[data-casex="${activePlayerCell.casex}"][data-casey="${negativeY}"]`).is('[class*=joueur-]')) {
                break;
            } else {
                $(`[data-casex="${activePlayerCell.casex}"][data-casey="${negativeY}"]`).addClass('choix-possible');
            }
        }

        for (let i = 1; i <= 3; i++) {
            var positiveY = activePlayerCell.casey + i;
            if ($(`[data-casex="${activePlayerCell.casex}"][data-casey="${positiveY}"]`).hasClass('wall') || $(`[data-casex="${activePlayerCell.casex}"][data-casey="${positiveY}"]`).is('[class*=joueur-]')) {
                break;
            } else {
                $(`[data-casex="${activePlayerCell.casex}"][data-casey="${positiveY}"]`).addClass('choix-possible');
            }
        }
    }

    const coordonneesAleatoires = () => {
        const coordonnees = [];

        const x = Math.floor(Math.random() * 10) + 1;
        const y = Math.floor(Math.random() * 10) + 1;

        coordonnees.push(x);
        coordonnees.push(y);

        return coordonnees;
    }

    const nombreMur = Math.floor(Math.random() * 6) + 20;
    const nombreArme = Math.floor(Math.random() * 3) + 3;


    const assignerCoordonnees = (nombreCoordonnees, tableauCoordonnees) => {

        for (let i = 0; i < nombreCoordonnees; i++) {
            const coordonnees = coordonneesAleatoires();


            if (coordonneesMurs.length > 0) {
                var doubleTrouve = false;
                for (let ensembleCoordonnee of ensembleCoordonnees) {

                    for (let coordonneesMur of ensembleCoordonnee) {


                        if (coordonneesMur[0] === coordonnees[0] && coordonneesMur[1] === coordonnees[1]) {
                            /*   i--; */
                            doubleTrouve = true;
                            break;
                        }

                    }
                    if (doubleTrouve) {
                        break;
                    }
                }

                if (doubleTrouve) {
                    i--;
                } else {
                    tableauCoordonnees.push(coordonnees);
                }

            } else {
                tableauCoordonnees.push(coordonnees);
            }



        }
    }



    assignerCoordonnees(nombreMur, coordonneesMurs);


    for (let i = 0; i < nombreMur; i++) {
        $(`[data-casex="${coordonneesMurs[i][0]}"][data-casey="${coordonneesMurs[i][1]}"]`).html('<img src="img/300w/wall.png" alt="">').addClass('wall');
    }

    assignerCoordonnees(nombreArme, coordonneesArmes);


    for (let i = 0; i < nombreArme; i++) {

        const choixArme = Math.floor(Math.random() * 4) + 2;

        $(`[data-casex="${coordonneesArmes[i][0]}"][data-casey="${coordonneesArmes[i][1]}"]`).html(`<img src="img/300w/weapon-${choixArme}.png" alt="">`).addClass('weapon').data('id-arme', choixArme);
    }

    assignerCoordonnees(2, coordonneesPersonnages);
    const personnagesChoisi = [];
    const personnageChoisi1 = Math.floor(Math.random() * 3) + 1;
    let personnageChoisi2 = Math.floor(Math.random() * 3) + 1;

    while (personnageChoisi1 === personnageChoisi2) {
        personnageChoisi2 = Math.floor(Math.random() * 3) + 1;
    }

    personnagesChoisi.push(personnageChoisi1);
    personnagesChoisi.push(personnageChoisi2);

    for (let i = 0; i < 2; i++) {

        let premierEssai = true;

        joueurs[i].assignerPosition(coordonneesPersonnages[i]);

        


        joueurs[i].assignerPersonnage(personnagesChoisi[i]);

        switch (personnagesChoisi[i]) {
            case 1:
                joueurs[i].personnage.nom = 'Stanislas';
                break;
            case 2:
                joueurs[i].personnage.nom = 'Christopher';
                break;
            case 3:
                joueurs[i].personnage.nom = 'Benoit';

                break;

            default:
                joueurs[i].personnage.nom = `Joueur ${i + 1}`;
                break;
        }

        joueurs[i].assignerArme(1);

        $(`.joueur-${i + 1}-log h2`).text(joueurs[i].personnage.nom);

        /* $(`.orc-${personnagesChoisi[i]}--svg-weapon`).html($(`#weapon-1`).html());
        $(`.joueur-${i + 1}-log use`).attr('xlink:href', `#orc-${personnagesChoisi[i]}`); */
        $(`.joueur-${i + 1}-log .perso`).css('background-image', `url("img/orc-${personnagesChoisi[i]}--weapon-1-attaque.png")`);
        console.log(personnagesChoisi[i]);
        console.log(`.joueur-${i + 1}-log .perso`);

        $(`.joueur-${i + 1}-log progress`).attr('value', joueurs[i].pointsDeVie);
        $(`.joueur-${i + 1}-log .pv-bar span`).text(`${joueurs[i].pointsDeVie} pv`);

        $(`[data-casex="${coordonneesPersonnages[i][0]}"][data-casey="${coordonneesPersonnages[i][1]}"]`).html(`<img src="img/300w/orc-${personnagesChoisi[i]}--weapon-1.png" alt="">`).addClass(`joueur joueur-${i}`);
    }

    const positionPersonnages = () => {
        const positionJoueur1X = joueurs[0].position[0];
        const positionJoueur1Y = joueurs[0].position[1];
        const positionJoueur2X = joueurs[1].position[0];
        const positionJoueur2Y = joueurs[1].position[1];
        let personnagesProches;

        console.log(joueurs[0].position);
        console.log(joueurs[1].position);

        if ((positionJoueur1X === positionJoueur2X && (positionJoueur1Y === positionJoueur2Y + 1 || positionJoueur1Y === positionJoueur2Y - 1)) || (positionJoueur1Y === positionJoueur2Y && (positionJoueur1X === positionJoueur2X + 1 || positionJoueur1X === positionJoueur2X - 1)) || (positionJoueur1X === positionJoueur2X + 1 && (positionJoueur1Y === positionJoueur2Y + 1 || positionJoueur1Y === positionJoueur2Y - 1)) || (positionJoueur1X === positionJoueur2X - 1 && (positionJoueur1Y === positionJoueur2Y + 1 || positionJoueur1Y === positionJoueur2Y - 1))) {
            console.log('les personnages sont trop proches');
            return personnagesProches = true;
        } else {
            console.log('les personnages ne sont pas trop proches');
        }

        controleCases(positionJoueur1X, positionJoueur1Y);

        let armesTrouve;
        let personnageTrouve;

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

        console.log(armesTrouve);
        console.log(personnageTrouve);

        if(armesTrouve && personnageTrouve) {
            return personnagesProches = false; 
        } else {

            $('.checked').removeClass('checked');
            return personnagesProches = true;
        }
        
    }

    const controleCases = (positionX, positionY) => {

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
                    console.log('Il y a une case libre au dessus de la case ' + positionX + ',' + positionY);
                    controleCases($(positionTop).attr('data-casex'), $(positionTop).attr('data-casey'));
                }
            }
            
            if($(positionBottom).length !== 0 && !$(positionBottom).hasClass('checked')) {

                if($(positionBottom).hasClass('wall')) {
                    console.log(positionBottom);
                } else {
                    console.log('Il y a une case libre au dessous de la case ' + positionX + ',' + positionY);
                    controleCases($(positionBottom).attr('data-casex'), $(positionBottom).attr('data-casey'));
                }
            }

            if($(positionLeft).length !== 0 && !$(positionLeft).hasClass('checked')) {

                if($(positionLeft).hasClass('wall')) {
                    console.log(positionLeft);
                } else {
                    console.log('Il y a une case libre a gauche de la case ' + positionX + ',' + positionY);
                    controleCases($(positionLeft).attr('data-casex'), $(positionLeft).attr('data-casey'));
            }
        }

            if($(positionRight).length !== 0 && !$(positionRight).hasClass('checked')) {

                if($(positionRight).hasClass('wall')) {
                    console.log(positionRight);
                } else {
                    console.log('Il y a une case libre a droite de la case ' + positionX + ',' + positionY);
                    controleCases($(positionRight).attr('data-casex'), $(positionRight).attr('data-casey'));
            }
        }
    }

    
    while(positionPersonnages()) {


        coordonneesPersonnages.length = 0;
        assignerCoordonnees(2, coordonneesPersonnages);

        for(let i = 0; i < 2; i++) {
            joueurs[i].assignerPosition(coordonneesPersonnages[i]);
            console.log('La position des personnages à été modifié');

            $(`.joueur-${i}`).empty().removeClass(`joueur joueur-${i}`)

            $(`[data-casex="${coordonneesPersonnages[i][0]}"][data-casey="${coordonneesPersonnages[i][1]}"]`).html(`<img src="img/300w/orc-${personnagesChoisi[i]}--weapon-1.png" alt="">`).addClass(`joueur joueur-${i}`);
        }

        coordonneesArmes.length = 0;
        assignerCoordonnees(nombreArme, coordonneesArmes);
        console.log('nombre arme' + nombreArme);
        $('.weapon').empty().removeClass('weapon');

        for (let i = 0; i < nombreArme; i++) {
            
    
            const choixArme = Math.floor(Math.random() * 4) + 2;
    
            $(`[data-casex="${coordonneesArmes[i][0]}"][data-casey="${coordonneesArmes[i][1]}"]`).html(`<img src="img/300w/weapon-${choixArme}.png" alt="">`).addClass('weapon').data('id-arme', choixArme);
        } 

    console.log(coordonneesPersonnages);
    }

    const posJoueurActif = [$('.joueur-0').data().casex, $('.joueur-0').data().casey];
    const posAdversaire = [$('.joueur-1').data().casex, $('.joueur-1').data().casey];

    if (posJoueurActif[1] > posAdversaire[1] || (posJoueurActif[1] === posAdversaire[1] && posJoueurActif[0] > posAdversaire[0])) {
        console.log('tu dois regarder a gauche');
        console.log(`${posJoueurActif[1]} <= ${posAdversaire[1]}`);
        $('.joueur-0').addClass('direction-gauche');
        $(`.joueur-1`).removeClass('direction-gauche');
    } else {
        $('.joueur-0').removeClass('direction-gauche');
        $('.joueur-1').addClass('direction-gauche');
    }

    $('.joueur-0').addClass('joueur-actif');
    initialiationMouvements();

    $('.plateau').on('click', '.choix-possible', function (e) {


        let adversaire = activePlayer === 1 ? adversaire = 0 : adversaire = 1;
        $('.joueur-actif').empty();

        if (joueurs[activePlayer].idAncienneArme !== '') {
            $(`.joueur-actif`).html(`<img src="img/300w/weapon-${joueurs[activePlayer].idAncienneArme}.png" alt="">`).addClass('weapon').data('id-arme', joueurs[activePlayer].idAncienneArme);




            joueurs[activePlayer].idAncienneArme = '';
        }

        $('.joueur-actif').removeClass(`joueur-actif joueur-${activePlayer}`);

        if ($(this).hasClass('weapon')) {
            joueurs[activePlayer].assignerArme($(this).data('id-arme'), joueurs[activePlayer].personnage.arme.idArme);

            $(`.joueur-${activePlayer + 1}-log .perso`).css('background-image', `url("img/orc-${joueurs[activePlayer].personnage.idPersonnages}--weapon-${joueurs[activePlayer].personnage.arme.idArme}-attaque.png")`);

            $(this).removeClass('weapon');
        }





        $(this).addClass(`joueur-${activePlayer}`);
        this.innerHTML = joueurs[activePlayer].personnage.adressePng;
        joueurs[activePlayer].assignerPosition([$(this).data().casex, $(this).data().casey]);

        const posJoueurActif = [$('.joueur-0').data().casex, $('.joueur-0').data().casey];
        const posAdversaire = [$('.joueur-1').data().casex, $('.joueur-1').data().casey];

        if (posJoueurActif[1] > posAdversaire[1] || (posJoueurActif[1] === posAdversaire[1] && posJoueurActif[0] > posAdversaire[0])) {
            console.log('tu dois regarder a gauche');
            console.log(`${posJoueurActif[1]} <= ${posAdversaire[1]}`);
            $('.joueur-0').addClass('direction-gauche');
            $(`.joueur-1`).removeClass('direction-gauche');
        } else {
            $('.joueur-0').removeClass('direction-gauche');
            $('.joueur-1').addClass('direction-gauche');
        }


        window.getSelection().removeAllRanges();

        activePlayer === 1 ? activePlayer = 0 : activePlayer = 1;
        $(`.joueur-${activePlayer}`).addClass('joueur-actif');



        if (joueurs[activePlayer].estProche([$(this).data().casex, $(this).data().casey])) {
            $('.choix-possible').removeClass('choix-possible');
            console.log('cest la guerre!!!');

            $(`.joueur-${activePlayer + 1}-log .combat`).removeClass('hidden');

        } else {
            initialiationMouvements();
        }

    });

    const reduirePointsDeVie = (adversaire, pointsDeVie, i, timeout) => {

        setTimeout(function () {
            console.log(pointsDeVie - i);
            $(`.joueur-${adversaire + 1}-log .pv-bar span`).text(`${pointsDeVie - i} pv`);
        }, timeout * i);
    }

    $('.attaque').on('click', () => {
        let adversaire = activePlayer === 1 ? adversaire = 0 : adversaire = 1;
        
            $(`.joueur-${adversaire + 1}-log .perso`).removeClass('defense');
    
            
    
            $(`.joueur-${activePlayer + 1}-log .perso`).addClass('attaque');
            setTimeout(() => {
                $(`.joueur-${activePlayer + 1}-log .perso`).removeClass('attaque');
            }, 2000); 
    
            
    
            const pointsDeVie = joueurs[adversaire].pointsDeVie;
            let degats = joueurs[activePlayer].personnage.arme.puissance;
    
            if (joueurs[adversaire].defense) {
                if ((degats / 2) > pointsDeVie) {
                    degats = pointsDeVie;
                } else {
                    degats = degats / 2;
                }
    
                
    
                joueurs[adversaire].pointsDeVie = pointsDeVie - degats;
                joueurs[adversaire].defense = !joueurs[adversaire].defense;
    
                if (joueurs[adversaire].pointsDeVie <= 0) {
                    joueurs[adversaire].pointsDeVie = 0;
    
                }
            } else {
    
                if (degats > pointsDeVie ) {
                    degats = pointsDeVie;
                }
    
                joueurs[adversaire].pointsDeVie -= degats;

                
    
            }
    
            let timeout;
    
            if (degats > 15) {
                timeout = 60;
            } else {
                timeout = 100;
            }
    
            setTimeout(() => {
                for(let i = 1; i <= degats; i++) {
                    reduirePointsDeVie(adversaire, pointsDeVie, i, timeout);
                }
        
                $(`.joueur-${adversaire + 1}-log progress`).attr('value', joueurs[adversaire].pointsDeVie);
            }, 1000);
            
    
            if (joueurs[adversaire].pointsDeVie === 0) {

                $('.fin-jeu').text(`${joueurs[activePlayer].personnage.nom} Gagne!!`);
                $('.fin-jeu').toggleClass('hidden');
    
                $('.fin-jeu').animate({
                    fontSize: "70px",
                    opacity: "1"
                }, 700);
    
                const animationVictoire = () => {
    
                    for (let i = 0; i < 6; i++) {
    
                        $('.fin-jeu').animate({
                            fontSize: "50px"
                        }, 500).animate({
                            fontSize: "70px"
                        }, 500);
                    }
    
    
                }
                setTimeout(() => {
                    $(`.joueur-${activePlayer + 1}-log .perso`).css('background-image', `url("img/orc-${joueurs[activePlayer].personnage.idPersonnages}--gagne.png")`);
                $(`.joueur-${activePlayer + 1}-log .perso`).addClass('gagne');
    
                 
    
                animationVictoire();
                }, 2010);

                setTimeout(() => {
                    $(`.joueur-${adversaire + 1}-log .perso`).css('background-image', `url("img/orc-${joueurs[adversaire].personnage.idPersonnages}--mort.png")`);
                    $(`.joueur-${adversaire + 1}-log .perso`).addClass('mort');
                }, 1000);
                
                
    
    
                $(`.joueur-${activePlayer + 1}-log .combat`).toggleClass('hidden');
            } else {
    
                setTimeout(() => {
                    $(`.joueur-${adversaire + 1}-log .perso`).css('background-image', `url("img/orc-${joueurs[adversaire].personnage.idPersonnages}--degats.png")`);
                    $(`.joueur-${adversaire + 1}-log .perso`).addClass('degats');
                    setTimeout(() => {
                        $(`.joueur-${adversaire + 1}-log .perso`).removeClass('degats');
                        $(`.joueur-${adversaire + 1}-log .perso`).css('background-image', `url("img/orc-${joueurs[adversaire].personnage.idPersonnages}--weapon-${joueurs[adversaire].personnage.arme.idArme}-attaque.png")`);
                    }, 2010);
                }, 1000);
                setTimeout(() => {
                    $(`.joueur-${activePlayer + 1}-log .combat`).toggleClass('hidden');
                    $(`.joueur-${adversaire + 1}-log .combat`).toggleClass('hidden');
        
                    activePlayer === 1 ? activePlayer = 0 : activePlayer = 1;
                }, 2010);
                
            }
    
    
        
    });
        


    $('.defense').on('click', () => {

        let adversaire = activePlayer === 1 ? adversaire = 0 : adversaire = 1;

        $(`.joueur-${adversaire + 1}-log .perso`).removeClass('defense');

        $(`.joueur-${activePlayer + 1}-log .perso`).css('background-image', `url("img/orc-${joueurs[activePlayer].personnage.idPersonnages}--defense.png")`);
        $(`.joueur-${activePlayer + 1}-log .perso`).addClass('defense');
        $(`.joueur-${adversaire + 1}-log .perso`).css('background-image', `url("img/orc-${joueurs[adversaire].personnage.idPersonnages}--weapon-${joueurs[adversaire].personnage.arme.idArme}-attaque.png")`);


        

        joueurs[activePlayer].defense = !joueurs[activePlayer].defense;

        $(`.joueur-${activePlayer + 1}-log .combat`).toggleClass('hidden');
        $(`.joueur-${adversaire + 1}-log .combat`).toggleClass('hidden');

        activePlayer === 1 ? activePlayer = 0 : activePlayer = 1;
    });

});

jQuery.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)', 
        '-moz-transform' : 'rotate('+ degrees +'deg)',
        '-ms-transform' : 'rotate('+ degrees +'deg)', 
        'transform' : 'rotate('+ degrees +'deg)',
        '-webkit-transition' : '1s ease-out',
        '-moz-transition' : '1s ease-out',
        '-o-transition' : '1s ease-out'});

    return $(this);
};