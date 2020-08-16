
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
    header.activateButtons()
        elemen.forEach(elem=>{
            elem.addEventListener("blur",event=>{
                // if(event.key === "Enter"){
                    
                    let valor = v.value%1==0? (v.value===''?'0':v.value)+",00" : v.value;
                    let note = `\n------------------------\nR$ ${valor}`

                    if(elem.textContent.search("------------------------")===-1){
                        d.textContent += note
                    }else if(d.textContent.lastIndexOf("\n")>0){
                        let x =d.textContent
                        d.textContent = x.substring(0, x.lastIndexOf("\n"));
                        x = d.textContent
                        d.textContent = x.substring(0, x.lastIndexOf("\n"));
                        x = d.textContent
                        d.textContent = x.substring(0, x.lastIndexOf("\n"));
                        d.textContent += note
                    }
            })
        })
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
    
    console.log("<Page Loaded!>")

})

