import React, {forwardRef} from 'react';
import './GameBtn.css'

const GameBtn = forwardRef(({ color , onClick }, ref) => (
    <button className={`button ${color}`} ref={ref} onClick={onClick} color={color}/>
))

export default GameBtn