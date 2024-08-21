import { FaRegTrashAlt } from "react-icons/fa";


interface ICartItem {
    imageUrl: string,
    productName: string,
    description: string,
    cartId: number,
    price: number,
    quantity: number,
    handleAddItem: (cartId: number) => void,
    handleRemoveItem: (cartId: number) => void,
    handleDeleteCartItem: (cartId: number) => void,
}

const CartItem = (props: ICartItem) => {
    const { imageUrl, productName, description, cartId, price, quantity, handleAddItem, handleRemoveItem, handleDeleteCartItem } = props
    return (
        <>
            <div className='p-2 w-full h-32 flex items-center shadow-lg'>
                <div className='w-32 h-32'>
                    <img src={imageUrl} alt="product_image"
                        className='w-full h-full object-scale-down' />
                </div>
                <div className='px-4 py-2 w-full'>
                    <p className='capitalize text-lg font-semibold'>
                        {productName}
                    </p>
                    <p className='font-normal text-sm'>
                        {description}
                    </p>
                    <p className='font-normal text-sm'>
                        Price: {price}
                    </p>
                    <div className="mt-1 w-full flex items-center justify-between">

                        <div className='flex items-center gap-3'>
                            <button
                                className='w-6 h-6 font-bold text-base border border-red-600 text-red-600 bg-white hover:bg-red-600 hover:text-white'
                                onClick={() => handleAddItem(cartId)}>
                                +
                            </button>
                            <span>{quantity}</span>
                            <button
                                className='w-6 h-6 font-bold text-base border border-red-600 text-red-600 bg-white hover:bg-red-600 hover:text-white'
                                onClick={() => handleRemoveItem(cartId)}>
                                -
                            </button>
                        </div>

                        <button className="text-red-500 bg-white hover:text-white hover:bg-red-500"
                            onClick={() => handleDeleteCartItem(cartId)}>
                            <FaRegTrashAlt />
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default CartItem
