import React, { useRef } from 'react'

import style from './FileInput.module.css'

export default function FileInput({retrieveImage, file}) {  
    const inputRef = useRef();  
    const onClick = () => {
        inputRef.current.click();
    }
    return (
        <>
        <div className={style.main} onClick={onClick}>
            {file ? file.name : "Choose File"}
        </div>
        <input type="file" name="file" id="file" onChange={retrieveImage} className={style.input} ref={inputRef} />
        </>
    )
}
