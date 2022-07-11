import { Schema, model } from "mongoose";

const productSchema:Schema = new Schema({
    name:{
        type:String,
        required: true,
        maxLength: 100
    },
    price:{
        type: Number,
        required: true,
        min: [0, 'Price has to be greater than 0']
    },
    amount:{
        type: Number,
        required: true,
        min: [0, 'Amount has to be greater than 0']
    },
    prodDate:{
        type:Date,
        required: true,
    },
    category:{
        type:String,
        required: true,
        enum:['smartphones', 'laptops', 'displays']
    },
    description:{
        type:String,
        required: false,
        maxLength: 200
    }
})

export default model('Product', productSchema)
