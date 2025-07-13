import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { loginValidationSchema } from './validation/validate'
import Button from '../../ui/buttons/Button'
import { loginData } from '../../constant'
import { useNavigate } from 'react-router-dom'
import Input from '../../ui/Inputs/Input'

function LoginForm() {
    const navigate = useNavigate()
    const onSubmitForm = (val, action) => {
        console.log(val);
        if (val.email === "staff@clinic.com" && val.password === "123456") {
            alert("login success")
            navigate('/calendar')
            localStorage.setItem('name', val.email)
        } else {
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
    useEffect(() => {
        if (localStorage.getItem('name')) {
            navigate('/calendar')
        }
    }, [])
    return (
        <div
            className="min-h-screen flex justify-center items-center bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQKbPwJ4--5HtZkTOv1BmgHX13Zx704OKXmg&s')",
            }}
        >
            <form
                onSubmit={handleSubmit}
                className="backdrop-blur-md bg-white/70 shadow-lg rounded-xl p-6 sm:p-10 w-[90%] max-w-md"
            >
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login Form</h1>

                {loginData.map((item, index) => (
                    <div key={index} className="mb-4">
                        <Input
                            placeholder={item.placeholder}
                            className={`w-full border rounded px-3 py-2 focus:outline-none ${errors[item.name] && touched[item.name]
                                    ? "border-red-600"
                                    : "border-green-600"
                                }`}
                            handleBlur={handleBlur}
                            values={values}
                            handleChange={handleChange}
                            type={item.type}
                            name={item.name}
                        />
                        {errors[item.name] && touched[item.name] && (
                            <p className="text-red-500 text-sm mt-1">{errors[item.name]}</p>
                        )}
                    </div>
                ))}

                <Button text="Login Here" type="submit" />
            </form>
        </div>

    )
}

export default LoginForm
