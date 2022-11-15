import React, { useEffect, useRef} from 'react'
import { useSelector } from 'react-redux'
import { getWeatherData, setApiKey } from '../utils';
import { FaKey } from "react-icons/fa";
import {  useLocation, useNavigate } from 'react-router-dom';

const Home = () => {
    const state = useSelector(state => state.api)
    const navigate = useNavigate();
    const history = useLocation();


    const buttonHandle = () => {
        getWeatherData()
    }

    useEffect(() => {
        if (state.sessionKey) {
            navigate(history.state?.return_url || '/', { replace: true })
        }

    })

    const inputChange = (e) => {
        setApiKey(e.target.value.trim())
    }

    const copy = useRef();

    return (
        <>
            <div className="header">

                <div className="inner-header flex flex-col items-center justify-center space-y-4 ">


                    <div className='px-4'>
                        <div className={` ${state.error && state.error.length > 1 ? ' bg-red-800 text-white' : 'bg-indigo-300 text-black'}   block py-3 px-5 rounded-2xl`}>
                            {state.error && state.error.length > 1 ? state.error : <>
                            <div>
                            Api Keyinizi   <a href="https://openweathermap.org"> <span className='underline text-gray-800 font-semibold'>openweathermap.org</span> </a> adresinden alabilirsiniz.
                            </div>
                            </>}
                        </div>

                    </div>

                    <div className='  h-16 w-[70vw]  max-w-[500px]'>
                        <div className='relative px-3 w-full h-full flex items-center bg-white rounded-xl focus-within:ring-indigo-300 focus-within:ring-4 focus-within:transition-all'>
                            <FaKey className='text-black absolute left-4' size='20' />
                            <input className=' w-full h-full pl-8 text-black   text-lg outline-none   text-left placeholder:text-center:' placeholder='Api Key Giriniz' type="text"
                                onChange={e => inputChange(e)} />
                        </div>
                    </div>


                    <button onClick={buttonHandle} className='border-2 border-black py-2 px-5 bg-black/70 text-white rounded-full'>Devam Et</button>
                    <button onClick={(e) => 
                        {navigator.clipboard.writeText('0a61c9d04e03114aedbacfc6af10fba0')
                            
                            copy.current.classList.add('top-full', '!visible')

                            setTimeout(() => {copy.current.classList.remove('top-full','!visible')},2000)

                    }} className='bg-pink-800  text-white relative'>Perma Api Key : 0a61c9d04e03114aedbacfc6af10fba0
                    <span className='absolute right-0 top-full border rounded-b-xl px-2 border-t-0 font-medium'>Kopyalamak için tıklayın!</span>
                    <div className='border rounded-b-xl bg-gray-900 absolute transition-all top-0 w-full  left-0 py-2 invisible duration-1000 pointer-events-none' ref={copy}>Api Key Kopyalandı </div>
                    </button>
                    
                                
                </div>

                <div>
                    <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                        <defs>
                            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                        </defs>
                        <g className="parallax">
                            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
                        </g>
                    </svg>
                </div>

            </div>



            <div className="content flex items-center justify-center">
                <p>SEC | Weather </p>
            </div>





        </>
    )
}

export default Home