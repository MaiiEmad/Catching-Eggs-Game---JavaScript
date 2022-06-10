
var playerName = document.getElementById("playerName");
var game= document.querySelector(".game");
var basket= document.querySelector(".basket");
var eggs= document.querySelector(".eggs");
var basketLeft=parseInt(window.getComputedStyle(basket).getPropertyValue("left"));
var basketBottom=parseInt(window.getComputedStyle(basket).getPropertyValue("bottom"));
var score =0;

let username;
window.addEventListener("DOMContentLoaded",function()
{
    
    username = location.search.substring(1).split("=")[1].replace("+", " ");
    playerName.innerHTML=username;
    getLastDate(username);
});


function moveBasketLeft(){
    if(basketLeft > 0){
    basketLeft-= 15;
    basket.style.left =basketLeft+'px';
    }
}
function moveBasketRight(){
    if(basketLeft < 620){
    basketLeft+= 15;
    basket.style.left =basketLeft+'px';
    }
}

function control(e){
    if(e.key =="ArrowLeft")
    {
        moveBasketLeft();
    }
    if(e.key =="ArrowRight")
    {
        moveBasketRight();
    }

}


function generateEggs(){
    var eggBottom=470;
    var eggLeft=Math.floor(Math.random() * 620);

    var egg=document.createElement('div');
    egg.setAttribute("class","egg");
    eggs.appendChild(egg);

    function fallDownEgg(){
        if (eggBottom < basketBottom + 50 && eggBottom > basketBottom &&
            eggLeft > basketLeft -30 && eggLeft < basketLeft + 80){
            
                eggs.removeChild(egg);
                clearInterval(fallInterval);
                score++;
        }
    if (eggBottom < basketBottom){
        alert("Game Over ! Your Score is : " + score);
        saveGameDate(username);
        clearInterval(fallInterval);
        clearTimeout(eggTimeout);
        location.reload();
    }
        eggBottom -=5;
        egg.style.bottom =eggBottom +'px';
        egg.style.left =eggLeft +'px';
    }
    
    var fallInterval =setInterval(fallDownEgg,30);
    var eggTimeout = setTimeout(generateEggs,2000);
    
}

generateEggs(); 

document.addEventListener("keydown",control);
