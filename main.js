document.addEventListener("DOMContentLoaded", ()=>{
    createBox();
    let guessedWord=[[]];
    let space=1;
    let count=0;
    const words=['אמונה','הופעה','קעקוע','שמיכה','שולחן','מילון','פעמון','שמיים','טלפון','מסעדה','תחרות','טאבון','גלידה','אבטיח','הפתעה','זריחה','שקיעה','חופשה','חבילה','צעצוע'];
    let word=words[(Math.floor(Math.random()*20))-1];
    const keys=document.querySelectorAll('.keyboard-row button');

    function getCurrentWord(){
        const numOfGuesses=guessedWord.length;
        return guessedWord[numOfGuesses-1];
    }
    function updateGuessedWord(letter){
        const currWord=getCurrentWord();
        if (currWord && currWord.length<5){
            currWord.push(letter);
            const spaceElement=document.getElementById(String(space));
            space=space+1;
            spaceElement.textContent=letter;
        }
    }
    function getTileColor(letter,index){
        const isCorrect=word.includes(letter);
        if(!isCorrect){
            return "rgb(58,58,60)";
        }
        const letterPlace=word.charAt(index);
        const isCorrectPlace= letter=== letterPlace;
        if (isCorrectPlace){
            return "rgb(83,141,78)";
        }
        return "rgb(181,159,59)";
    }
    function submitWord(){
        const currWord=getCurrentWord();

        if(currWord.length!==5){
            window.alert("מילה חייבת להיות בת 5 אותיות!");
        }
        const currWordArr=currWord.join("");
        const firstLetter=count*5+1;
        const interval=200;
        currWord.forEach((letter, index)=>{
            setTimeout(()=>{
                const tileColor=getTileColor(letter,index);
                const letterID= firstLetter+index;
                const letterElement=document.getElementById(letterID);
                letterElement.classList.add("animate__flipInX");
                letterElement.style=`background-color: ${tileColor};border-color:${tileColor}`;
            },interval*index);
        });
        count+=1;
        if (currWordArr===word){
            window.alert("כל הכבוד!");
        }
        if (guessedWord.length===6){
            window.alert(`המילה הנכונה היא ${(word)} , נסו שוב!`);
        }
        guessedWord.push([]);
    }
    function deleteLetter(){
        const currWord=getCurrentWord();
        const removedLetter=currWord.pop();
        guessedWord[guessedWord.length-1]= currWord;
        const lastLetterElement= document.getElementById(String(space-1));
        lastLetterElement.textContent='';
        space=space-1;
    }
    function createBox(){
        const board=document.getElementById("board");
        for (let i=0;i<30;i++){
            let square=document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate_animated");
            square.setAttribute("id", i+1);
            board.appendChild(square);
        }
    }
    for (let i=0;i<keys.length;i++){
        keys[i].onclick=({ target })=>{
            const letter=target.getAttribute("data-key");
            if (letter==='enter'){
                submitWord();
                return;
            }
            if (letter==='del'){
                deleteLetter();
                return;
            }
            updateGuessedWord(letter);
        };
    }
});
