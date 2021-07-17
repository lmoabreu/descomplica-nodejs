const express = require('express');

const app = express();

app.use(express.json());

function monitorarRequisicoes(request, response, next) {
    const { method, url, params, body, query } = request;
    const texto = `[${method} - ${url} - params: ${JSON.stringify(params)} - body ${JSON.stringify(body)} - query = ${JSON.stringify(query)}}]`;
    console.log(texto);
    return next();
}

// Para usar em todas requisições
// app.use(monitorarRequisicoes);

// Para usar em um grupo de requisições
app.use('/disciplinas', monitorarRequisicoes);

// Para usar em uma requisição específica
// app.get('/disciplinas', monitorarRequisicoes, (request, response) => {
// });

app.get('/disciplinas', monitorarRequisicoes, (request, response) => {
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