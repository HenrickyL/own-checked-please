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

app.get('/buys?/?:id?/?:value',(req, res)=>{
    let sortBy = req.params.value
    let billId=req.params.id
    let categories,buysRow, thisBill
    

    db.all(`SELECT * FROM buy WHERE bill_id = ${Number(billId)} ORDER BY ${sortBy} ASC;`,(err,rows)=>{
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
app.post('/savebuy/?:id?',(req, res)=>{
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
                return res.redirect(301,'/buys/'+billId+'/buyDate')
            })


        })
})
   


app.post('/savebill',(req,res)=>{

    let limit = req.body.limit==''?0:req.body.limit
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
        limit,
        req.body.description,
        1,
        req.body.period
    ]
    db.run(query, values, (err)=>{
        if(err){
            console.log("add Error",err)
            return res.send("Erro ao inserir os dados")
        }

        return res.redirect(301,'/month/dateCreate')

    })
    


})



app.get('/month?/?:id',(req, res)=>{
    let id = req.params.id
    let sortBy, dir
    let x = id.split('-')
    if(x.length>1){
        sortBy = x[0]
        dir= x[1]
    }else{
        sortBy = id
        dir = 'ASC'
    }

    let per,billRows
    db.all(`SELECT * FROM period`,(err,rows)=>{
        if(err){
            return console.log(err)
        } 
        per = rows
        db.all(`SELECT * FROM bill ORDER BY ${sortBy} ${dir}`,(err,rows)=>{
            if(err){
                return console.log(err)
            } 
            billRows=rows
            //status
            let active=[], closed=[], paid = []
            billRows.forEach(b=>{
                if(b.status_id ==1) active.push(b)
                else if(b.status_id ==2) closed.push(b)
                else paid.push(b)
            })


            return res.render("month.html",{periods:per,bills:billRows,active:active,closed:closed,paid:paid})
        })
    })
})

app.get('/deletebuy/:id/:value',(req,res)=>{
    let billId = req.params.id
    let buyId = req.params.value
    db.all(`UPDATE bill SET 
        countBuys = countBuys - ${1},
        valueSum = valueSum - (SELECT value FROM buy WHERE id = ${buyId})
        WHERE id = ${billId}`,(err)=>{

        db.all(`DELETE FROM buy
        WHERE id = ${buyId};`,(err)=>{
            res.redirect(301,`/buys/${billId}`)
        })
    })
})
app.get('/deletebill/:id',(req,res)=>{
    let billId = req.params.id
    db.all(`DELETE FROM bill
        WHERE id = ${billId};`,(err)=>{
            res.redirect(301,`/month/dateCreate`)
        })
})

app.get('/closebill/?:id',(req,res)=>{
    let billId = req.params.id
    db.all(`UPDATE bill SET 
        status_id= status_id + ${1}
        WHERE id = ${billId}`,(err)=>{
            res.redirect(301,`/month/dateCreate`)
        })
})



app.get("/*",(req, res)=>{
    return res.render("notFound.html")
})



//////////////////////////////////////////////
