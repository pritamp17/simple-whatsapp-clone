import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import Messages from "./dbMessages.js"
import Pusher from "pusher"
import cors from "cors"

import ('dotenv').config()





///app configs
const app = express();
const port = process.env.PORT || 9000

const pusher = new Pusher({
    appId: process.env.appId,
    key: process.env.key,
    secret: process.env.secret,
    cluster: process.env.cluster,
    encrypted: true
  });

/// middlewares
app.use(express.json());
app.use(cors());

// app.use((req,res,next )=> {
//     res.setHeader("Access-Control-Allow-Origin","*");
//     res.setHeader("Access-Control-Allow-Origin","*");
//     next();
// });

////db configs..................
const connection_url = process.env.MONGO_URL;
mongoose.connect(connection_url,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

const db = mongoose.connection
db.once("open",()=>{
    console.log("DB connected");

    const msgCollection = db.collection("messageContent");
    const changeStream = msgCollection.watch();
    
    
    changeStream.on("change",(change)=>{
       
        console.log("changes made",change)

        if (change.operationType ==='insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages','inserted',{
                name:messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received,
                
            }
        
            );
           
        }
    else{
        console.log("err logging in")
    }
    });
    
    });
    


/// api routes
app.get('/',(req,res)=>res.status(200).send('hello world'))

app.get('/messages/sync', (req, res) => {
    Messages.find((err,data) => {
        if (err) {
            res.sendStatus(500).send(err)
        } else {
            res.send(data)
        }
    });
});



app.post('/messages/new',(req,res) =>{
    const dbMessage = req.body;

    Messages.create(dbMessage, (err, data) =>{
        if(err){
            res.sendStatus(500).send(err)
        }else{
            res.send(data)
        }
    })
})



app.listen(port,()=>console.log(` listening on localhost:${port}`))