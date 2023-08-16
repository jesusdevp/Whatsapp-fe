import { RegisterForm } from "../components/auth/RegisterForm"


export const Register = () => {
  return (
    <div className='min-h-screen w-full dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden' >
      <div className='flex w-[1600px] mx-auto h-full' >

          <RegisterForm />
      </div>
    </div>
  )
}
