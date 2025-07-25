import React,{useContext ,useEffect } from 'react';
import { MdFastfood } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { FaBagShopping } from "react-icons/fa6";
import {dataContext} from '../context/UserContext';
import { food_items } from '../food';
import {useSelector} from 'react-redux';

function Nav() {
    let{input,setInput, cate,setCate,showCart,setShowCart}=useContext(dataContext)
    useEffect(()=>{
     let newlist = food_items.filter(
  (item) =>
    item.food_name.includes(input) ||
    item.food_name.toLowerCase().includes(input.toLowerCase())
);

     setCate(newlist)
    },[input])
    let items=useSelector(state=>state.cart)
  return (
    <div className='w-full h-[100px] flex justify-between items-center px-5 md:px-8'>
        <div className='w-[60px] h-[60px] bg-white flex justify-center items-center rounded-md shadow-xl'>
            <MdFastfood  className='w-[30px] h-[30px] text-green-500'/>

        </div>
        <form  className='flex items-center bg-white px-4 py-2 rounded-full shadow-md  w-[45%] h-[50px] md:w-[70%]' onSubmit={(e)=>e.preventDefault()}>
        <IoIosSearch className='text-green-500 w-[20px] h-[20px] ' />
        <input type="text" placeholder="Search Items..." className='w-[100%] outline-none text-[216px] md:text-[20px]'  onChange={(e) => setInput(e.target.value)} value={input} />
        </form>
       
        <div className='w-[60px] h-[60px] bg-white flex justify-center items-center rounded-md shadow-xl relative cusror-pointer' onClick={()=>{
          setShowCart(true)
        }}>
            <span className="absolute top-0 right-2 text-green-500 font-bold text-[18px]">{items.length}</span>
           <FaBagShopping className='w-[30px] h-[30px] text-green-500' />

        </div>
      
    </div>
  );
}

export default Nav;
