import React from 'react'

function Button({type,text}) {
  return (
    <div>
          <button type={type} className="py-3 active:scale-95 w-full transition text-sm text-white rounded-full bg-slate-700"><p className="mb-0.5">{text}</p></button>

    </div>
  )
}

export default Button
