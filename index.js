'use strict'
import express from 'express'
import cors from 'cors'
const app = express();
let notas = [
  {
    'id': 1,
    'content': "Tengo que cortarme el pelo",
    'importante': false
  },
  {
    'id': 2,
    'content': "Tengo que estudiar para la entrevista",
    'importante': true
  },
  {
    'id': 3,
    'content': "Tengo que hacer el punto de venta",
    'importante': true
  },
]

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
  return res.status(200).send({
    notas
  })
})

app.get('/notas/:id',(req,res)=>{
  const { id } = req.params;

  const notaFind = notas.find(note => note.id === Number(id))
  if(!notaFind){
    return res.status(400).send({
      msg:"No se encontro esta nota"
    })
  }
  return res.status(200).send({
    notaFind
  })
})

app.post('/nota',(req,res)=>{
  const { content,importante } = req.body;

  const newNote = {
    content,
    importante,
    id: (notas.length + 1)

  }

  notas = [...notas, newNote ]

  return res.status(200).send({
    newNote
  })
})

app.listen(3000,()=>{
  console.log(`Servidor levantado en el puerto: ${3000}`)
})

