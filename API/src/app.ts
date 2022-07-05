import express, {Express, response} from 'express'
import mongoose from 'mongoose';
const app: Express = express();
import products from './routes/product'

app.use(express.json())
app.use('/products', products)


const dbData = {
    host: '127.0.0.1',
    port: 27017,
    database: 'products'
}

mongoose
    .connect(`mongodb://${dbData.host}:${dbData.port}/${dbData.database}`)
    .then((response) => {
        console.log('Connected to MongoDB');
        app.listen(5000, () => {
            console.log('API listening on port 5000');
            
        })
    })
    .catch(error => console.error('Error while connecting to MongoDB'))