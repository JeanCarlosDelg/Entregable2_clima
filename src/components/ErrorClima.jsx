import React from 'react'
import './styles/ErrorClima.css'

const ErrorClima = () => {
  return (
    <div className='container_error'>
        <h2 className='error_subtitle'>❌ el usuario debe conceder permisos de ubicacion 😵</h2>
        <h3 className='subError'>🙄 o buscar otra ubicacion 😉</h3>
    </div>
  )
}

export default ErrorClima