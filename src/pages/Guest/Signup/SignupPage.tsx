import { SyntheticEvent, useState } from 'react'
import { DefaultHeader } from '../../../components'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [avatar, setAvatar] = useState()

  const handleAvatarChange = (e: any) => {
    if (e.target.files[0] != null) {
      setAvatar(e.target.files[0]);
    }
  }

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()
    if (passwordConfirmation != password) {
      alert('Passwords do not match');
      return
    }

    try {
      var imageUrl;
      const formData = new FormData();
      if (avatar != undefined) {
        formData.append("file", avatar)
        const res = await axios.post<any>('http://localhost:3000/api/upload', formData)
        imageUrl = res.data.downloadUrl
      }
      await axios.post('http://localhost:3000/api/auth/signup', {
        email,
        firstName,
        lastName,
        gender,
        password,
        avatar: imageUrl,
        role: "Customer",
      },).then(() => {
        alert("Signup successfully")
        navigate("/");
      })
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <DefaultHeader />
      <div className='min-h-screen bg-slate-100 flex flex-col justify-center items-center'>
        <div className='px-20 py-12 min-w-[40%] bg-white flex flex-col items-center justify-center'>
          <h2 className='text-2xl font-semibold'>
            Sign up
          </h2>

          <form className='mt-6 space-y-4 w-full' onSubmit={onSubmit}>

            <div className='flex flex-col items-center cursor-pointer'>
              <img src={
                avatar == null
                  ? 'https://i.pinimg.com/originals/e2/7c/87/e27c8735da98ec6ccdcf12e258b26475.png'
                  : URL.createObjectURL(avatar)
              } alt="avatar_preview"
                className='size-32 object-cover rounded-full' />

              <label htmlFor="avatar"
                className='text-gray-600 font-semibold mt-2 cursor-pointer hover:text-emerald-600'>
                Choose your avatar
              </label>
              <input type="file" accept='image/*' name="avatar" id="avatar"
                onChange={handleAvatarChange} hidden />
            </div>

            <div>
              <label htmlFor="email" className='text-xs text-gray-600'>Email</label>
              <div className='flex items-center relative'>
                <input type="text" placeholder='Enter your email' id="email" name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full mt-1 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 px-2 py-1 text-gray-400' required />
              </div>
            </div>

            <div>
              <label htmlFor="firstName" className='text-xs text-gray-600'>First Name</label>
              <div className='flex items-center relative'>
                <input type="text" placeholder='Enter your first name' id="firstName" name="firstName"
                  onChange={(e) => setFirstName(e.target.value)}
                  className='w-full mt-1 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 px-2 py-1 text-gray-400' />
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className='text-xs text-gray-600'>Last Name</label>
              <div className='flex items-center relative'>
                <input type="text" placeholder='Enter your last name' id="lastName" name="lastName"
                  onChange={(e) => setLastName(e.target.value)}
                  className='w-full mt-1 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 px-2 py-1 text-gray-400' />
              </div>
            </div>

            <div>
              <label className='text-xs text-gray-600'>Gender</label>
              <div className='flex w-full justify-between items-center mt-1'>
                <div className='flex items-center gap-1'>
                  <input type="radio"
                    onChange={(e) => setGender(e.target.value)}
                    value="female" id='gender' name='gender' className='w-4 h-4' />
                  <label htmlFor="female" className='text-xs text-gray-600'>Female</label>
                </div>
                <div className='flex items-center gap-1'>
                  <input type="radio"
                    onChange={(e) => setGender(e.target.value)}
                    value="male" id='gender' name='gender' className='w-4 h-4' />
                  <label htmlFor="male" className='text-xs text-gray-600'>Male</label>
                </div>
                <div className='flex items-center gap-1'>
                  <input type="radio"
                    onChange={(e) => setGender(e.target.value)}
                    value="other" id='gender' name='gender' className='w-4 h-4' />
                  <label htmlFor="other" className='text-xs text-gray-600'>Other</label>
                </div>
              </div>
            </div>


            <div>
              <label htmlFor="password" className='text-xs text-gray-600'>Password</label>
              <div className='flex items-center relative'>
                <input type='password' placeholder='Enter your password' id="password" name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full mt-1 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 px-2 py-1 text-gray-400' required />
              </div>
            </div>

            <div>
              <label htmlFor="password-confirmation" className='text-xs text-gray-600'>Password Confirmation</label>
              <div className='flex items-center relative'>
                <input type='password' placeholder='Enter your password' id="password-confirmation" name="password-confirmation"
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  className='w-full mt-1 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 px-2 py-1 text-gray-400' required />
              </div>
            </div>



            <button className='text-white bg-gray-800 font-medium text-sm px-5 py-2 rounded-lg hover:bg-gray-600 w-full' type='submit'>
              Sign up
            </button>

            <p className='text-gray-800 text-sm text-center'>
              Already have an account? <a className='ml-2 font-semibold hover:underline' href="./">Login</a>
            </p>

          </form>
        </div>
      </div>
    </>
  )
}

export default SignupPage
