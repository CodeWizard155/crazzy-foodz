import React,{useContext, useState } from 'react';
import Nav from '../components/Nav'
import categories from '../Category';
import Card from '../components/Card';
import { food_items } from '../food';
import {dataContext} from '../context/UserContext'
import { ImCross } from "react-icons/im";
import Card2 from '../components/Card2'; // update the path as needed
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';






function Home() {
  let {cate,setCate,input,showCart,setShowCart}=useContext(dataContext)
function filter(category){
  if(category=="All"){
    setCate(food_items)
  }else{
    let newList= food_items.filter((item)=>(item.food_category===category))
    setCate(newList)
  }
}  
let items=useSelector(state=>state.cart)
let subtotal=items.reduce((total,item)=>total+item.qty*item.price,0)
let deliveryFee=20;
let taxes=subtotal*0.5/100;
let total=Math.floor(subtotal+deliveryFee+taxes)
  return (
    <div className="bg-slate-300 w-full min-h-[100vh]">
        
    
    
    <Nav/>
    {!input? <div className="flex flex-wrap justify-center items-center gap-5 w-[100%]">
        {categories.map((item)=>{
            return <div className='w-[140px] h-[150px] bg-white flex flex-col items-start  g-5 p-5 justify-start text-[20px] font-semibold text-gray-600 rounded-lg shadow-xl hover:bg-green-200 cursor-pointer transition-all duration-150' onClick={()=>filter(item.name)}>
               
                {item.icon}
                 {item.name}
                </div>
        }
        )}
    </div>:null}
    
    <div className="w-full flex flex-wrap gap-2 px-5 justify-center items-center pt-8 pb-8">
      {cate.length>1?cate.map((item)=>(
        <Card name={item.food_name} image={item.food_image}
        price={item.price} id={item.id} type={item.food_type}/>
      )):<div className="text-center text-2xl text-green-500 font-semibold pt-5">No Dish Found</div>}
      
    </div>
    <div className={`w-full md:w-[40vw] h-[100%] fixed top-0 right-0 bg-white shadow-xl p-6 overflow-auto transition-all duration-500 ${showCart?"translate-x-0":"translate-x-full"} `}>
      <header className="w-[100%] flex justify-between items center  ">
<span className='text-green-400 text-[18px] font-semibold'>Order Items</span>
<span className='text-green-400 text-[18px] font-semibold w-[30px] h[30px] cursor-pointer hover:text-gray-600'onClick={()=>setShowCart(false)}>
  <ImCross />
</span>
      </header>
      {items.length>0?<>
      <div className="w-full mt-8 flex flex-col gap-2 ">
        {items.map((item)=>(
          <Card2 name={item.name} price={item.price} image={item.image} id={item.id} qty={item.qty}/>
        ))}
      </div>
      <div className='w-full border-t-2 border-b-2 border-gray-400 mt-3 flex flex-col gap-2 p-2'>
<div className='w-full flex justify-between items-center'>
  <span className='text-lg text-gray-600 font-semibold'>Subtotal</span>
  <span className='text-green-400 font-semibold text-lg'>Rs{subtotal}/-</span>
</div>
<div className='w-full flex justify-between items-center'>
  <span className='text-lg text-gray-600 font-semibold'>Delivery Fee</span>
  <span className='text-green-400 font-semibold text-lg'>Rs{deliveryFee}/-</span>
</div>
<div className='w-full flex justify-between items-center'>
  <span className='text-lg text-gray-600 font-semibold'>Taxes</span>
  <span className='text-green-400 font-semibold text-lg'>Rs{taxes}/-</span>
</div>
       

      </div>
      <div className='w-full flex justify-between items-center '>
        <span className='text-lg text-gray-600 font-semibold'>Total</span>
        <span className='text-green-400 font-semibold text-lg'>Rs{total}/-</span>

      </div>
      <button className="w-[100%]  p-3 bg-green-500 rounded-lg text-white hover:bg-green-400 transition-all"onClick={()=>toast.success("order placed")}>Place Order</button></>:
      <div className="text-center text-2xl text-green-500 font-semibold pt-5">Empty Cart</div>}
      
    </div>
    </div>
  );
}

export default Home;
