import express, {Express, Request, Router, Response} from 'express'
import Product from '../schemas/Product'
const router:Router = express.Router()


router.get('/', async(req:Request, res:Response)=> {
    const allProducts = await Product.find()
    return res.send({
        allProducts: [...allProducts]
    })
})

router.post('/add', async(req:Request, res:Response) => {

    type bodyParams = {
        name:String,
        price:Number,
        amount:Number,
        prodDate:String,
        category:String,
        description:String
    }

    let {
        name,
        price,
        amount,
        prodDate,
        category,
        description
    }:bodyParams = req.body

    const product = new Product({
        name,
        price,
        amount,
        prodDate,
        category,
        description
      })
      await product.save()  
      return res.send(req.body);
    
})

router.put('/:id/edit', async(req:Request, res:Response)=> {
    type editParams = {
        name?:String,
        price?:Number,
        amount?:Number,
        prodDate?:String,
        category?:String,
        description?:String
    }
    const updateObject:editParams = req.body
    const id = req.params.id;
    await Product.updateOne({_id:`${id}`},{$set: {...updateObject}})
    return res.send({
      putUserId: id
    });

})

router.delete('/:id', async(req:Request, res:Response)=> {
    const id = req.params.id;
    await Product.deleteOne({_id: `${id}`})
    return res.send({
      deletedUserId: id
    });
  
})
export default router;