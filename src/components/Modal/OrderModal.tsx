import { SyntheticEvent, useState } from 'react'
import { ICartDetail, ICartItemDetail, useGetCartDetail } from '../../hooks/useGetCartDetail'
import { useGetToken } from '../../hooks/useGetToken';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

interface IOrderModalProps {
    cartItems: ICartItemDetail[],
    totalAmount: number,
    totalQuantity: number,
    refreshCart: () => void,
}

const OrderModal = (props: IOrderModalProps) => {
    const [showModal, setShowModal] = useState(false);
    const token = useGetToken();


    const handleCreateOrder = async (event: SyntheticEvent) => {
        event.preventDefault();
        const carts = props.cartItems.map(cart => cart.cartId)
        await axios.post('http://localhost:3000/api/order', {
            paymentMethod: "Vnpay",
            description: "This is demo order",
            carts,
        }, {
            headers: {
                Authorization: "Bearer " + token,
            }
        }).then((res) => {
            if (res.status == 201) {
                alert("Order created");
                props.refreshCart(); 
            }
            console.log(res.data);
        }).catch((error) => {
            alert("Something went wrong");
            console.log(error)
        })
        setShowModal(false);
    }

    return (
        <>
            <button className='bg-red-700 text-white font-semibold hover:bg-red-400 p-2 w-full rounded-full'
                onClick={() => setShowModal(true)}>
                PURCHASE
            </button>
            {
                showModal &&
                <div className='flex justify-center items-center outline-none z-50 inset-0 overflow-x-hidden overflow-y-auto fixed h-screen w-screen backdrop-blur-lg overscroll-contain'>/
                    <div className='flex flex-col justify-center items-center bg-white p-8' role='dialog'>
                        <div className='w-full p-2 text-xl font-semibold shadow-lg border-b-2 border-solid'>
                            Order
                        </div>

                        <table className='table-auto'>
                            <thead>
                                <tr className='border border-solid'>
                                    <th className='px-3 py-2 font-semibold bg-slate-400 text-center'>Product Name</th>
                                    <th className='px-3 py-2 font-semibold bg-slate-400 text-center'>Image</th>
                                    <th className='px-3 py-2 font-semibold bg-slate-400 text-center'>Total Quantity</th>
                                    <th className='px-3 py-2 font-semibold bg-slate-400 text-center'>Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.cartItems.map((item) => (
                                        <tr className=''>
                                            <td className='px-3 py-2'>{item.productName}</td>
                                            <td className='px-3 py-2'>
                                                <img src={item.imageUrl} className='object-scale-down size-32' />
                                            </td>
                                            <td className='px-3 py-2 text-center'>{item.quantity}</td>
                                            <td className='px-3 py-2 text-center'>{item.quantity * item.price}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <div className='flex w-full justify-end items-center gap-10 px-20 py-4'>
                            <button className='font-semibold bg-emerald-600 text-white hover:bg-emerald-400 rounded-full py-2 px-4'
                                onClick={handleCreateOrder}>
                                SUBMIT
                            </button>
                            <button className='font-semibold bg-red-600 text-white hover:bg-red-400 rounded-full py-2 px-4'
                                onClick={() => setShowModal(false)}>
                                CANCEL
                            </button>
                        </div>
                    </div>

                </div>
            }
        </>
    )
}

export default OrderModal
