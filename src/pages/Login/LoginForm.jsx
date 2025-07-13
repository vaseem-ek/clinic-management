import React, { useEffect } from 'react'
import {  useFormik } from 'formik'
import { loginValidationSchema } from './validation/validate'
import Button from '../../ui/buttons/Button'
import { loginData } from '../../constant'
import { useNavigate } from 'react-router-dom'
import Input from '../../ui/Inputs/Input'

function LoginForm() {
  const navigate=useNavigate()
    const onSubmitForm = (val,action) => {
        console.log(val);
        if(val.email==="staff@clinic.com" && val.password==="123456"){
          alert("login success")
          navigate('/calendar')
          localStorage.setItem('name',val.email)
        }else{
          alert("invalid cridentials")
        }
        action.resetForm()
    }
    const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: loginValidationSchema,
        onSubmit: onSubmitForm
    }) 
    useEffect(()=>{
        if(localStorage.getItem('name')){
            navigate('/calendar')
        }
    },[])
    return (
        <div className='flex justify-center items-center h-screen'>
            <form onSubmit={handleSubmit} className='shadow w-md rounded  p-10'>
              <h1 className='text-2xl font-bold'>Login Form</h1>
                {
                    loginData.map((item, index) => (
                        <div key={index}>

                            <Input  placeholder={item.placeholder} className={`${errors[item.name] && touched[item.name] ? "border border-red-600":"border border-green-600" }`} handleBlur={handleBlur} values={values} handleChange={handleChange} type={item.type} name={item.name} />
                            {errors[item.name] && touched[item.name] && (
                                <p className="text-red-500 text-sm">{errors[item.name]}</p>
                            )}

                        </div>
                    ))
                }
                <Button text={"Login Here"} type={"submit"} />
            </form>
        </div>
    )
}

export default LoginForm
