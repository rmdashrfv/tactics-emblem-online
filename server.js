const express  = require('express')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const sassMiddleware = require('node-sass-middleware')
const host = process.env.HOST || '127.0.0.1'
const app = express()
const PORT = 11200
const { Liquid } = require('liquidjs')
const engine = new Liquid({
  root: ['.', './views/layouts'],
  extname: '.liquid'
})

app.use(morgan('dev'))
app.engine('liquid', engine.express())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.set('views', './views')
app.set('view engine', 'liquid')
app.use(sassMiddleware({
  src: './assets/stylesheets',
  dest: path.join(__dirname, 'public'),
  debug: true,
  force: true,
  outputStyle: 'expanded'
}))

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render('home.liquid')
})

app.get('/profile', (req, res) => {
  res.render('profile.liquid')
})


app.listen(PORT, host, () => {
  console.log('running server')
})