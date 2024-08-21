import { IoCartSharp } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie"


const CustomerHeader = () => {
  const [cookies, setCookies, removeCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const handleLogout = () => {
    try {

      removeCookies("access_token");
      alert("Logout successfully");
      navigate('/');
    } catch (error) {
      console.log(error);
      alert("Logout failed");
    }
  }
  return (
    <div>
      <div className='flex items-center justify-between bg-emerald-700 px-3 py-3'>
        <h2 className='text-white text-2xl font-semibold cursor-pointer'>
          FroschBoardgame
        </h2>
        <div className='flex items-center justify-center gap-6'>
          <Link to="/cart">
            <IoCartSharp className='size-8 text-white' />
          </Link>
          <button className='rounded-full p-2 text-white font-semibold hover:underline'
            onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>
    </div>
  )
}

export default CustomerHeader
