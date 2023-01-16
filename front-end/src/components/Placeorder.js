import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';
import '../styles/Placeorder.css';
import StripeCheckout from 'react-stripe-checkout';

export default function Placeorder() {

    const [resturant,setResturant] = useState({});
    const [showover,setShowover] = useState(true);
    const para = useParams();
    console.log(para);

    const overshow = ()=>{
      setShowover(true);
    }
    const contentshow = ()=>{
      setShowover(false)
    }
     const resl = {
          par : para.resturant_id,
     }
    const payment = token =>{
      fetch('http://localhost:4000/info/checkout',{
        method:'POST',
        headers:{
           'Content-Type':'Application/json',
        },
        body:JSON.stringify(resl)
     })
     .then(res=>res.json())
     .then(data=>console.log(data))
    }
    useEffect(()=>{
      fetch("http://localhost:4000/info/resturant/" + para.resturant_id)
      .then(res=>res.json())
      .then(resturant => setResturant(resturant.data[0]))
    },[])

  return (     
    <div>
      <div className='image-main container'>
        <img src={"http://localhost:4000/info/images/"+ resturant.image}  className='image-side'></img>
      <div className='resturant-order'>
        <h1 className='rests-name'>{resturant.resturant_name}</h1>
        <StripeCheckout stripeKey="pk_test_51M9i2VSFb2Pv9Cz2vasG6V9TfBofGuNWr9cF5jdq4WbGEE2fTgj1felqasawxAkFqx2ljuyhX1dh7NLYdhtVUHNM0022WlJssx"
                 token={payment} name="Buying" description={resturant.cost} amount={resturant.cost} billingAddress shippingAddress>
                            <button className='btn btn-primary'>Place Order</button>
                    </StripeCheckout>
      </div>
      
      <div className='details-info'>
        <p className='overcont1 rests-name' onClick={overshow}>overview</p>
        <p className='overcont2 rests-name' onClick={contentshow}>content</p>
      </div>
      <hr/>
      {

         showover ?
      <div className="Overview">
            <div className='overview1'><p className='inside-overview1'>About this places</p></div>
            <div className='overview1'>
                <span className='inside-overview2'>Cuisine</span><br/>
                <span className='inside-overview3'>Bakery,Fast-Food</span>
            </div>
            <div className='overview1'>
                <span  className='inside-overview4'>Average Cost</span><br/>
                <span className="inside-overview5">{resturant.cost}  (approx)</span>
            </div>
      </div>
       :
      <div className="Content">
            <div className='overview1'>
                <span className='inside-overview1'>Phone Number</span><br/>
                <span className='inside-overview2'>+91 114004566</span>
            </div>
            <div className='overview1'>
                <span className='inside-overview3'>The Big Chill Bakery</span><br/>
                <span className='inside-overview4'>Shop 1,Plot D,Samruddhi,Chinchali</span><br/>
                <span className='inside-overview5'>{resturant.location_name}</span>
            </div>
          </div>
      
      }
      
      
      </div>
      
    </div>
  )
}

