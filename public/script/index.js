let mainButton = null
let secButton = null

window.addEventListener("load",()=>{
    mainButton = document.querySelector(".button-main")
    secButton = document.querySelector(".button-sec ")

    mainButton.addEventListener("click",()=>{
        window.location = "/aaaa"
    })


    console.log("Pagian carregada")

})