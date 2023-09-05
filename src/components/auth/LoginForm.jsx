import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { signInSchema } from "../../utils/validation";
import { AuthInput } from "./AuthInput";
import { useDispatch, useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { changeStatus, loginUser, resetError } from "../../features/userSlice";

export const LoginForm = () => {

  const { status, error } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(signInSchema)
  });

  useEffect(() => {
    
    return () => {
        
        if( error ) dispatch( resetError() )
    }
  }, [])

  const onSubmit = async data => {

    dispatch(changeStatus('loading'))

    const res = await dispatch(loginUser({ ...data }))

    if( res?.payload?.user ) { 
      navigate('/')
    }
    
  }

  return (
    <div className='h-screen w-full flex items-center justify-center overflow-hidden' >
        <div className='max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl'>

            <div className='text-center dark:text-dark_text_1' >
                <h2 className='mt-6 text-3xl font-bold'> Welcome back</h2>
                <p className='mt-2 text-sm' >Sign in</p>
            </div>

            <form 
               className='mt-6 space-y-6'
               onSubmit={ handleSubmit(onSubmit) }
            >
                <AuthInput 
                    name='email'
                    type='text'
                    placeholder='Email address'
                    register={ register }
                    error={ errors?.email?.message }
                />

                <AuthInput 
                    name='password'
                    type='password'
                    placeholder='Password'
                    register={ register }
                    error={ errors?.password?.message }
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
                    { status === 'loading'  ? <SyncLoader color="#fff" size={ 12 } /> : 'Sign in' }
                </button>

                <p className='flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1' >
                    <span>ou do not have an account ?</span>
                    <Link 
                        to='/register'
                        className=' hover:underline cursor-pointer transition ease-in duration-300'
                    >
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    </div>
  )
}
