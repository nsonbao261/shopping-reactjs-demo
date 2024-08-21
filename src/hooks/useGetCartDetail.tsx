import { useEffect, useState } from "react"
import { useGetToken } from "./useGetToken";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export interface ICartItemDetail {
    productName: string,
    price: number,
    description: string,
    imageUrl: string,
    quantity: number,
    cartId: number,
    stockQuantity: number,
    productId: number,
}

export interface ICartDetail {
    cartItems: ICartItemDetail[],
    totalQuantity: number,
    totalAmount: number,
}

export const useGetCartDetail = () => {
    const [cartDetails, setCartDetails] = useState<ICartDetail>();
    const navigate = useNavigate();

    const access_token = useGetToken();

    const fetchCartDetail = async () => {
        try {
            if (!access_token) {
                alert("Unauthorization");
                navigate("/");
                return;
            }
            const response = await axios.get<any>("http://localhost:3000/api/cart/cart-details",
                {
                    headers: { Authorization: "Bearer " + access_token }
                }
            );
            setCartDetails(response?.data?.cartDetail as ICartDetail);
        } catch (error) {
            console.log(error);
            alert("Cannot get cart details");
        }
    }

    useEffect(() => {
        fetchCartDetail();
    }, []);

    return { cartDetail: cartDetails, refreshCart: fetchCartDetail };
}