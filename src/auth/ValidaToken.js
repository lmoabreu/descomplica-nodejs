const { verify } = require("jsonwebtoken");
const { ApplicationError } = require("../error/ApplicationError");

function validaToken(request, response, next) {
    const autorizationHeader = request.headers.authorization;

    if(!autorizationHeader) {
        throw new ApplicationError('Nenhum token enviado!', 403);
    }

    const [, token] = autorizationHeader.split(' ');

    try {
        const tokenDecodificado = verify(token, 'minha-chave-secreta');
        const { sub } = tokenDecodificado;

        request.user = sub;
        console.log(tokenDecodificado);

        return next();

    } catch {
        throw new ApplicationError('Erro ao verificar token!', 401);
    }
}

module.exports = {
    validaToken
}