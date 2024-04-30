import React from 'react'

import style from './ButtonsContainer.module.css';

export default function ButtonsContainer({children}) {
  return (
    <div className={style.container}>
      {children}
    </div>
  )
}
