const express = require("express")
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser")


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var BD = {
    game: [
        {
            id: 1,
            nome: "GTA-Vs",
            price: 101010
        },
        {
            id: 2,
            nome: "Minecraftt",
            price: 202020
        },
        {
            id: 3,
            nome: "Need for speed",
            price: 303030
        }
    ]
}

var jogo = [
    {
        id: 1,
        nome: "GTA-6",
        price: 101010
    },
    {
        id: 2,
        nome: "Minecraft",
        price: 202020
    },
    {
        id: 3,
        nome: "Need for speed",
        price: 303030
    }

]



app.get("/games", (req, res) => {
    res.statusCode = 200
    res.json(BD.game)
    // res.send("ola")
})

app.get("/game/:id", (req, res) => {

    if (isNaN(req.params.id)) {
        res.sendStatus(404)
    } else {
        let id = Number(req.params.id)
        let filtroGames = BD.game.find((i) => i.id === id)

        if (filtroGames != undefined) {
            res.statusCode = 200
            res.json(filtroGames)
        } else {
            res.sendStatus(400)
        }
    }
})

app.post("/game", (req, res) => {
    let { id, nome, price } = req.body

    BD.game.push({
        id,
        nome,
        price

    })
    res.sendStatus(200)
    //res.json(jogo)

})


app.delete("/game/:id", (req, res) => {
    let id = req.params.id

    if (isNaN(id)) {
        res.sendStatus(404)
    } else {
        id = Number(id)

        let ind = BD.game.findIndex((i) => i.id == id)

        if (ind == -1) {
            res.sendStatus(404)
        } else {
            BD.game.splice(ind, 1)
            res.sendStatus(200)
        }

    }
})

app.put("/game/:id", (req, res) => {

    if (isNaN(req.params.id)) {
        res.sendStatus(404)
    } else {
        let id = Number(req.params.id)
        let filtroGames = BD.game.find((i) => i.id === id)

        if (filtroGames != undefined) {
            let { id, nome, price } = req.body


            if (nome != undefined) {
                filtroGames.nome = nome

            }
            if (price != undefined) {
                filtroGames.price = price

            }
            if (id != undefined) {
                filtroGames.id = id

            }
            

            res.sendStatus(200)

        } else {
            res.sendStatus(400)
        }
    }



})


 



app.listen(process.env.PORT || 8080, () => {
    console.log("rodando na pota 80")
})