	// taille du terrain
    const LARGEUR = window.innerWidth-200;
    const HAUTEUR = window.innerHeight;
    // les 4 directions
    const BAS=115;
    const HAUT=122;
    const GAUCHE=113;
    const DROITE=100;
    // direction de déplacement du serpent
    var direction=DROITE; 
    // le nb de fruits
    var nbFruits = 100;
    var nbFruitsManges=0;
    // le jeu
    var jeu; 
    const tailleSerpent=15;
    

    document.addEventListener('keypress', dir);
    var speed =5;

    var score= document.createElement("p");
    document.querySelector('form').appendChild(score);

    document.querySelector('form').style.left=LARGEUR+"px";



    var terrain = document.querySelector("div.terrain");
    console.log(terrain)
    terrain.style.width=LARGEUR+"px";
    terrain.style.height=HAUTEUR+"px";


    function dir(evt){
        direction=evt.charCode;
    }

    
    function avancer() {
        var c1 =document.querySelector('#c1');
        if(direction==BAS ){
            if ( c1.offsetTop<HAUTEUR)
            c1.style.top=c1.offsetTop + speed +'px';
        }
        else if (direction==HAUT ){
            if(c1.offsetTop>0){
            c1.style.top=c1.offsetTop - speed +'px';
        }}
        else if (direction==GAUCHE ){
            if(c1.offsetLeft>0){
                c1.style.left=c1.offsetLeft - speed +'px';
            }
            
        }
        else if (direction==DROITE ){
            if (c1.offsetLeft<LARGEUR){
                c1.style.left=c1.offsetLeft + speed +'px';
            }
        }
        
        var tabFruit=document.querySelector('#terrain').children;
        
        for (var i = 0;i<tabFruit.length;i++){
            
            if(c1.offsetTop-tailleSerpent<=tabFruit[i].offsetTop && tabFruit[i].offsetTop<=c1.offsetTop+tailleSerpent &&c1.offsetLeft-tailleSerpent<=tabFruit[i].offsetLeft&& tabFruit[i].offsetLeft<=c1.offsetLeft+tailleSerpent){
                    document.querySelector('#terrain').removeChild(tabFruit[i]);
                    nbFruitsManges++;				
                    score.innerHTML=nbFruitsManges;
                    if(nbFruitsManges==nbFruits){
                        window.alert('Partie gagné')
                    }	
            }
        }
    }

    

    var btnStart= document.getElementById("btnstart");
    var btnPause= document.getElementById("btnpause");
    btnStart.addEventListener("click",Start);
    btnPause.addEventListener("click",Pause);

    function Start(evt){
        if (btnStart.value=='Start'){
            jeu =setInterval(avancer, 50) ; 
        }
    }
    function Pause(evt){
        if (btnPause.value=='Pause') {
            clearInterval(jeu) ;
        }
    }
function fruits(nbFruits){
    for(var i=0;i<nbFruits;i++){
        var fruit=document.createElement('div');
        fruit.className="fruit";
        fruit.id='f'+i;
        fruit.style.left=getRandomInt(LARGEUR-5)+"px";
        fruit.style.top=getRandomInt(HAUTEUR-5)+"px";
        document.querySelector('#terrain').appendChild(fruit);

    }
}
fruits(nbFruits);
function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
}

    
    
