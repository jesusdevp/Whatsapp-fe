import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { signUpSchema } from "../../utils/validation";
import { AuthInput } from "./AuthInput";
import { useDispatch, useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { changeStatus, registerUser, resetError } from "../../features/userSlice";
import { Picture } from "./Picture";
import axios from "axios";

const cloud_secret = import.meta.env.VITE_CLOUD_SCRET
const cloud_name = import.meta.env.VITE_CLOUD_NAME

export const RegisterForm = () => {

    const { status, error } = useSelector((state) => state.user)
    const [ picture, setPicture ] = useState()
    const [ redeablePicture, setRedeablePicture ] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(signUpSchema)
  });

  useEffect(() => {
    
    return () => {
        if( error ) dispatch( resetError() )
    }
  }, [])
  

  const onSubmit = async data => {

    dispatch(changeStatus('loading'))

    if( picture ) {
        
        let res;

        await uploadImage().then( async (response) => {
            res = await dispatch( registerUser({ ...data, picture: response.secure_url }) )
            if(res?.payload?.user) {
                navigate('/')
            }
        })

    } else {

        let res;

        res = await dispatch( registerUser({ ...data, picture: '' }) )
        if(res?.payload?.user) {
            navigate('/')
        }
    }
  }

  const uploadImage = async () => {
    let formData = new FormData();

    formData.append('upload_preset', cloud_secret);
    formData.append('file', picture);

    const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${ cloud_name }/image/upload`, formData)

    return data;
  }

  return (
    <div className='min-h-screen w-full flex items-center justify-center overflow-hidden' >
        <div className='w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl'>

            <div className='text-center dark:text-dark_text_1' >
                <h2 className='mt-6 text-3xl font-bold'> Welcome </h2>
                <p className='mt-2 text-sm' >Sign up</p>
            </div>

            <form 
               className='mt-6 space-y-6'
               onSubmit={ handleSubmit(onSubmit) }
            >
                <AuthInput 
                    name='name'
                    type='text'
                    placeholder='Full Name'
                    register={ register }
                    error={ errors?.name?.message }
                />

                <AuthInput 
                    name='email'
                    type='text'
                    placeholder='Email address'
                    register={ register }
                    error={ errors?.email?.message }
                />

                <AuthInput 
                    name='estatus'
                    type='text'
                    placeholder='Status (Optional)'
                    register={ register }
                    error={ errors?.status?.message }
                />

                <AuthInput 
                    name='password'
                    type='password'
                    placeholder='Password'
                    register={ register }
                    error={ errors?.password?.message }
                />

                <Picture 
                    redeablePicture={ redeablePicture }
                    setPicture={ setPicture }
                    setRedeablePicture={ setRedeablePicture }
                />

                {
                    error && <div>
                        <p className='text-red-400'>
                            { error }
                        </p>
                    </div>
                }
               
                <button 
                    type='submit'
                    className='w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full
                        font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300'
                >
                    { status === 'loading'  ? <SyncLoader color="#fff" size={ 12 } /> : 'Sign up' }
                </button>

                <p className='flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1' >
                    <span>Have an account</span>
                    <Link 
                        to='/login'
                        className=' hover:underline cursor-pointer transition ease-in duration-300'
                    >
                        Sign in
                    </Link>
                </p>
            </form>
        </div>
    </div>
  )
}
