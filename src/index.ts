import express,{Request, Response} from 'express';
import { envs } from './config/envs';
import { dbConnection } from './db/init';
import { Homework } from './db/models/user.model';

const server = express();
server.use(express.json())


console.log (envs.MYSQL_NAME)
dbConnection();

//Ruta para getear todos

server.get("/todos",async (req:Request,res:Response)=>{

try {
    const homeworks = await Homework.findAll();
    console.log ("Se mostraron todos");
    res.json (homeworks);

} catch (error) {
    console.log (`Que pedo ${error}`)
}

})

server.get("/todos/id", async (req:Request, res:Response) =>{



})

server.post("/", async (req:Request,res:Response)=>{

try {
    const {id,tittle, descripcion, completed} = req.body;
    const newHomework = await Homework.create ({
        id: id,
        tittle: tittle,
        descripcion: descripcion,
        completed : completed
        
    });

    res.json({newHomework})

} catch (error) {
    console.log("Error en la creacion de la tarea")
    
}
    const {tittle, description, completed} = req.body;
    console.log(tittle)
    console.log(description)
    console.log(completed)

    res.send({message:"Body leido"})
})


server.listen(3001,()=>{
    console.log("Escuchando en puerto 3001");
});