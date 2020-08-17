import sqlite3 from 'sqlite3'

const db = new sqlite3.Database("datababae.db")

const tables=[
    {
        title:"category",
        body:{
            idcategory:'INTEGER auto_increment NOT NULL',
            name:'VARCHAR(45)',
            fkey:[]
        }
    },
    {
        title:"buy",
        body:{
            idbuy:'INTEGER auto_increment NOT NULL',
            name:'VARCHAR(45)',
            value: 'FLOAT',
            buyDate:'DATE',
            description:'TEXT',
            fkey:['category']
        }
    },

    {
        title:"period",
        body:{
            idperiod:'INTEGER auto_increment NOT NULL',
            type:'VARCHAR(45)',
            fkey:[]
        }
    },

    {
        title:"status",
        body:{
            idstatus:'INTEGER auto_increment NOT NULL',
            name:'VARCHAR(45)',
            fkey:[]
        }
    },

    {
        title:"bill",
        body:{
            idbill:'INTEGER auto_increment NOT NULL',
            title:'VARCHAR(45)',
            dateCreate: 'DATE',
            dateEnded:'DATE',
            valueSum:'FLOAT',
            valueLimit:'FLOAT',
            description:'TEXT',
            fkey:['status','period']
            
        }
    },
    {
        title:"have",
        body:{
            idhave:'INTEGER auto_increment NOT NULL',
            name:'VARCHAR(45)',
            fkey:['bill','buy'/*,'user'*/]
        }
    },
    
    //* rever a tabela user
    // {
    //     title:"user",
    //     body:{
    //         iduser:'INTEGER auto_increment NOT NULL',
    //         userName:'VARCHAR(45)',
    //         password:'VARCHAR(45)',
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
    text+= `CONSTRAINT ${t.title}_pkey PRIMARY KEY (${id}),\n`
    if(t.body.fkey.length>0){
        for(let i of t.body.fkey)
            text+= `CONSTRAINT ${i}_fkey FOREIGN KEY (id${i})
            REFERENCES ${i}(id${i})
            ,\n`

    }
    return text.slice(0,text.length-2)
}


db.serialize(() => {
    tables.forEach(t=>{
        db.run(`
            CREATE TABLE IF NOT EXISTS ${t.title}(
                ${getBody(t)}
            );
        `)
        console.log('Tabela <',t.title,'> Criada!')
    })
})
