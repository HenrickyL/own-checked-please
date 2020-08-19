import sqlite3 from 'sqlite3'
import * as fs from 'fs'
sqlite3.verbose()
export const db = new sqlite3.Database("./src/database/database.db")
// export const db = new sqlite3.Database("./src/database/database.db")

let init = false





const tables=[
    
    {
        title:"period",
        body:{
            id:'INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL',
            name:'TEXT',
            periodTime:'INTEGER',
            fkey:[]
        }
    },
    
    {
        title:"status",
        body:{
            id:'INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL',
            type:'TEXT',
            fkey:[]
        }
    },
    
    {
        title:"bill",
        body:{
            id:'INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL',
            title:'VARCHAR(45)',
            dateCreate: 'DATE',
            dateEnded:'DATE',
            countBuys: 'INTEGER',
            valueSum:'FLOAT',
            valueLimit:'FLOAT',
            description:'TEXT',
            status_id: 'INTEGER',
            period_id: 'INTEGER',
            fkey:['status','period']
            
        }
    },
    {
        title:"category",
        body:{
            id:'INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL',
            type:'TEXT UNIQUE',
            fkey:[]
        }
    },
    {
        title:"buy",
        body:{
            id:' INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL',
            value: 'FLOAT',
            buyDate:'DATE',
            description:'TEXT',
            category_id:'INTEGER',
            bill_id: 'INTEGER',
            fkey:['category','bill']
        }
    },
    // {
    //     title:"have",
    //     body:{
    //         id:'INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL',
    //         name:'VARCHAR(45)',
    //         bill_id:'INTEGER',
    //         buy_id:'INTEGER',
    //         fkey:['bill','buy'/*,'user'*/]
    //     }
    // },
    
    //* rever a tabela user
    // {
    //     title:"user",
    //     body:{
    //         id:'INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL',
    //         username:'VARCHAR(25) ',
    //         password:'VARCHAR(12) ',
    //         fkey:[]
    //     }
    // },

]

function getBody(t){
    let text=``
    let ver = false
    let id=null
    for(let i in t.body){
        if(ver===false){
            ver =true
            id = i
        }
        if(i!=='fkey')
            text += ` ${i}  ${t.body[i]},\n`
    }
    // text+= `PRIMARY KEY (${id}),\n`
    if(t.body.fkey.length>0){
        for(let i of t.body.fkey)
            text+= `FOREIGN KEY (id)
            REFERENCES ${i}(id)
            ,\n`
    }
    // text+= `CONSTRAINT ${t.title}_pkey PRIMARY KEY (${id}),\n`
    // if(t.body.fkey.length>0){
    //     for(let i of t.body.fkey)
    //         text+= `CONSTRAINT ${i}_fkey FOREIGN KEY (id${i})
    //         REFERENCES ${i}(id${i})
    //         ,\n`
    // }
    return text.slice(0,text.length-2)
}

const Categorie = ['Transporte','Alimentação','Lazer','Saúde','Aluguel','Nenhuma']
const Periods = [ ['uma semana',7], ['quinze dias',15],['um mês',30],['três meses',90],['seis meses',120],['um ano',365] ,['indefinido',-1]]
const Status = ['ativo','fechado','pago' ]
db.serialize(() => {
    //verificação se existe o database
    // try {
    //     if (fs.existsSync('./src/database/database.db')) {
    //       init=false
    //     }else init =true
    //   } catch(err) {
    //     console.error(err)
    //   }





    tables.forEach(t=>{
        db.run(`CREATE TABLE IF NOT EXISTS ${t.title}(
                ${getBody(t)}
            );
        `)
        console.log('Tabela <',t.title,'> Criada!')
    })
    
    
    // //estados iniciais
    // if(!init){
    //     //criar as categorias
    //    Categorie.forEach(c=>{
    //        let query= `INSERT INTO category(type) VALUES(?)`
    //        let values = [c]
    //        db.run(query,values,(err)=>{
    //            console.log(err)
    //        })
    //    })
    //    //criar os status
    //    Status.forEach(s=>{
    //         let query= `INSERT INTO status(type) VALUES(?)`
    //         let values = [s]
    //         db.run(query,values,(err)=>{
    //             console.log(err)
    //         })
    //     })
    //    //criar os Periodos
    //    Periods.forEach(p=>{
    //         let query= `INSERT INTO period(name,periodTime) VALUES(?,?)`
    //         let values = [p[0],p[1]]
    //         db.run(query,values,(err)=>{
    //             console.log(err)
    //         })
    //     })
    //     init =true
    //    console.log(":: Estado padrão criado ::")
    // }

    

    console.log("base de dados criada!")
})




export default {db}





