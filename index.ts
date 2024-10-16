import express,{Request, Response} from 'express';

const server = express();

server.use(express.json())


server.get("/",(req:Request,res:Response)=>{
    console.log("Hola")
    res.send("Diego")
})

server.post("/",(req:Request,res:Response)=>{
    const body=req.body
    console.log(body)
    res.send({message:"Body leido"})
})

server.listen(3000,()=>{
    console.log("Escuchando en puerto 3000");
    console.log("Hola das")
    console.log("rnfibd")
});