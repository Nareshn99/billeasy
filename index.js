const express =require('express');
const dotenv =require( 'dotenv')
const router =require('./routes/route.js');


const app = express();

//config env
dotenv.config()



//middlewares
app.use(express.json());


app.use('/', router)

let PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Express app running on port>>>>>>>  ${PORT}`)
});