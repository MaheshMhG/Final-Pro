import React, { useEffect, useState, useHistory } from 'react'
import { useParams } from 'react-router-dom';
import '../styles/Detailitem.css';
import StripeCheckout from 'react-stripe-checkout';
function Detailitem() {
 const [data,setData] = useState([])
 const [tokens,setTokens] = useState('');
 const par = useParams()


const resl = {
   par : par.resturant_id,
}
 const Ontoken = (token) =>{
      setTokens(token)
 }
 function idNumber(){
   fetch('http://localhost:4000/info/checkout',{
      method:'POST',
      headers:{
         'Content-Type':'Application/json'
      },
      body:JSON.stringify(resl)
   })
   .then(res=>res.json())
   .then(data=>console.log(data))
 }
 useEffect(()=>{
      idNumber()
      fetch('http://localhost:4000/info/fooddet/'+par.resturant_id)
      .then(res=>res.json())
      .then(data=>setData(data.data))
 },[tokens])
  return (
              <div className='main1'>
               {
                data.map(itms=>(
                    <div className='foodit'>
                     <div>
                        <img src={"http://localhost:4000/info/images/" + itms.fdimage} className='img1'></img>
                     </div>
                    <div key={itms.foodid} className='list-name'>Item:{itms.fooditem}</div>
                    <div key={itms.foodid} className='list-name'>Rating:{itms.rating}</div>
                    <div key={itms.foodid} className='list-name'>Cost:{itms.charge}</div>
                    <StripeCheckout stripeKey="pk_test_51M9i2VSFb2Pv9Cz2vasG6V9TfBofGuNWr9cF5jdq4WbGEE2fTgj1felqasawxAkFqx2ljuyhX1dh7NLYdhtVUHNM0022WlJssx"
                 token={Ontoken} name="Buying" description={itms.charge} amount={itms.charge} billingAddress shippingAddress>
                            <button className='btn btn-primary'>Place Order</button>
                    </StripeCheckout>
                    </div>
                ))
               }
            
              </div>
  )
                  }
export default Detailitem