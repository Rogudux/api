import express, { Request, Response } from 'express';
import { envs } from './config/envs';
import { dbConnection } from './db/init';
import { Homework } from './db/models/user.model';

const server = express();
server.use(express.json());

console.log(envs.MYSQL_NAME);
dbConnection();

// Ruta para obtener todas las tareas
server.get("/todos", async (req: Request, res: Response): Promise<void> => {
    try {
        const homeworks = await Homework.findAll();
        console.log("Se mostraron todos");
        res.json(homeworks);
    } catch (error) {
        console.error(`Error al obtener las tareas: ${error}`);
        res.status(500).json({ message: "Error al obtener las tareas" });
    }
});

// Ruta para obtener una tarea por ID
server.get("/todos/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid ID format" });
            return;
        }

        const homework = await Homework.findByPk(id);

        if (!homework) {
            res.status(404).json({ message: "Homework not found" });
            return;
        }

        res.json(homework);
    } catch (error) {
        console.error(`Error al obtener la tarea: ${error}`);
        res.status(500).json({ message: "Error al obtener la tarea" });
    }
});

// Ruta para crear una nueva tarea
server.post("/", async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, title, descripcion, completed } = req.body;

        const newHomework = await Homework.create({
            id,
            title,
            descripcion,
            completed
        });

        res.json(newHomework);
    } catch (error) {
        console.error("Error en la creación de la tarea:", error);
        res.status(500).json({ message: "Error al crear la tarea" });
    }
});

// Ruta para actualizar una tarea por ID
server.put("/todos/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid ID format" });
            return;
        }

        const { title, descripcion, completed } = req.body;

        const homework = await Homework.findByPk(id);

        if (!homework) {
            res.status(404).json({ message: "Homework not found" });
            return;
        }

        await Homework.update(
            { title, descripcion, completed },
            { where: { id } }
        );

        res.json({ message: "Homework updated successfully" });
    } catch (error) {
        console.error(`Error al actualizar la tarea: ${error}`);
        res.status(500).json({ message: "Error al actualizar la tarea" });
    }
});

// Ruta para eliminar una tarea por ID
server.delete("/todos/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid ID format" });
            return;
        }

        const homework = await Homework.findByPk(id);

        if (!homework) {
            res.status(404).json({ message: "Homework not found" });
            return;
        }

        await Homework.destroy({
            where: { id }
        });

        res.json({ message: "Homework deleted successfully" });
    } catch (error) {
        console.error(`Error al eliminar la tarea: ${error}`);
        res.status(500).json({ message: "Error al eliminar la tarea" });
    }
});

// Iniciar el servidor
server.listen(3001, () => {
    console.log("Escuchando en puerto 3001");
});
