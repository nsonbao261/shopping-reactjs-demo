import { CustomerHeader, DefaultHeader } from '../../../components'
import { useGetProducts } from '../../../hooks/useGetProducts'
import ProductCard from '../../../components/Card/ProductCard';

const CustomerHome = () => {

    const { products } = useGetProducts();
    return (
        <>
            <CustomerHeader />
            <div className='min-h-screen bg-slate-100 flex flex-col px-20 py-12 items-center'>
                <div className='w-full bg-white px-4 py-4'>
                    <h1 className='text-2xl font-semibold text-gray-700'>
                        Welcome to our shop
                    </h1>
                </div>
                <div className='w-full bg-white px-4 py-4 mt-4'>
                    <div className='text-2xl font-semibold text-gray-700 border-b-2 border-solid border-gray-700 p-2'>
                        These are our products
                    </div>

                    <div className='mt-8 grid grid-cols-3 gap-3'>
                        {
                            products && products.map((product: any) => (
                                <ProductCard
                                key={product?.productId}
                                    productName={product?.productName}
                                    productCategory={product?.categoryName}
                                    description={product?.description}
                                    minPlayer={product?.minPlayer}
                                    maxPlayer={product?.maxPlayer}
                                    duration={product?.duration}
                                    imageUrl={product?.imageUrl}
                                    productId={product?.productId} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomerHome
