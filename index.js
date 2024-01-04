const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./routers/authRouter')
const app = express();
const port = process.env.PORT || 3000

app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true })); 
app.use('/api',authRouter)


// app.use('*', (req, res) => {
//     res.status(404).send({ message: 'Invalid route' });
//   });
  
app.listen(port, () => console.log('Server started on port 3000'));