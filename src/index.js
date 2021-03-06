/**
 * Inicialização de pacotes externos : node_modules
 */
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

/**
 * Inicialização de variáveis globais
 */
const app = express();
const router = express.Router();
const mongoUrl = process.env.DB;

/**
 * Importa rotas locais
 */
const user = require('./routes/User');
const doctor = require('./routes/Doctor');
const medicalClinic = require('./routes/MedicalClinic')

/**
 * Composição do app com json e cors.
 */
app.use(express.json());
app.use(cors());

/**
 * conecta com o mongo passando url e configurações
 */
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(() => {})

// verifica se a conexão foi realizada com sucesso.
mongoose.connection.on('connected', () => {
    console.log('Aplicação conectada ao banco de dados');
});


/**
 * Cadastra subrota /user baseado em User.js
 */
app.use('/user', user);
app.use('/doctor', doctor);
app.use('/medicalClinic', medicalClinic);

/**
 * Define rota de entrada
 */
app.use(router.get('/', (req, res) => {
    return res.send("ONLINE");
}));


// configura porta 
app.set('PORT', process.env.PORT || 3333);

var server = null;

if (process.env.NODE_ENV !== 'test') {  
    // startar o servidor
    server = app.listen(app.get('PORT'), () => {
        console.log(`Server running on port ${app.get('PORT')}`)
    });
} 

module.exports = {
    server,
    mongoose,
    app
}
