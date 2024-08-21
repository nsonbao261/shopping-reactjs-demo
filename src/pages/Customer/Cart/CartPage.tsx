import { CustomerHeader } from '../../../components'
import { ICartDetail, useGetCartDetail } from '../../../hooks/useGetCartDetail'
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import CartItem from '../../../components/Card/CartItem';
import OrderModal from '../../../components/Modal/OrderModal';
import 'react-toastify/dist/ReactToastify.css'


const CartPage = () => {
    const { cartDetail, refreshCart } = useGetCartDetail();

    const handleAddItem = async (cartId: number) => {
        const cart = cartDetail?.cartItems?.find((element) => element.cartId == cartId);
        console.log(cart)
        if (!cart) {
            alert("Cart item not found");
            return;
        }
        if (cart.quantity == cart.stockQuantity) {
            alert("Out of stock");
            return;
        }
        const response = await axios.put(`http://localhost:3000/api/cart/${cartId}`, {
            cartQuantity: cart.quantity + 1,
        })
        if (response.status != 200) {
            alert("Update failed");
            return
        }

        toast.success('Item added successfull');
        refreshCart();
    }

    const handleRemoveItem = async (cartId: number) => {
        const cart = cartDetail?.cartItems?.find((element) => element.cartId == cartId);
        console.log(cart)
        if (!cart) {
            alert("Cart item not found");
            return;
        }

        if (cart.quantity == 1) {
            await axios.delete(`http://localhost:3000/api/cart/${cartId}`)
                .catch((error) => {
                    console.log(error);
                    alert("Cart item deleted failed");
                })
        }
        const response = await axios.put(`http://localhost:3000/api/cart/${cartId}`, {
            cartQuantity: cart.quantity - 1,
        })
        if (response.status != 200) {
            alert("Update failed");
            return
        }
        refreshCart();

    }
    const handleDeleteCartItem = async (cartId: number) => {
        const cart = cartDetail?.cartItems?.find((element) => element.cartId == cartId);
        console.log(cart)
        if (!cart) {
            alert("Cart item not found");
            return;
        }

        await axios.delete(`http://localhost:3000/api/cart/${cartId}`)
            .catch((error) => {
                console.log(error);
                alert("Cart item deleted failed");
            })
        refreshCart();

    }

    return (
        <>
            <CustomerHeader />
            <div className='min-h-screen bg-slate-100 flex flex-col px-20 py-12 items-center'>
                <div className='w-full grid grid-cols-4 gap-3'>
                    <div className='w-full px-4 py-4 col-span-3 bg-white'>
                        <div className='text-2xl font-semibold text-gray-700 w-full bg-white p-4 border-b-2 border-solid'>
                            These are cart items
                        </div>
                        {cartDetail && (
                            cartDetail?.cartItems?.sort(
                                (item1, item2) => {
                                    if (item1.productName > item2.productName)
                                        return 1;
                                    if (item1.productName < item2.productName)
                                        return -1;
                                    return 0;
                                }
                            ).map((item) => (
                                <CartItem
                                    cartId={item.cartId}
                                    description={item.description}
                                    imageUrl={item.imageUrl}
                                    productName={item.productName}
                                    quantity={item.quantity}
                                    price={item.price}
                                    handleAddItem={() => handleAddItem(item.cartId)}
                                    handleRemoveItem={() => handleRemoveItem(item.cartId)}
                                    handleDeleteCartItem={() => handleDeleteCartItem(item.cartId)} />
                            ))
                        )}

                    </div>

                    <div className='w-full col-span-1 flex flex-col items-center justify-start px-2 py-4'>
                        <div className='w-full px-4 py-4 bg-white flex flex-col items-center justify-between gap-8'>
                            <div className='font-semibold text-2xl text-red-600 text-center border-b-2 border-solid w-full p-4'>
                                CART SUMMARY
                            </div>

                            <div className='font-medium w-full flex flex-col justify-between items-center gap-6'>
                                <p className='w-full flex justify-between items-center'>
                                    Total quantity:
                                    <span className='text-red-400'>{cartDetail?.totalQuantity}</span>
                                </p>

                                <p className='w-full flex justify-between items-center'>
                                    Total amount:
                                    <span className='text-red-400'>{cartDetail?.totalAmount}</span>
                                </p>
                            </div>
                            {cartDetail &&
                                <OrderModal
                                    cartItems={cartDetail.cartItems}
                                    totalAmount={cartDetail.totalAmount}
                                    totalQuantity={cartDetail.totalQuantity}
                                    refreshCart={refreshCart}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartPage
