import express from 'express'
// import {db} from './database/db.js'

const app = express()


import nunjucks from 'nunjucks'
nunjucks.configure("src/views",{
    express: app,
    noCache:true
})

app.use(express.static("public"))

app.use(express.json())
app.use(express.urlencoded({ extended : true }))

////////////////////////////////////////////

app.get('/',(req, res)=>{
    return res.render("index.html")
})

app.get('/buys',(req, res)=>{
    return res.render("buys.html")
})

app.get('/month',(req, res)=>{
    // db.all(`SELECT * FROM category `, (err,rows)=>{
    //     if(err){
    //         return console.log(err)
    //     } 
    //     console.log("Aqui estão os Registros:")
    //     console.log(rows)
    // })
    return res.render("month.html")
})
// app.post('/savebill',(req, res){

// }


app.get("/*",(req, res)=>{
    return res.render("notFound.html")
})



//////////////////////////////////////////////

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log('APP run in', port)
});