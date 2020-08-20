import header from "./header.js"
import {leftpad} from "./timestamp.js"

window.addEventListener("load",()=>{
    header.loadButons()
    ////////////////////////////////////////////
        let popup = document.querySelector(".add-popup")
        let addBox = document.querySelector(".add-box")
        let add = document.querySelector(".bt-add")
        let submit = document.getElementById("add-submit")
        /////////////////////
        let dateNow = document.querySelector("#date-now")
        // let filter = document.querySelector('#filter')

        //poder clicar nos bills
        // let allBills = Array.from(document.querySelectorAll('.translation'))

    /////////////////////////////////////////////////////////////
    header.activateButtons()
    //////////////////////////////////////////////////////////////
       
        add.addEventListener("click",()=>{
            let d = new Date()
            dateNow.textContent = `${leftpad(d.getDate())}/${leftpad(d.getMonth()+1)} - ${leftpad(d.getHours())}:${leftpad(d.getMinutes())}`
            popup.classList.remove("hide")
            addBox.classList.remove("hide")
        })
        
        popup.addEventListener("click",()=>{
            addBox.classList.add("hide")
            popup.classList.add("hide")
        })   


        // //click na bill
        // allBills.forEach(b=>{
        //     b.addEventListener("click",()=>{
        //         window.location = "/buys/"+b.childNodes[7].textContent
        //     })
        // })
        
    console.log("<Page Loaded!>")

})


function filtered(){
    var x = document.getElementById("filter")
    window.location = "/month/"+x.value
}