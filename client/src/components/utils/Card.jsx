import React from 'react'

import style from './Card.module.css'

export default function Card({children, className}) {
  return (
    <div className={`${style.card} ${className}`}>
      {children}
    </div>
  )
}
