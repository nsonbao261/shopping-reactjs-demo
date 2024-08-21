import axios from 'axios';
import { useGetToken } from '../../hooks/useGetToken';
import { useGetCartDetail } from '../../hooks/useGetCartDetail';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';



interface Product {
  productName: string,
  productId: number,
  productCategory: string,
  description: string,
  minPlayer: number,
  maxPlayer: number,
  duration: number,
  imageUrl: string,
}

function ProductCard(props: Product) {
  const { productName, imageUrl, productCategory, description, minPlayer, maxPlayer, duration, productId }
    = props;

  const token = useGetToken()
  const { cartDetail, refreshCart } = useGetCartDetail()
  const addToCart = async () => {
    const cart = cartDetail?.cartItems.find((element) => element.productId == productId);
    if (cart && cart.quantity >= cart.stockQuantity) {
      alert('Out of stock');
      return;
    }
    const _data = {
      productId,
      cartQuantity: cart ? cart.quantity + 1 : 1,
    }

    console.log(_data)
    const response = await axios.post('http://localhost:3000/api/cart',
      {
        ..._data
      }, {
      headers: {
        Authorization: "Bearer " + token,
      }
    }
    )
    if (response.status != 201 && response.status != 200) {
      alert("Add cart item failed");
      return;
    }
    toast.success("Item added");
  }

  return (
    <div className='border border-gray-600 rounded-lg hover:border-emerald-600 flex flex-col justify-between items-center'>
      <ToastContainer />
      <img className='rounded-t-lg w-full h-56'
        src={imageUrl}
      />

      <div className='p-6 flex flex-col justify-between items-center'>
        <div className='font-semibold text-xl text-gray-600 cursor-pointer hover:text-emerald-600'>
          {productName}
        </div>
        <div className='font-normal text-gray-600 mt-1'>
          {productCategory}
        </div>
        <div className='font-normal text-gray-500 text-center'>
          {description}
        </div>

        <div className='flex justify-between w-full'>
          <p className='font-normal text-gray-500'>Player: {minPlayer} - {maxPlayer}</p>
          <p className='font-normal text-gray-500'>Duration: {duration} min</p>
        </div>
      </div>

      <button className="text-sm rounded-full border-gray-700 border-2 border-solid bg-white relative bottom-1 left-1 p-1 cursor-pointer hover:text-white hover:bg-gray-700 font-semibold w-[50%] my-2"
        onClick={addToCart}>
        Add to cart
      </button>
    </div>
  )
}

export default ProductCard