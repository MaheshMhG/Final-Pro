const client = require("../database/db.js");
const { Db } = require("mongodb");
const bcrypt = require("bcryptjs");
const path = require("path");
const { json } = require("body-parser");
const stripe = require('stripe')('sk_test_51MEo1eSF7b75FtVi3jsWuyJA7R8pYkgS9cRJm945fuVzEdBjfy2dWIF8rPetUNYhT4PZ8UCzSir4YVHhgcGXd26s00Z4M7xKkq')

let db;
client.connect((err)=>{
    
    if(err){
     console.log(err)
    }
    else{
        console.log("conn");
        db = client.db("locationinformation");
    }
})

module.exports = {
    user : async (req,res)=>{
        if(db){
             const fullname = req.body.fullname
             const password = req.body.password
            // console.log(await bcrypt.hash(password,2));
            let user = await db.collection("userinfo").findOne({fullname});
           //
           
           // console.log(user);
           // console.log(user.password);
          if(user){
             console.log("finded");
             if(await bcrypt.compare(password,user.password)){
                 res.send({status:200,message:"data is found"})
             }
             else{
                 res.send({status:400,message:"Invalid username or password"})
             }
          }
          else{
             res.send({status:400,message:"Invalid username or password"})
          }
            
         }
         else{
             res.send({status:500,message:"server side error that means api"})
         }
     },

     //creating account

     create :  async (req,res)=>{
        console.log(req.body);
        const { fullname , password , email } = req.body;
        console.log(password.length);
        if(password.length >6)
        {
           const  pass_encry = await bcrypt.hash(password,10);
           console.log(pass_encry);
           let items = {
             fullname : fullname,
             password : pass_encry,
             email : email
         }
         console.log(items);
     
         if(db){
             db.collection("userinfo").insertOne(items,(err,result)=>{
                 if(!err){
                     res.send({Status:200,message:"data is added to the database"});
                 }
                 else{
                     res.send({Status:400,message:"data is not added to the database"})
         
                 }
             })
            }
            else{
             res.send({status:500})
            }
         }
        else{
         res.send("password must conatain greater than 6")
        }
     },

     //

     image : async (req,res)=>{
        let imagescreen = req.params.image;
        const file = await path.join(__dirname,'../images/' + imagescreen);
        console.log('file ' + file);
        res.sendFile(file);
    },

    //
    locationinfo : async (req,response) => {
        if(db){
            console.log("object");
           await db.collection("locationdetail").find().toArray((err,res)=>{
                if(err){
                    response.send({status:"400"})
                }
                else
                { 
                     
                     response.send({data:res});
    
                     console.log("200");
                }
            })
        }
    },
    
    
   resturantname : async (req,response)=>{
        if(db){
            console.log("object");
           await db.collection("resturantdetail").find().toArray((err,res)=>{
                if(err){
                    response.send({status:"400"})
                }
                else
                { 
                     
                     response.send({data:res});
    
                     console.log("200");
                }
            })
        }
    },

    resturantname1 : async (req,res)=>{
        if(db){
           await db.collection("resturantdetail").find({location:req.params.location}).toArray((err,result)=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.send({status:200, data:result})
                }
            })
        }
    },
    
    resturant : async (req,res)=>{
        if(db){
           await db.collection("resturantdetail").find({resturant_id:req.params.resturant_id}).toArray((err,result)=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.send({status:200, data:result})
                }
            })
        }
    },

    filter : async (req,res) =>{
        if(db){
           await db.collection("resturantdetail").find({resturant_id:req.params.resturant_id,cusine:req.params.cusine}).toArray((err,result)=>{
                 if(err){
                    console.log(err);
                 }
                 else{
                    if(result.length>0){
                        res.send({status:200,message:"data is found",data:result})
                    }
                    else{
                        res.send({status:400,message:"not found"})
                    }
                 }
            })
        }
    },

    foodname : async (req,res)=>{
        if(db){
           await db.collection("fooddetails").find({resturant_id:req.params.resturant_id}).toArray((err,result)=>{
                if(err){
                    console.log(err);
                }
                else{
                    if(result.length>0){
                        res.send({status:200,message:"data is found",data:result})
                    }
                    else{
                        res.send({Status:400,message:"data is not found"});
                    }
                }
            })
        }
    },

    account : async (req,res)=>{
        console.log('account')
        const resturant_id = req.body.par;

        const product = await db.collection('fooddetails').findOne({resturant_id})
        console.log(product);
        stripe.charges.create({
            id_no : product.resturant_id,
            amount : product.charge,
            currency:'usd',
        },(strErr,strRes)=>{
            if(strErr){
                res.status(500).json(strErr)
            }
            else{
                res.status(200).json(strRes)
                console.log(strRes);
            }
        })      
    },

    scf : (req,res)=>{
        if(db){
            db.collection("resturantdetail").find(
                  {location:req.params.location,cusine:req.params.cusine,cost:{$gte : 500}}).toArray((err,result)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log(result);
                        res.send({status:200 , data:result})
                    }
                })
        }
    }

    

}

