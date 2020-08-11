let btReturn = null
let btOptions = null


export function loadButons(){
    btReturn = document.querySelector(".bt-return")
    btOptions = document.querySelector(".bt-options")
    console.log("Loaded buttons!")
}
export function activateButtons(){
    btReturn.addEventListener("click",()=>{
        window.location = "/"
    })
    btOptions.addEventListener("click",()=>{
        // window.location = "/search"
        console.log("Options Clicked")
    })
    console.log("activated buttons")
}

const header = {loadButons,activateButtons}

export default header