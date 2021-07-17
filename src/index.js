const express = require('express');

const app = express();

app.use(express.json());

app.get('/disciplinas', (request, response) => {
    const query = request.query;
    return response.json(query);
})

app.get('/disciplinas/:id', (request, response) => {
    const { id } = request.params;

    if(id!=='tecnologia'){
        return response.status(400).json({mensagem: 'Não foi possível processar sua requisição.'})
    }

    return response.json({id});
})

app.post('/disciplinas', (request, response) => {
    const body = request.body;
    return response.json(body);
})

app.put('/disciplinas', (request, response) => {
    return response.json({
        message: 'Modificar disciplina!'
    })
})

app.delete('/disciplinas', (request, response) => {
    return response.json({
        message: 'Remover disciplina!'
    })
})

app.listen(3000);