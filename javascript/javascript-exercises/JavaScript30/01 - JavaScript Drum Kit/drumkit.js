//const keys = document.querySelectorAll(".key");

//console.log(keys);


function playSound(event){
    //console.log(event)
    /* const audios = document.querySelectorAll("audio");
    audios.forEach(audio => {
        if (audio.getAttribute("data-key") == keycode){

        }
    }) */
    //console.log(audios);
    const keycode = event.keyCode;
    //console.log(keycode);
    const audio = document.querySelector(`audio[data-key="${keycode}"]`);
    if (!audio) return;
    //console.log(audio);
    audio.currentTime = 0;
    audio.play();

    const key = document.querySelector(`.key[data-key="${keycode}"]`);
    key.classList.add("playing");
    
    /* keys.forEach(keybutton => {
        const keyToPress = keybutton.querySelector("kbd").textContent;
        if (event.key.toUpperCase() == keyToPress){
            keybutton.classList.add("playing");
        }
    }); */
}

/* document.addEventListener('keyup', event => {
    //console.log(event.key)
    const keycode = event.keyCode;
    //console.log(keycode);
    const key = document.querySelector(`.key[data-key="${keycode}"]`);
    key.classList.remove("playing");
}); */



function removeTransition(event){
    if (event.propertyName !== 'transform') return;
    this.classList.remove("playing");
}


document.addEventListener('keydown', playSound);

const keys = document.querySelectorAll(".key");
keys.forEach(key => key.addEventListener("transitionend", removeTransition))
