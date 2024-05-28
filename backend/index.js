const connectToMongo = require('./config');
connectToMongo();
const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors())

const port = 5000
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/',(req, res)=>{
  res.send('<h1 style="color:red;">I am index page</h1>');
})

app.listen(port, () => {
  console.log(`iNotebook App listening on port ${port}`)
})