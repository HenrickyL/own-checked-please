    import express from 'express'
import {db} from './database/db.js'

const app = express()

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log('APP run in', port)
});

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


app.get('/data',(req,res)=>{
    let cat, per, sta, buy
    
    db.all(`SELECT * FROM category`,(err,rows)=>{
        if(err){
            console.log(err)
            return res.send("error ao carregar os dados")
        }
        
        cat = rows

        db.all(`SELECT * FROM period`,(err,rows)=>{
            if(err){
                console.log(err)
                return res.send("error ao carregar os dados")
            }
            
            per = rows
            db.all(`SELECT * FROM status`,(err,rows)=>{
                if(err){
                    console.log(err)
                    return res.send("error ao carregar os dados")
                }
                sta = rows
                db.all(`SELECT * FROM buy`,(err,rows)=>{
                    if(err){
                        console.log(err)
                        return res.send("error ao carregar os dados")
                    }
                    buy = rows
                    return res.json({period:per,status:sta,category:cat,buys:buy})
                })
            })
            
        })
        
    })
    
})

app.get('/buys?:id',(req, res)=>{
    let sucess=req.params.id=='true'?true:false
    let categories,buysRow 
    db.all(`SELECT * FROM category`,(err,rows)=>{
        if(err){
            console.log(err)
            return res.send("error ao carregar os dados")
        }
        console.log(rows)
        categories = rows
        db.all("SELECT * FROM buy",(err,rows)=>{
            if(err){
                console.log(err)
                return res.send("error ao carregar os dados")
            }
            buysRow = rows
            return res.render("buys.html",{buys:buysRow,categories: categories,added:sucess})
        })
        
    })

})
app.post('/savebuy',(req, res)=>{
    const query = `
        INSERT INTO buy(
            value,
            buyDate,
            description,
            category_id

        ) VALUES (
                ?,?,?,?
        );`       
        const values = [
                req.body.valor,
                req.body.date+' '+req.body.time,
                req.body.description,
                req.body.category
            ]
               
        console.log(req.query)
        
        db.run(query, values, (err)=>{
            if(err){
                console.log("add Error",err)
                return res.send("Erro ao inserir os dados")
            }

            return res.redirect(301,'/buys')

        })
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



app.get("/*",(req, res)=>{
    return res.render("notFound.html")
})



//////////////////////////////////////////////
