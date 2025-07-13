import React from 'react'

function Input({ type, name, placeholder, values, handleChange, handleBlur, className }) {
  return (
    <div className="my-4">
      <input
        type={type || "text"}
        name={name}
        value={values[name]}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`
      ${className}
      w-full  px-4 py-2 rounded-full  border
      border-gray-300 focus:border-blue-500 focus:ring-2  focus:ring-blue-300 outline-none
      transition-all duration-300  shadow-sm bg-white placeholder-gray-400
    `}
      />
    </div>

  )
}

export default Input
