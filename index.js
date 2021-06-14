const express = require("express")
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser")


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var BD = {
    todo: [
        {
            id: Date.now(),
            nome: "Tentar Conquistar o Mundo",
            done: false         
        },
        
        {
            id: Date.now(),
            nome: "Aprender React Native",
            done: true         
        },
       
        
    ]
}


app.get("/todos", (req, res) => {
    res.statusCode = 200
    res.json(BD.todo)
    
})

app.get("/todo/:id", (req, res) => {

    if (isNaN(req.params.id)) {
        res.sendStatus(404)
    } else {
        let id = Number(req.params.id)
        let filtroTodos = BD.todo.find((i) => i.id === id)

        if (filtroTodos != undefined) {
            res.statusCode = 200
            res.json(filtroTodos)
        } else {
            res.sendStatus(400)
        }
    }
})

app.post("/todo", (req, res) => {
    let { id, nome,done } = req.body

    BD.todo.push({
        id,
        nome,
        done

        

    })
    res.sendStatus(200)
    //res.json(jogo)

})


app.delete("/todo/:id", (req, res) => {
    let id = req.params.id

    if (isNaN(id)) {
        res.sendStatus(404)
    } else {
        id = Number(id)

        let ind = BD.todo.findIndex((i) => i.id == id)

        if (ind == -1) {
            res.sendStatus(404)
        } else {
            BD.todo.splice(ind, 1)
            res.sendStatus(200)
        }

    }
})

app.put("/todo/:id", (req, res) => {

    if (isNaN(req.params.id)) {
        res.sendStatus(404)
    } else {
        let id = Number(req.params.id)
        let filtroTodos = BD.todo.find((i) => i.id === id)

        if (filtroTodos != undefined) {
            let { id, nome, done } = req.body


            if (nome != undefined) {
                filtroTodos.nome = nome

            }
            
            if (id != undefined) {
                filtroTodos.id = id

            }
            if (id != undefined) {
                filtroTodos.done = done

            }
            

            res.sendStatus(200)

        } else {
            res.sendStatus(400)
        }
    }



})


 



app.listen(process.env.PORT || 8080, () => {
    console.log("rodando na pota 8080")
})
