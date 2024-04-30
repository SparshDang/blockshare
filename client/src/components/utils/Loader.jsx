import React from 'react'

import Overlay from './Overlay';

import style from './Loader.module.css';

export default function Loader() {
  return (
    <Overlay>
        <div className={style.loader}></div>
    </Overlay>
  )
}
