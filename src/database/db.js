import sqlite3 from 'sqlite3'

export const db = new sqlite3.Database(/*"./src/database/*/"database.db")

const tables=[
    {
        title:"category",
        body:{
            id:'INTEGER  PRIMARY KEY AUTOINCREMENT NOT NULL',
            name:'VARCHAR(45)',
            fkey:[]
        }
    },
    {
        title:"buy",
        body:{
            id:' INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL',
            value: 'FLOAT ',
            buyDate:'DATE ',
            description:'TEXT',
            category_id:'INTEGER',
            fkey:['category']
        }
    },

    {
        title:"period",
        body:{
            id:'INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL',
            type:'VARCHAR(45) NOT NULL',
            fkey:[]
        }
    },

    {
        title:"status",
        body:{
            id:'INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL',
            name:'VARCHAR(45) NOT NULL',
            fkey:[]
        }
    },

    {
        title:"bill",
        body:{
            id:'INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL',
            title:'VARCHAR(45)',
            dateCreate: 'DATE NOT NULL',
            dateEnded:'DATE',
            valueSum:'FLOAT',
            valueLimit:'FLOAT',
            description:'TEXT',
            status_id: 'INTEGER',
            period_id: 'INTEGER',
            fkey:['status','period']
            
        }
    },
    {
        title:"have",
        body:{
            id:'INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL',
            name:'VARCHAR(45)',
            bill_id:'INTEGER',
            buy_id:'INTEGER',
            fkey:['bill','buy'/*,'user'*/]
        }
    },
    
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


db.serialize(() => {
    tables.forEach(t=>{
        db.run(`CREATE TABLE IF NOT EXISTS ${t.title}(
                ${getBody(t)}
            );
        `)
        console.log('Tabela <',t.title,'> Criada!')
    })
   
    const query = `INSERT INTO category(name) VALUES(?);`       
    const values = ["Transporte" ]
    function afterInsertData(err){
            if(err){
                    return console.log(err)
            } 
            console.log("Cadastrado com sucesso!")
            console.log(this) 
            
            ////////////////////////////
             db.all(`SELECT * FROM category `, (err,rows)=>{
                    if(err){
                        return console.log(err)
                    } 
                    console.log("Aqui estão os Registros:")
                    console.log(rows)
                })


    }

    db.run(query, values, afterInsertData)

    console.log("base de dados criada!")
})








export default {db}





