import express from 'express'
import 'dotenv/config'
import bodyParser from 'body-parser'
import cors from 'cors'
import { v4 as uuidv4 } from 'uuid'

const app = express()
const port = process.env.PORT | 3000

const personas = []

app.use(cors())
app.use(bodyParser.json())

app.get('/all', (req, res) => {
    res.json({
        ok: true,
        personas
    })
})

app.get('/getbyid/:id', (req, res) => {
    res.json({
        ok: true,
        personas: personas.filter(persona => persona.id === req.params.id)
    })
})

app.post('/create', (req, res) => {
    const persona = req.body

    if (!persona.name) return res.json({ok: 'false'})
    if (!persona.cel) return res.json({ok: 'false'})
    if (!persona.email) return res.json({ok: 'false'})

    personas.push({
        id: uuidv4(),
        ...persona
    })

    res.json({
        ok: true,
        persona
    })
})

app.put('/update/:id', (req, res) => {
    const index = personas.findIndex(persona => persona.id === req.params.id)

    if (index === -1) return res.json({ok: 'false'})

    const new_persona = req.body

    if (!new_persona.name) return res.json({ok: 'false'})
    if (!new_persona.cel) return res.json({ok: 'false'})
    if (!new_persona.email) return res.json({ok: 'false'})  

    personas[index] = {
        id: req.params.id,
        ...new_persona
    }

    res.json({
        ok: true,
        persona: new_persona
    })
})

app.delete('/delete/:id', (req, res) => {
    const index = personas.findIndex(persona => persona.id === req.params.id)

    if (index === -1) return res.json({ok: 'false'})

    personas.splice(index, 1)

    res.json({
        ok: true
    })
})

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`)
})
