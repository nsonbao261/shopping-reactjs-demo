import { Link, useSearchParams } from "react-router-dom";
import { CustomerHeader } from "../../../components"

const PaymentResult = () => {

    const [searchParams] = useSearchParams();
    const paymentStatus = searchParams.get("paymentStatus");
    return (
        <>
            <CustomerHeader />

            <div className="flex flex-col min-h-screen items-center justify-center bg-slate-100">
                <div className='px-20 py-12 min-w-[40%] bg-white flex flex-col items-center justify-center gap-12'>
                    <h2 className='text-2xl font-semibold'>
                        YOUR PAYMENT IS
                        {
                            paymentStatus == "0" ? " SUCCESS" : " FAILED"
                        }
                    </h2>

                    <img src={
                        paymentStatus == "0"
                            ? 'https://logowik.com/content/uploads/images/check-badge8301.logowik.com.webp'
                            : 'https://t3.ftcdn.net/jpg/05/77/95/38/360_F_577953883_zBPvFb7h53kH4EORs7Cy8C1iTlrBP6lQ.jpg'
                    } className="size-32" />

                    <Link to="/home" className='text-white text-center bg-gray-800 font-medium text-sm px-5 py-3 rounded-lg hover:bg-gray-600 w-full'>
                        Back To Home
                    </Link>
                </div>
            </div>
        </>
    )
}

export default PaymentResult
