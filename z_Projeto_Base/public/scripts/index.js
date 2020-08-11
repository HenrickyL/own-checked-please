
// import dataOp from "../../src/dataOp.js"
let btMonitor = null
let btSearch = null
let conectStatus = null


window.addEventListener("load",()=>{
    loadItems()
    activateButtons()
    
    console.log("<Page Loaded!>")

})





function loadItems(){
    btMonitor = document.querySelector(".button-main")
    btSearch = document.querySelector(".button-sec")
    conectStatus = document.querySelector("#conectivity")
    console.log("Loaded buttons!")
}
function activateButtons(){
    btMonitor.addEventListener("click",()=>{
        window.location = "/monitor"
    })
    btSearch.addEventListener("click",()=>{
        window.location = "/search"
    })
    setInterval(()=>{
        if(navigator.onLine){
            // conectStatus.childNodes[1].textContent = "online"
            conectStatus.childNodes[1].classList.remove("disconected")
            conectStatus.childNodes[1].classList.add("conected")
        }else{
            // conectStatus.childNodes[1].textContent = "offline"
            conectStatus.childNodes[1].classList.remove("conected")
            conectStatus.childNodes[1].classList.add("disconected")

        }
        // console.log("cheked!")
    }, 2000)
    console.log("activated buttons")
}
