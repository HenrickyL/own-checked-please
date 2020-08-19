import express from 'express'
import {db} from './database/db.js'
import {leftpad as fd} from './helper/timestamp.js'
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
    let cat, per, sta, buy,bill
    
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
                    db.all(`SELECT * FROM bill`,(err,rows)=>{
                        if(err){
                            console.log(err)
                            return res.send("error ao carregar os dados")
                        }
                        bill = rows
                        return res.json({period:per,status:sta,category:cat,buys:buy,bills:bill})
                    })  
                })
            
            })
        
        })
    
    })
})

app.get('/buys?/?:id',(req, res)=>{
    
    let billId=req.params.id
    let categories,buysRow, thisBill
    

    db.all(`SELECT * FROM buy WHERE bill_id = ${Number(billId)};`,(err,rows)=>{
        if(err){
            console.log(err)
            return res.send("error ao carregar os dados<buys>")
        }
        buysRow = rows
        db.all(`SELECT * FROM bill where id = ${Number(billId)}`,(err,rows)=>{
            if(err){
                console.log(err)
                return res.send("error ao carregar os dados <thisbill>")
            }
            thisBill = rows          
            db.all(`SELECT * FROM category`,(err,rows)=>{
                if(err){
                    console.log(err)
                    return res.send("error ao carregar os dados <category>")
                }
                categories = rows
                //soma dos valores
                
                // let sum = billRows.reduce((acum,b)=>{
                //     return acum+b.value
                // })
                 
                console.log(">>>>>>>",thisBill[0])
                return res.render("buys.html",{buys:buysRow,categories: categories,thisBill:thisBill[0]})
            })
        })
        
    })

})
app.post('/savebuy/?:id',(req, res)=>{
    let billId=req.params.id

    const query = `
        INSERT INTO buy(
            value,
            buyDate,
            description,
            category_id,
            bill_id

        ) VALUES (
                ?,?,?,?,?
        );`       
        const values = [
                req.body.valor,
                req.body.date+' '+req.body.time,
                req.body.description,
                req.body.category,
                Number(billId)
            ]
               
        // console.log(req.query)
        
        db.run(query, values, (err)=>{
            if(err){
                console.log("add Error",err)
                return res.send("Erro ao inserir os dados")
            }
            //alterar o valor total e a quantidade da bill
            let query = `UPDATE bill SET 
                countBuys = countBuys + ${1},
                valueSum = valueSum+${req.body.valor}
            WHERE id = ${billId}`
            db.run(query,err=>{
                if(err){
                    console.log("add Error",err)
                    return res.send("Erro ao inserir os dados")
                }
                return res.redirect(301,'/buys/'+billId)
            })


        })
})
   


app.post('/savebill',(req,res)=>{
    const query = `
        INSERT INTO bill(
            title,
            dateCreate,
            valueSum,
            countBuys,
            valueLimit,
            description,
            status_id,
            period_id

        ) VALUES (
                ?,?,?,?,?,?,?,?
        );` 
        let d = new Date()
    const values = [
        req.body.billtitle,
        `${d.getFullYear()}-${fd(d.getMonth()+1)}-${fd(d.getDate())}`,
        0,
        0,
        req.body.limit,
        req.body.description,
        1,
        req.body.period
    ]
    db.run(query, values, (err)=>{
        if(err){
            console.log("add Error",err)
            return res.send("Erro ao inserir os dados")
        }

        return res.redirect(301,'/month')

    })
    


})



app.get('/month',(req, res)=>{
    let per,billRows
    db.all(`SELECT * FROM period`,(err,rows)=>{
        if(err){
            return console.log(err)
        } 
        per = rows
        db.all(`SELECT * FROM bill`,(err,rows)=>{
            if(err){
                return console.log(err)
            } 
            billRows=rows
            return res.render("month.html",{periods:per,bills:billRows})
        })
    })
})




app.get("/*",(req, res)=>{
    return res.render("notFound.html")
})



//////////////////////////////////////////////
