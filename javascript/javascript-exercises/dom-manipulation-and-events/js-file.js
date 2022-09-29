// your JavaScript file
const container = document.querySelector('#container');

const content = document.createElement('div');
content.classList.add('content');
content.textContent = 'This is the glorious text-content!';

container.appendChild(content);

//1.
const redText = document.createElement("p");
redText.textContent = "Hey I'm red!";
redText.style.color = 'rgb(255,0,0)';
container.appendChild(redText);

//2.
const blueText = document.createElement("h3");
blueText.textContent = "Hey I'm blue h3!";
blueText.style.color = 'rgb(0,0,255)';
container.appendChild(blueText);

//3.
const blackBorderPinkBG = document.createElement("div");
blackBorderPinkBG.style.border = '3px solid black';
blackBorderPinkBG.style.backgroundColor = 'pink';
container.appendChild(blackBorderPinkBG);

const partThreeh1 = document.createElement("h1");
partThreeh1.textContent = "I'm in a div";
blackBorderPinkBG.appendChild(partThreeh1);

const partThreep = document.createElement("p");
partThreep.textContent = "ME TOO!";
blackBorderPinkBG.appendChild(partThreep);

//events
const btn = document.createElement("button");
btn.textContent = "click me";
btn.setAttribute('id', 'custom-button');
container.appendChild(btn);

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', e => {
        e.target.style.backgroundColor = "lightblue";
        console.log(e.target.id);
    });
})

