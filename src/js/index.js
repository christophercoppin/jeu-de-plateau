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

import * as carteView from './views/carteView';
import * as personnagesView from './views/personnagesView';

$(window).on('load', function () {
        $('.chargement').removeClass('chargement-en-cours');
        console.log('Chargement termine');
});

$(document).ready(() => {

    let activePlayer = 0;
    const coordonneesMurs = [];
    const coordonneesArmes = [];
    const coordonneesPersonnages = [];
    const ensembleCoordonnees = [coordonneesMurs, coordonneesArmes, coordonneesPersonnages];
    let nombreDeCases = 10;
    const joueur1 = new Joueur(1);
    const joueur2 = new Joueur(2);
    const joueurs = [joueur1, joueur2];

    carteView.creationCarte();
    const initialisationPartie = () => {
        
    }

    initialisationPartie();

    const coordonneesAleatoires = () => {
        const coordonnees = [];

        const x = Math.floor(Math.random() * nombreDeCases) + 1;
        const y = Math.floor(Math.random() * nombreDeCases) + 1;

        coordonnees.push(x);
        coordonnees.push(y);

        return coordonnees;
    }


    const random = (total, min) => {
        return Math.floor(Math.random() * total) + min;
    }
    
    const nombreMur = random(6, 20);
    const nombreArme = random(3, 3);


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

    carteView.afficherMurs(coordonneesMurs);

    assignerCoordonnees(nombreArme, coordonneesArmes);

    carteView.afficherArmes(nombreArme, coordonneesArmes);


    assignerCoordonnees(2, coordonneesPersonnages);
    const personnagesChoisi = [];
    const personnageChoisi1 = random(3, 1);
    let personnageChoisi2 = random(3, 1);

    while (personnageChoisi1 === personnageChoisi2) {
        personnageChoisi2 = random(3, 1);
    }

    personnagesChoisi.push(personnageChoisi1);
    personnagesChoisi.push(personnageChoisi2);

    for (let i = 0; i < 2; i++) {

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
        carteView.afficherPersonnage(coordonneesPersonnages[i], personnagesChoisi[i], i);
        personnagesView.initialiserAffichagePersonnage(joueurs, personnagesChoisi, i);
    }

    const positionPersonnages = () => {
        const positionJoueur1X = joueurs[0].position[0];
        const positionJoueur1Y = joueurs[0].position[1];
        const positionJoueur2X = joueurs[1].position[0];
        const positionJoueur2Y = joueurs[1].position[1];

        if ((positionJoueur1X === positionJoueur2X && (positionJoueur1Y === positionJoueur2Y + 1 || positionJoueur1Y === positionJoueur2Y - 1)) || (positionJoueur1Y === positionJoueur2Y && (positionJoueur1X === positionJoueur2X + 1 || positionJoueur1X === positionJoueur2X - 1)) || (positionJoueur1X === positionJoueur2X + 1 && (positionJoueur1Y === positionJoueur2Y + 1 || positionJoueur1Y === positionJoueur2Y - 1)) || (positionJoueur1X === positionJoueur2X - 1 && (positionJoueur1Y === positionJoueur2Y + 1 || positionJoueur1Y === positionJoueur2Y - 1))) {
            return personnagesProches = true;
        }

        carteView.controleCases(positionJoueur1X, positionJoueur1Y);

        return carteView.controleAccessible(coordonneesArmes, positionJoueur2X, positionJoueur2Y);
        
    }
    
    while(positionPersonnages()) {

        coordonneesPersonnages.length = 0;
        assignerCoordonnees(2, coordonneesPersonnages);

        for(let i = 0; i < 2; i++) {
            joueurs[i].assignerPosition(coordonneesPersonnages[i]);

            carteView.afficherPersonnage(coordonneesPersonnages[i], personnagesChoisi[i], i);
        }

        coordonneesArmes.length = 0;
        assignerCoordonnees(nombreArme, coordonneesArmes);
        carteView.afficherArmes(nombreArme, coordonneesAleatoires);
    }

    carteView.definirDirectionPersonnage();

    
    carteView.initialisationMouvements(activePlayer);

    $('.carte').on('click', '.choix-possible', function (e) {


        let adversaire = activePlayer === 1 ? adversaire = 0 : adversaire = 1;
        $('.joueur-actif').empty();


        


        carteView.assignerArme($(this), activePlayer, joueurs[activePlayer]);



        $(this).addClass(`joueur-${activePlayer}`);
        this.innerHTML = joueurs[activePlayer].personnage.adressePng;
        joueurs[activePlayer].assignerPosition([$(this).data().casex, $(this).data().casey]);

        carteView.definirDirectionPersonnage();


        window.getSelection().removeAllRanges();

        activePlayer === 1 ? activePlayer = 0 : activePlayer = 1;
        $(`.joueur-${activePlayer}`).addClass('joueur-actif');



        if (joueurs[activePlayer].estProche([$(this).data().casex, $(this).data().casey])) {
            $('.choix-possible').removeClass('choix-possible');
            console.log('cest la guerre!!!');

            $(`.joueur-${activePlayer + 1}-log .combat`).removeClass('hidden');

        } else {
            carteView.initialisationMouvements(activePlayer);
        }

    });

    const reduirePointsDeVie = (adversaire, pointsDeVie, i, timeout) => {

        setTimeout(function () {
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
                            fontSize: "30px"
                        }, 500).animate({
                            fontSize: "50px"
                        }, 500);

                    }
    
    
                    $('.reload').removeClass('hidden');
                    $('.reload__btn').on('click', () => {
                        location.reload(false);
                    });
                    
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