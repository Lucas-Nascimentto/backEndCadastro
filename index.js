import express, { json } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors'

const prisma = new PrismaClient();
const port = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors())

app.get('/users', async (req, res) => {
    const users = await prisma.users.findMany();
    res.status(200).json(users);
});

app.post('/users', async (req, res) => {
   await prisma.users.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    });
    res.status(201).json(req.body);
});

app.put('/users/:id', async (req, res) => {
   await prisma.users.update({
    where: {
        id: req.params.id
       },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
   });
   res.status(201).json(req.body);
});

app.delete('/users/:id', async (req, res) => {
    await prisma.users.delete({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json({message: "Usuario deletado com sucesso"});
})

app.listen(port, () => {
    console.log(`Estou rodando na porta: ${port}`);
});