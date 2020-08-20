let btReturn = null

let btOp = null
let menuBox = null

let popup = null
let addBox = null
let d = null
let v = null
let add = null
let submit = null
let elemen = [d,v]

let searchBar = null
let searchInput = null
let searchButton = null

let allBuys = null

export function loadButons(){
    btReturn = document.querySelector(".bt-return")
    btOp = document.querySelector(".bt-options")
    menuBox = document.querySelector(".menu-op")
    searchBar = document.querySelector('.search-bar')
    searchInput = document.querySelector('.search-bar input')
    searchButton = document.querySelector('.search-bar button')
    allBuys = Array.from( document.querySelectorAll('.translation'))
    ////////////////////////////
    

    console.log("Loaded buttons!")
}
export function activateButtons(){
    btReturn.addEventListener("click",()=>{
        window.location = "/month/dateCreate"
    })
    
    btOp.addEventListener('focus',()=>{
        menuBox.classList.add("focused")
    })
    btOp.addEventListener("blur",()=>{
        menuBox.classList.remove("focused")
    })
//////////////////////////////
    searchButton.addEventListener("keyup",()=>{
        if(event.key ==='Enter'){
            //busca
        }
    })
    searchButton.addEventListener("click",()=>{
        searchBar.classList.add('focused')
        if(searchButton.value.length > 0 ){
            //buscar
        }
        setTimeout(()=>{

            searchInput.focus()
        },200)
        
    })
    searchInput.addEventListener("focusout",()=>{
        setTimeout(()=>{
            searchBar.classList.remove('focused')
        },500)
    })
    //ativar o click 
    allBuys.forEach(b=>{
        b.addEventListener('click',()=>{
            b.classList.add('selected')
        })
        b.addEventListener('mouseleave',()=>{
            b.classList.remove('selected')
        })
    })


    console.log("activated buttons")
}

const header = {loadButons,activateButtons}

export default header




            
            
