const express = require("express")
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser")


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//const port = 3000
/**------------------------------------------- */
const events = require('events');
const myEmitter =  new events.EventEmitter();

function sse(req,res,next){
    // Setamos as headers para indicar um SSE e evitar cache
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        'Connection': 'keep-alive'
      });

        

        myEmitter.on('cancelamento_pedido', ()=>{
            // Iniciamos o envio da notificacao
            res.write("event: notiticacao\n");
            res.write('data: {"user_id": "1", "tipo": "cancelamento_pedido"}');
            res.write("\n\n");

        })

        myEmitter.on('new_message', ()=>{
            // Iniciamos o envio da notificacao
            res.write("event: notiticacao\n");
            res.write('data: {"user_id": "1", "tipo": "new_message"}');
            res.write("\n\n");
        })
}
 
 
app.get('/', (req, res) => {
    res.send('Home')
}


app.get('/events',sse, (req, res) => {
  res.send('Hello World!')
})



app.get('/pedidos/cancelamento', (req,res)=>{

    /**
     * Aqui vai toda a possível rotina para
     * receber o cancelamento do pedido 
     * e atualizar no banco de dados;
     */

    myEmitter.emit('cancelamento_pedido');
    res.send('Hello World!')
})

// app.get('/pedidos/novo', (req,res)=>{
  app.get('/message/new', (req,res)=>{

    /**
     * Aqui vai toda a possível rotina para
     * receber o cancelamento do pedido 
     * e atualizar no banco de dados;
     */

  


    myEmitter.emit('new_message');
    res.send('Hello World!')
})

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })

app.listen(process.env.PORT || 8080, () => {
  console.log("rodando na pota 8080")
})
