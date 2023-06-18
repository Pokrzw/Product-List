import express, {Express, response} from 'express';
import mongoose from 'mongoose';
import { Issuer } from "openid-client";
import { IDProvider } from './kcprovider';


IDProvider({
  url:"http://localhost:8080/realms/realm1/.well-known/openid-configuration",
  client_id: "api-service",
  secret: "nQVa49z5h28OzTAfpkoO0kxWXCr887Xm"
})

const app: Express = express();

import products from './routes/product'
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use('/products', products)


const dbData = {
    host: 'mongodb',
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
    