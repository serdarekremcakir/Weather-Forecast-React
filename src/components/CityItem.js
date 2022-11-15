import React from 'react'
import { useNavigate } from 'react-router-dom';

const CityItem = (props) => {

    const navigate = useNavigate();


    const clickHandle = () => {
        navigate(`city/${props.id}-${props.name}`)
    }


    return (

        <div className=' flex items-center justify-center w-1/2 lg:w-1/4 py-3  '>
            <button
                className=' relative flex items-center justify-center    rounded-2xl py-4 px-1 hover:bg-gray-800 transition-all group lg:w-1/2 w-11/12 min-w-[130px] bg-white hover:text-white'
                onClick={clickHandle}>
                <div className='absolute right-1 top-1 bg-cyan-900 text-white rounded-2xl px-2 text-sm font-semibold'>
                    {props.id < 10 ? `0${props.id}` : props.id}
                </div>
                <span className='px-2 group-hover:font-bold text-lg font-semibold overflow-hidden'>{props.name}</span>

            </button>

        </div>

    )
}

export default CityItem