const express = require('express');
const multer = require('multer');
const { ApplicationError } = require('./error/ApplicationError');
const uploadConfig = require('./upload/uploadConfig');

const app = express();
const uploadMiddleware = multer(uploadConfig);

app.use(express.json());

app.use('/imagens', express.static(uploadConfig.directory));

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
        throw new ApplicationError('Disciplina não encontrada!', 404);
    }

    return response.json({id});
})

app.post('/disciplinas', uploadMiddleware.single('avatar'), (request, response) => {
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

app.use((error, request, response, next) => {
    if(error instanceof ApplicationError) {
        return response.status(error.httpStatusCode).json({message: error.mensagem});
    }

    return response.status(500).json({mensagem: 'Não foi possível processar sua requisição.'})

});

/*
app.post('/perfil', uploadMiddleware.single('avatar'), function (request, response, next){
})

app.post('/fotos/upload', uploadMiddleware.array('images', 12), function(request, response, next){
})

let cpUpload = uploadMiddleware.fields([{name: 'avatar', maxCount: 1}, {name: 'galeria', maxCount: 8}])
app.post('/imagem-perfil', cpUpload, function(request, response, next){
})
*/

app.listen(3000);