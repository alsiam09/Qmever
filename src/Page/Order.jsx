import { getDatabase, ref, set, onValue } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Order = () => {

    const db = getDatabase();
    const [orders, setOrders] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [OrderStatus, setOrderStatus] = useState('');
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
        const itemsx = orders.flatMap(order => order?.orderStatus?.orderStatus);
        setOrderItems(items)
        setOrderStatus(itemsx)
    }, [orders]); // Trigger this effect when orders change
    
        
    // console.log(OrderStatus);
    
    console.log(orderItems , "fuck");


    return (
        <div className='text-[#fff] container mx-auto ' >
            <div className=" w-[100%] lg:h-[80px] bg-[#f8f6f6] rounded-[10px] my-[40px] flex flex-wrap justify-around items-center ">
                <h5 className=' w-[100%] lg:w-[10%] px-[15px] border-[#000] border-[3px] h-[30px] lg:h-[40px] flex justify-start lg:justify-center my-[1px] items-center lg:rounded-[10px] bg-[#000] text-[14px] lg:text-[17px] font-[600] hover:text-[#000] hover:bg-[#fff] hover:border-[3px] cursor-pointer hover:border-[#000] ' >All</h5>
                <h5 className=' w-[100%] lg:w-[10%] px-[15px] border-[#000] border-[3px] h-[30px] lg:h-[40px] flex justify-start lg:justify-center my-[1px] items-center lg:rounded-[10px] bg-[#000] text-[14px] lg:text-[17px] font-[600] hover:text-[#000] hover:bg-[#fff] hover:border-[3px] cursor-pointer hover:border-[#000] ' >Processing</h5>
                <h5 className=' w-[100%] lg:w-[10%] px-[15px] border-[#000] border-[3px] h-[30px] lg:h-[40px] flex justify-start lg:justify-center my-[1px] items-center lg:rounded-[10px] bg-[#000] text-[14px] lg:text-[17px] font-[600] hover:text-[#000] hover:bg-[#fff] hover:border-[3px] cursor-pointer hover:border-[#000] ' >Confirmed</h5>
                <h5 className=' w-[100%] lg:w-[10%] px-[15px] border-[#000] border-[3px] h-[30px] lg:h-[40px] flex justify-start lg:justify-center my-[1px] items-center lg:rounded-[10px] bg-[#000] text-[14px] lg:text-[17px] font-[600] hover:text-[#000] hover:bg-[#fff] hover:border-[3px] cursor-pointer hover:border-[#000] ' >Picking</h5>
                <h5 className=' w-[100%] lg:w-[10%] px-[15px] border-[#000] border-[3px] h-[30px] lg:h-[40px] flex justify-start lg:justify-center my-[1px] items-center lg:rounded-[10px] bg-[#000] text-[14px] lg:text-[17px] font-[600] hover:text-[#000] hover:bg-[#fff] hover:border-[3px] cursor-pointer hover:border-[#000] ' >Shipped</h5>
                <h5 className=' w-[100%] lg:w-[10%] px-[15px] border-[#000] border-[3px] h-[30px] lg:h-[40px] flex justify-start lg:justify-center my-[1px] items-center lg:rounded-[10px] bg-[#000] text-[14px] lg:text-[17px] font-[600] hover:text-[#000] hover:bg-[#fff] hover:border-[3px] cursor-pointer hover:border-[#000] ' >Delivered</h5>
                <h5 className=' w-[100%] lg:w-[10%] px-[15px] border-[#000] border-[3px] h-[30px] lg:h-[40px] flex justify-start lg:justify-center my-[1px] items-center lg:rounded-[10px] bg-[#000] text-[14px] lg:text-[17px] text-[red] font-[600] hover:text-[red] hover:bg-[#fff] hover:border-[3px] cursor-pointer hover:border-[red] ' >Cancelled</h5>
            </div>
            {
                orderItems.map((item , index_M) => (
                 
                    item.cartItem !== undefined
                        ?
                        <div className=" my-[20px] ">
                                <div className=" flex justify-between">
                                    <div className="prode border-[#ffffff78] border-[2px] rounded relative w-[100%] lg:w-[80%]">
                                        <div className="">
                                            {OrderStatus.map((item , index)=>(
                                                <h2 className='text-[#0d9e17] text-[17px] w-[120px] flex justify-center text-[600] absolute top-[10px] right-[10px] rounded-[30px] bg-[#ffffff60]  py-[5px]'>{index === index_M ? item : "" }</h2>
                                            ))}
                                            <h2 className='text-[#ff1586] text-[17px] w-[200px] flex justify-center text-[600] absolute top-[10px] right-[140px] rounded-[30px] bg-[#ffffff1f]  py-[5px]'>{item.totalPrice.toFixed(2)}৳</h2>
                                        </div>
                                        {item?.cartItem?.map((ItemPro) => (
                                            <div className="m-[10px] flex gap-[20px] items-center">
                                                <img className='md:w-[100px] w-[80px]' src={ItemPro.imgurl} alt="" />
                                                <h2 className='text-[11px] md:text-[17px] text-[#000] ' >{ItemPro.Prodectname}</h2>
                                                <h2 className='text-[11px] md:text-[17px] text-[#000] ' >{ItemPro.Price}৳</h2>
                                            </div>

                                        ))}
                                    </div>
                                    <div className="lg:w-[20%] w-[0px] flex items-center justify-end">
                                    {
                                                OrderStatus.map((orderStatus , index)=>(
                                                     <div className=" hidden lg:block ">
                                                        <h5 className={` ${index !== index_M ? "hidden" : "block" } flex justify-start rounded-[30px] mx-[10px] my-[5px] ${orderStatus === "Delivered" && " bg-[green] text-[#fff] "} ${orderStatus === "Shipped" && " bg-[green] text-[#fff] "} ${orderStatus  === "Dispatched" && " bg-[green] text-[#fff] "} ${orderStatus === "Picking" && " bg-[green] text-[#fff]"} ${orderStatus === "Confirmed" && "bg-[green] text-[#fff] "} ${orderStatus  === "Processing" && "bg-[green] text-[#fff]"} text-[#000] py-[10px] px-[30px] text-[17px] font-[600]`}>Processing</h5>
                                                        <h5 className={` ${index !== index_M ? "hidden" : "block" } flex justify-start rounded-[30px] mx-[10px] my-[5px] ${orderStatus === "Delivered" && " bg-[green] text-[#fff] "} ${orderStatus === "Shipped" && " bg-[green] text-[#fff] "} ${orderStatus  === "Dispatched" && " bg-[green] text-[#fff] "} ${orderStatus === "Picking" && " bg-[green] text-[#fff]"} ${orderStatus === "Confirmed" && "bg-[green] text-[#fff] "} text-[#000] py-[10px] px-[30px] text-[17px] font-[600]`}>Confirmed</h5>
                                                        <h5 className={` ${index !== index_M ? "hidden" : "block" } flex justify-start rounded-[30px] mx-[10px] my-[5px] ${orderStatus === "Delivered" && " bg-[green] text-[#fff] "} ${orderStatus === "Shipped" && " bg-[green] text-[#fff] "} ${orderStatus  === "Dispatched" && " bg-[green] text-[#fff] "} ${orderStatus === "Picking" && " bg-[green] text-[#fff]"}  text-[#000] py-[10px] px-[30px] text-[17px] font-[600]`}>Picking</h5>
                                                        <h5 className={` ${index !== index_M ? "hidden" : "block" } flex justify-start rounded-[30px] mx-[10px] my-[5px] ${orderStatus === "Delivered" && " bg-[green] text-[#fff] "} ${orderStatus === "Shipped" && " bg-[green] text-[#fff] "} text-[#000] py-[10px] px-[30px] text-[17px] font-[600]`}>Shipped</h5>
                                                        <h5 className={` ${index !== index_M ? "hidden" : "block" } flex justify-start rounded-[30px] mx-[10px] my-[5px] ${orderStatus === "Delivered" && " bg-[green] text-[#fff] "} text-[#000] py-[10px] px-[30px] text-[17px] font-[600]`}>Delivered</h5>
                                                        </div> 
                                                        ))
                                                }
                                    </div>
                                </div>
                            </div>
                            :
                            <div className=" my-[20px] ">
                                <div className=" flex justify-between">
                                    <div className="prode border-[#ffffff78] border-[2px] rounded relative w-[100%] lg:w-[80%]">
                                        <div className="">
                                        {OrderStatus.map((item , index)=>(
                                                <h5 className='text-[#0d9e17] text-[17px] w-[120px] flex justify-center text-[600] absolute top-[10px] right-[10px] rounded-[30px] bg-[#ffffff60]  py-[5px]'>{index === index_M ? item : "" }</h5>
                                            ))}
                                            <h5 className='text-[#ff1586] text-[17px] w-[200px] flex justify-center text-[600] absolute top-[10px] right-[140px] rounded-[30px] bg-[#0000001f]  py-[5px]'>{item.Price}৳</h5>
                                        </div>
                                        <div className="m-[10px] flex gap-[20px] items-center">
                                            <img className='md:w-[100px] w-[80px]' src={item.imgurl} alt="" />
                                            <h5 className=' text-[11px] md:text-[17px] text-[#000] ' >{item.Prodectname}</h5>
                                            <h5 className=' text-[11px] md:text-[17px] text-[#000] ' >{item.Price}৳</h5>
                                        </div>
                                    </div>
                                    <div className="lg:w-[20%] w-[0px] flex items-center justify-end">
                                        {
                                                OrderStatus.map((orderStatus , index)=>(
                                                     <div className=" hidden lg:block ">
                                                        <h5 className={` ${index !== index_M ? "hidden" : "block" } flex justify-start rounded-[30px] mx-[10px] my-[5px] ${orderStatus === "Delivered" && " bg-[green] text-[#fff] "} ${orderStatus === "Shipped" && " bg-[green] text-[#fff] "} ${orderStatus  === "Dispatched" && " bg-[green] text-[#fff] "} ${orderStatus === "Picking" && " bg-[green] text-[#fff]"} ${orderStatus === "Confirmed" && "bg-[green] text-[#fff] "} ${orderStatus  === "Processing" && "bg-[green] text-[#fff]"} text-[#000] py-[10px] px-[30px] text-[17px] font-[600]`}>Processing</h5>
                                                        <h5 className={` ${index !== index_M ? "hidden" : "block" } flex justify-start rounded-[30px] mx-[10px] my-[5px] ${orderStatus === "Delivered" && " bg-[green] text-[#fff] "} ${orderStatus === "Shipped" && " bg-[green] text-[#fff] "} ${orderStatus  === "Dispatched" && " bg-[green] text-[#fff] "} ${orderStatus === "Picking" && " bg-[green] text-[#fff]"} ${orderStatus === "Confirmed" && "bg-[green] text-[#fff] "} text-[#000] py-[10px] px-[30px] text-[17px] font-[600]`}>Confirmed</h5>
                                                        <h5 className={` ${index !== index_M ? "hidden" : "block" } flex justify-start rounded-[30px] mx-[10px] my-[5px] ${orderStatus === "Delivered" && " bg-[green] text-[#fff] "} ${orderStatus === "Shipped" && " bg-[green] text-[#fff] "} ${orderStatus  === "Dispatched" && " bg-[green] text-[#fff] "} ${orderStatus === "Picking" && " bg-[green] text-[#fff]"}  text-[#000] py-[10px] px-[30px] text-[17px] font-[600]`}>Picking</h5>
                                                        <h5 className={` ${index !== index_M ? "hidden" : "block" } flex justify-start rounded-[30px] mx-[10px] my-[5px] ${orderStatus === "Delivered" && " bg-[green] text-[#fff] "} ${orderStatus === "Shipped" && " bg-[green] text-[#fff] "} text-[#000] py-[10px] px-[30px] text-[17px] font-[600]`}>Shipped</h5>
                                                        <h5 className={` ${index !== index_M ? "hidden" : "block" } flex justify-start rounded-[30px] mx-[10px] my-[5px] ${orderStatus === "Delivered" && " bg-[green] text-[#fff] "} text-[#000] py-[10px] px-[30px] text-[17px] font-[600]`}>Delivered</h5>
                                                        </div> 
                                                        ))
                                                }
                                    </div>
                                </div>
                            </div>
                    
                ))

            }

        </div>
    )
}

export default Order