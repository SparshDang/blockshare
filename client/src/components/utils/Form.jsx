import React from 'react'

import style from './Form.module.css';

export default function Form({children, onSubmit}) {
  return (
    <form className={style.form} onSubmit={onSubmit}>
    {children}
    </form>
  )
}
