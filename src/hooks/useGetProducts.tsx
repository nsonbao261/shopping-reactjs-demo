import axios from 'axios';
import { useEffect, useState } from 'react';
import { useGetToken } from './useGetToken';
import { useNavigate } from 'react-router-dom';

export const useGetProducts = () => {
    const [products, setProducts] = useState([]);

    const access_token = useGetToken();
    const navigate = useNavigate();
    const fetchProduct = async () => {
        try {
            if (!access_token) {
                alert("Unauthorization");
                navigate("/");
                return;
            }
            const fetchProducts = await axios.get<any>('http://localhost:3000/api/product',
                {
                    headers: { Authorization: "Bearer " + access_token }
                }
            )
            setProducts(fetchProducts.data.products);
        } catch (error) {
            console.log(error);
            alert('Something went wrong');
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [])

    return { products };
}

