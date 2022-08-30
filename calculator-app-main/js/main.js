const themeSwitcherContainer = document.querySelector(".theme-switcher__container");
const togglerBall = document.querySelector(".theme-switcher__toggler-ball");


// THEME START
let theme = 0;

themeSwitcherContainer.addEventListener("click", () => {
    theme = (theme + 1) % 3;
    console.log(theme);

    console.log(togglerBall);
    if(theme === 0){
        togglerBall.classList.remove("right");

        document.body.classList.remove("theme-light");
        document.body.classList.remove("theme-purple");
    }

    if(theme === 1){
        togglerBall.classList.add("middle");

        document.body.classList.add("theme-light");

    }
    
    if(theme === 2){
        togglerBall.classList.remove("middle");
        togglerBall.classList.add("right");

        document.body.classList.remove("theme-light");
        document.body.classList.add("theme-purple");

    }



})

// THEME END



// CALCYLATOR START

const btns = document.querySelectorAll(".calculator__body button");
const screen = document.querySelector(".calculator__screen");

const specialChars = ["+", "-", "*", "/", "."];

console.log(btns);

btns.forEach(btn => {
    btn.addEventListener("click", handleBtnClick);
})

function handleBtnClick(e){
    let pressedValue = e.target.textContent;
    if(pressedValue === "x"){
        pressedValue = "*";
    }

   

    if(pressedValue === "="){
        return evaluate();
    }

    if(pressedValue === "DEL"){
        return removeLastChar();
    }

    if(pressedValue === "RESET"){
        return resetAll();
    }

    if(screen.textContent.length >= 14){
        return;
    }


    if(screen.textContent === "0"){
        if(specialChars.includes(pressedValue)){
            return addChar(pressedValue);
        }

        // If it is number.
        return screen.textContent = pressedValue;
    }

    addChar(pressedValue);

    

}

function evaluate(){
    let equation;
    const lastCharOnScreen = screen.textContent.slice(-1);

    if(specialChars.includes(lastCharOnScreen)){
        equation = screen.textContent.slice(0, -1);
    }else{
        equation = screen.textContent;
    }

    let evaluatedValue = String(eval(equation));
    console.log(evaluatedValue);
    console.log(typeof evaluatedValue);

    if(evaluatedValue.length >= 14){
        evaluatedValue = evaluatedValue.slice(0,13);
    }

    screen.textContent = evaluatedValue;

}

function removeLastChar(){
    if(screen.textContent === "Infinity"){
        screen.textContent = "0";
    }
    
    const equation = screen.textContent;
    screen.textContent = equation.slice(0, -1)
    if(screen.textContent === ""){
        screen.textContent = "0";
    }
}

function resetAll(){
    screen.textContent = "0";
}

function addChar(pressedValue){
    if(specialChars.includes(pressedValue)){
      
        const lastCharOnScreen = screen.textContent.slice(-1);

        if(pressedValue === "." && lastCharOnScreen === "."){
            return;
        }
        
        if(specialChars.includes(lastCharOnScreen) && lastCharOnScreen !== "."){
            if(pressedValue === "."){
                return screen.textContent = screen.textContent + "0" + pressedValue;
            }
            
            const equation = screen.textContent;
            return screen.textContent = equation.slice(0, -1) + pressedValue;
        }

    }

    screen.textContent = screen.textContent + pressedValue;

}


// CALCYLATOR END






/************************\
    Ripple Effect Start
\************************/

const rippleElements = document.querySelectorAll(".calculator__key");

const handleRippleAnimationEnd = (e) => {
    e.currentTarget.removeEventListener("animationend", handleRippleAnimationEnd);
    e.currentTarget.remove();
}

const createRippleEffect = (e) => {
    // Stoping event bubbling in case user clicked ripple element which is 
    // a child of element which also is element with ripple effect. 
    e.stopPropagation();


    
    // Element in which we will create ripple effect. 
    const element = e.currentTarget;

    // Getting elements left and top position relative to viewport.
    const {top: elementTop, left: elementLeft } = element.getBoundingClientRect();

    // Getting click event's x and y coordinates.
    const top = e.clientY;
    const left = e.clientX;

    // calculating click event's x and y coordinate relative to element.
    // this x and y will be ripple elements center position's coordinates relative to parent element which in this case is "element".
    const posY = top - elementTop;
    const posX = left - elementLeft;


    const ripple = document.createElement("div");
    ripple.style.top = posY + "px";
    ripple.style.left = posX + "px";
    ripple.classList.add("ripple");
    
    ripple.addEventListener("animationend", handleRippleAnimationEnd);

    element.appendChild(ripple);


}

rippleElements.forEach(element => {
    element.style.position = "relative";
    element.style.zIndex = "0";
    element.addEventListener("click", createRippleEffect);

})

/************************\
    Ripple Effect end
\************************/