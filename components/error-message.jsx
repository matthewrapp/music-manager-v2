import React from 'react'

const ErrorMessage = ({ children, className }) => {
  return (
    <div
        className={`
            text-red-500 text-sm uppercase mt-4
            ${className && className}
        `}
    >
        {children}
    </div>
  )
}

export default ErrorMessage