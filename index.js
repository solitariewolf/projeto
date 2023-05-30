//nodemon main.js para iniciar o servidor
const express = require('express');
var bodyParser = require('body-parser')
const path = require('path');

const app = express();

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname,'public'))); //onde ficam arquivos estaticos como fotos
app.set('views', path.join(__dirname, '/views'));

var tarefas = ['arrumar o quarto', 'comprar no supermercado'];

app.post('/', (req,res)=>{
    console.log(req.body.tarefa);
})

app.get('/',(req,res)=>{

    res.render('index',{tarefasList:tarefas});

});

app.get('/deletar/:id',(req,res)=>{
    tarefas = tarefas.filter(function(val,index){
        if(index != req.params.id){
            return val;
        }
    })
})

app.listen(5000,()=>{
    console.log('server rodando');
})