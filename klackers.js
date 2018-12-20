window.onload = ()=>{

let roll = Math.floor(Math.random() * 12 + 2);
let rollFinal = Math.floor(Math.random() * 6 + 1); //if a user has less than 6 total points remaining they can opt to roll just one die.
let rollTemp = roll;
let tempMovesArr = [];
let movesHistArr = [];
let scoreArr = []; //max score = 45

const rollFinalFunc = ()=>{
    let score = 45 - (scoreArr.reduce((a,b)=>a+b, 0));
    if (score <= 20){
        document.getElementById('rollBtnFinal').style.display = "inline";
        document.getElementById('rollBtnFinal').addEventListener("click", ()=>{
            document.getElementById('roll').innerHTML = rollFinal;
            document.getElementById('rollBtn').innerHTML = "----";
        });
    }
}

const startGame = ()=>{
    document.getElementById('modBg').classList.add("startAni");
    document.getElementById('mod').classList.add("startAni");
    document.getElementById('mod').style.display = "none"
    setTimeout(() => {
        document.getElementById('modBg').style.display = "none";
    }, 3000);
 
}

function rollDice(){
    startGame();
    if(document.getElementById('rollBtn').innerHTML !== "----"){
        let score = 45 - (scoreArr.reduce((a,b)=>a+b, 0));
        roll = roll;
        rollTemp = roll;
        document.getElementById('roll').innerHTML = roll;
        document.getElementById('rollBtn').innerHTML = "----";
        checkRound();
    } else {
        alert('finish the round first dummy');
    }
}
document.getElementById('rollBtn').addEventListener("click", rollDice);
document.getElementById('startGame').addEventListener("click", rollDice);

function resetRound(){
    if (roll >= 1){
        for (let i=0; i<tempMovesArr.length; i++){
            let a = tempMovesArr[i].toString();
            let height = 50 * parseInt(a) + 50;
            let y = 450 - (parseInt(a) * 50);
            document.getElementById(a).setAttribute("height", height);
            document.getElementById(a).setAttribute("y", y);
        }
        roll = rollTemp;
        document.getElementById("roll").innerHTML = roll;
    } else {
        alert('You won bruh...');
    }
} 
document.getElementById('resetRound').addEventListener("click", resetRound);

let i = 1;
while(i<10){
    let id = i.toString();
    document.getElementById(id).addEventListener("click", ()=>{
        roll -= id;
        tempMovesArr.push(id);
        if (roll > 0){
            document.getElementById(id).setAttribute("height", 30);
            document.getElementById(id).setAttribute("y", 570);
            document.getElementById('roll').innerHTML = roll;
        } else if(roll < 0) {
            roll += parseInt(id);
            document.getElementById('roll').innerHTML = roll;


            // alert("That does not add up to " + rollTemp + "!" );
        }
        else if (roll == 0){
            document.getElementById('rollBtn').innerHTML = "Next Round";
            document.getElementById(id).setAttribute("height", 30);
            document.getElementById(id).setAttribute("y", 570);
            document.getElementById('roll').innerHTML = roll;
            scoreArr.push(parseInt(rollTemp));
            let score = 45 - (scoreArr.reduce((a,b)=>a+b, 0));
            document.getElementById('score').innerHTML = score;
            roll = Math.floor(Math.random() * 12 + 2);
            rollTemp = roll;
            chickenDinner();
            tempMovesArr.forEach((i)=>movesHistArr.push(i));
            tempMovesArr = [];
            document.getElementById('resetRound').style.display = "inline";
        }
    });
    i++;
}

const chickenDinner = ()=>{
    let score = 45 - (scoreArr.reduce((a,b)=>a+b, 0));

    if (score == 0){
        let score = 45 - (scoreArr.reduce((a,b)=>a+b, 0));
        document.getElementById('chickenDinner').style.display = "inline";
    }
};

const newGame = ()=>{
    let i = 1;
    while(i<10){
        let id = i.toString();
        let height = 50 * i + 50;
        let y = 450 - (i * 50);
        document.getElementById(id).setAttribute("height", height);
        document.getElementById(id).setAttribute("y", y);
        i++;
    }
    document.getElementById("rollBtn").innerHTML = "Roll";
    document.getElementById("roll").innerHTML = "";
    document.getElementById('rollBtnFinal').style.display = "none";
    document.getElementById('score').innerHTML = 45;
    scoreArr = [];
    roll = Math.floor(Math.random() * 12 + 2);
    document.getElementById('resetRound').style.display = "none";
};
document.getElementById('newGame').addEventListener("click", newGame); 

let checkRound = ()=>{
    if (movesHistArr.length > 0){
        let r = roll; //r = roll value
        let b = ['1','2','3','4','5','6','7','8','9']; //b = blocks still standing
        b = b
            .filter(el => !movesHistArr.includes(el))
            .concat(
            movesHistArr.filter(el => !b.includes(el))
            );
        let results = [];
        console.log('temp is: ' + b + ' | roll is: ' + r);

        for (let i=0; i<b.length; i++){
            let ii = parseInt(b[i]);
            if (r - ii == 0){
                results.push(ii);
                return results;
            } else if (r - b[i] > 1){
                for (let j=b.length; j==b[i]; j--){
                    let jj = parseInt(b[j]);
                    if( r - (ii + jj) == 0 ){
                        results.push(b[ii, jj]);
                        return results;
                    } else {console.log(r - (ii + jj));}
                }
            }
        }
        console.log('results are : ' + results);
    } 
}

}//end onload