import { getDatabase, ref, set, onValue } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Order = () => {

    const db = getDatabase();
    const [orders, setOrders] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [OrderStatus, setOrderStatus] = useState([]);
    const userUid = useSelector((state) => state.counter.user);

    useEffect(() => {
        const starCountRef = ref(db, 'orders/' + userUid);
        const unsubscribe = onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setOrders(data); // Directly set the orders from the database
            }
        });

        return () => unsubscribe(); // Cleanup the listener
    }, [db, userUid]); // Added userUid to dependency array

    useEffect(() => {
        // Flatten the orderItems from orders array
        const items = orders.flatMap(order => order.orderItem);
        setOrderItems(items)        

    }, [orders]); // Trigger this effect when orders change

    
    console.log(orderItems);


    return (
        <div className='text-[#fff] container mx-auto ' >
            {
                orderItems.map((item) => (
                    item?.BuyItem.map((items)=>(
                        items.cartItem !== undefined
                                ?
                                <div className=" my-[20px] ">
                                    <div className=" flex justify-between">
                                        <div className="prode border-[#ffffff78] border-[2px] rounded relative w-[80%]">
                                            <div className="">
                                                <h2 className='text-[#0d9e17] text-[17px] w-[120px] flex justify-center text-[600] absolute top-[10px] right-[10px] rounded-[30px] bg-[#ffffff60]  py-[5px]'>{item.orderStatus}</h2>
                                                <h2 className='text-[#ff1586] text-[17px] w-[200px] flex justify-center text-[600] absolute top-[10px] right-[140px] rounded-[30px] bg-[#ffffff1f]  py-[5px]'>{items.totalPrice.toFixed(2)}৳</h2>
                                            </div>
                                            {items.cartItem.map((ItemPro) => (
                                                    <div className="m-[10px] flex gap-[20px] items-center">
                                                    <img className='w-[50px]' src={ItemPro.imgurl} alt="" />
                                                    <h2>{ItemPro.Prodectname}</h2>
                                                    <h2>{ItemPro.Price}৳</h2>
                                                    </div>
                            
                                                ))}
                                            </div>
                                            <div className="w-[20%] flex items-center justify-end">
                                                <div className="">
                                                    <h2 className='text-[#fff] py-[10px] px-[30px] text-[17px] font-[600]'>Placed</h2>
                                                    <h2 className='text-[#fff] py-[10px] px-[30px] text-[17px] font-[600]'>Processing</h2>
                                                    <h2 className='text-[#fff] py-[10px] px-[30px] text-[17px] font-[600]'>Confirmed</h2>
                                                    <h2 className='text-[#fff] py-[10px] px-[30px] text-[17px] font-[600]'>Picking</h2>
                                                    <h2 className='text-[#fff] py-[10px] px-[30px] text-[17px] font-[600]'>Dispatched</h2>
                                                    <h2 className='text-[#fff] py-[10px] px-[30px] text-[17px] font-[600]'>Shipped</h2>
                                                    <h2 className='text-[#fff] py-[10px] px-[30px] text-[17px] font-[600]'>Delivered</h2>
                                                </div>
                                                <div className=" w-[10px] h-[100%] bg-[#fff] rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className=" my-[20px] ">
                                        <div className=" flex justify-between">
                                            <div className="prode border-[#ffffff78] border-[2px] rounded relative w-[80%]">
                                                    <div className="">
                                                <h2 className='text-[#0d9e17] text-[17px] w-[120px] flex justify-center text-[600] absolute top-[10px] right-[10px] rounded-[30px] bg-[#ffffff60]  py-[5px]'>{item.orderStatus}</h2>
                                                <h2 className='text-[#ff1586] text-[17px] w-[200px] flex justify-center text-[600] absolute top-[10px] right-[140px] rounded-[30px] bg-[#ffffff1f]  py-[5px]'>{items.Price}৳</h2>
                                                </div>
                                                        <div className="m-[10px] flex gap-[20px] items-center">
                                                        <img className='w-[50px]' src={items.imgurl} alt="" />
                                                        <h2>{items.Prodectname}</h2>
                                                        <h2>{items.Price}৳</h2>
                                                    </div>
                                                </div>
                                                <div className="w-[20%] flex items-center justify-end">
                                                    <div className="">
                                                        <h2 className='text-[#fff] py-[10px] px-[30px] text-[17px] font-[600]'>Placed</h2>
                                                        <h2 className='text-[#fff] py-[10px] px-[30px] text-[17px] font-[600]'>Processing</h2>
                                                        <h2 className='text-[#fff] py-[10px] px-[30px] text-[17px] font-[600]'>Confirmed</h2>
                                                        <h2 className='text-[#fff] py-[10px] px-[30px] text-[17px] font-[600]'>Picking</h2>
                                                        <h2 className='text-[#fff] py-[10px] px-[30px] text-[17px] font-[600]'>Dispatched</h2>
                                                        <h2 className='text-[#fff] py-[10px] px-[30px] text-[17px] font-[600]'>Shipped</h2>
                                                        <h2 className='text-[#fff] py-[10px] px-[30px] text-[17px] font-[600]'>Delivered</h2>
                                                    </div>
                                                    <div className=" w-[10px] h-[100%] bg-[#fff] rounded"></div>
                                                </div>
                                            </div>
                                        </div>
                            ))
                            ))
                            
                        }
                        
        </div>
    )
}

export default Order