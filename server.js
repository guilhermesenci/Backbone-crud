//dependencies
var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

//DB sv connection
mongoose.connect('mongodb+srv://<login>:<password>@cluster0.ukzf3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')


//schema creation
var Schema = mongoose.Schema

var BlogSchema = new Schema({
    author: String,
    title: String,
    url: String
})

//blog model
mongoose.model('Blog', BlogSchema)

var Blog = mongoose.model('Blog')

var app = express()

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())

//Routes
app.get('/api/blogs', function (req, res) {
    Blog.find(function (err, docs) {
        docs.forEach(function (item) {
            console.log('Recebido uma requisição GET do _id: ' + item._id)
        })
        res.send(docs)
    })
})

app.post('/api/blogs', function (req, res) {
    console.log('Recbido uma requisição de POST')
    for (var key in req.body) {
        console.log(key + ': ' + req.body[key])
    }
    var blog = new Blog(req.body)
    blog.save(function (err, doc) {
        res.send(doc)
    })
})

app.delete('/api/blogs/:id', function (req, res) {
    console.log('Recibo pedido de deletar para o id:' + req.params.id)
    Blog.remove({ _id: req.params.id }, function (err) {
        res.send({ _id: req.params.id })
    })
})

app.put('/api/blogs/:id', function (req, res) {
    console.log('Recebido pedido de atualização para o id: ' + req.params.id)
    Blog.update({ _id: req.params.id }, req.body, function (err) {
        res.send({ _id: req.params.id })
    })
})

//local config
var port = 3000

app.listen(port)
console.log('server on ' + port)