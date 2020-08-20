
import header from "./header.js"
import {leftpad} from "./timestamp.js"

window.addEventListener("load",()=>{
    header.loadButons()
       let popup = document.querySelector(".add-popup")
       let addBox = document.querySelector(".add-box")
       let d = document.getElementById("buy-description")
       let v = document.getElementById("buy-value")
       let add = document.querySelector(".bt-add")
       let submit = document.getElementById("add-submit")
       let elemen = [d,v]
       /////////////////////
       let dateNow = document.querySelector("#date-now")
       let addDate = document.getElementById("add-date")
       let addTime = document.getElementById("add-time")
    //    let allBuys = Array.from( document.querySelectorAll('.translation'))
    header.activateButtons()
        add.addEventListener("click",()=>{
            let d = new Date()
            dateNow.textContent = `${leftpad(d.getDate())}/${leftpad(d.getMonth()+1)} - ${leftpad(d.getHours())}:${leftpad(d.getMinutes())}`
            addDate.value = `${leftpad(d.getFullYear())}-${leftpad(d.getMonth()+1)}-${leftpad(d.getDate())}`
            addTime.value = `${leftpad(d.getHours())}:${ leftpad(d.getMinutes())}`
            console.log(">>",addTime)
            popup.classList.remove("hide")
            addBox.classList.remove("hide")
        })
        
        popup.addEventListener("click",()=>{
            addBox.classList.add("hide")
            popup.classList.add("hide")
        })   

        // allBuys.forEach(b=>{
        //     b.addEventListener('click',()=>{
        //         b.classList.add('selected')
        //     })
        //     b.addEventListener('clickout',()=>{
        //         b.classList.remove('selected')
        //     })
        // })
    
    console.log("<Page Loaded!>")

})

