import { data } from 'autoprefixer';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import cities from '../turkey_cities.json'
import { clearState, getWeatherData, setCityUtils } from '../utils';
import { Bars, Audio, BallTriangle, Circles, Grid, Hearts, Oval, Puff, Rings, SpinningCircles, TailSpin, ThreeDots } from 'react-loading-icons'

const CityDetail = () => {

    const params = useParams();

    const city = cities.find(city => city.id === Number(params.id));

    const state = useSelector(state => state.api)

    const [pagination, setPagination] = useState(0)

    const date = new Date();
    const dayofweek = Number(date.getDate() + pagination)  < 10 ? "0" + Number(date.getDate() + pagination) : Number(date.getDate() + pagination);
    let filter = date.getMonth() + 1 + "-" + dayofweek;
    


    // Şubat
    if(date.getMonth()+1 === 2){
        if (date.getFullYear%4 !== 0 && Number(dayofweek) > 28) {
            filter = date.getMonth() +2 + "-0" +  (Number(dayofweek) - 28)
        }
        else if(Number(dayofweek) > 29){
            filter = date.getMonth() +2 + "-0" +  (Number(dayofweek) - 29)
        }
    }
    
    // 30 çeken aylar
    if ((date.getMonth()+1 === 11 || 4 || 6 || 9) && Number(dayofweek) > 30) {
        filter = date.getMonth() +2 + "-0" +  (Number(dayofweek) - 30)
    }

    //31 çeken aylar
    else if ((date.getMonth()+1 === 12 || 10 || 8 || 7 || 5 || 3 || 1) && Number(dayofweek) > 31) {
        filter = date.getMonth() +2 + "-0" +  (Number(dayofweek) - 31)
    }

    const weekday = ["Pazar", "Pazartesi", "Sali", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    const dayList = weekday.map((item,index) =>   weekday[(date.getDay() + index) % 7])
  

    const list = state.data && state.data.list.filter(item => item.dt_txt.indexOf(filter) !== -1);

    useEffect(() => {
        clearState();
        setCityUtils(city);
        getWeatherData();
        getWeatherData('current');

    }, [city])


    return (
        <>
            <div className='bg-[url(bg.jpg)] fixed top-0 left-0 w-full h-full  opacity-90 bg-center bg-no-repeat bg-cover -z-10'>

            </div>
            <div className='lg:min-h-[calc(100vh-48px)]  flex lg:flex-row flex-col justify-center items-center ' >

                {!(state.dataCurrent && state.data) ? <>
                    <div className='flex flex-col justify-center items-center bg-cyan-900 bg-opacity-80 rounded-xl p-12 fixed top-1/2 -translate-y-1/2'>
                        <ThreeDots className='' speed={1.5} />
                    </div>
                </> :


                    <div className='layout lg:layout-lg'>
                        <div className='current-panel current-panel-mobile lg:current-panel-lg' id='left-panel'>
                            <h2 className='font-bold text-3xl lg:text-5xl'>{state.city.name}</h2>
                            <img className='' src={`https://openweathermap.org/img/wn/${state.dataCurrent.weather[0].icon}@4x.png`} alt="" />
                            <div className='text-center space-y-7'>
                                <p className='text-2xl lg:text-4xl'><span className='text-4xl lg:text-7xl font-semibold'>{state.dataCurrent.main.temp}</span> °C</p>
                                <p className='text-2xl '>{state.dataCurrent.weather[0].description.toUpperCase()}</p>
                            </div>

                        </div>

                        <div id='right-panel' className='right-panel lg:right-panel-lg'>
                            <div id='right-top panel' className='right-top-panel lg:right-top-panel-lg'>

                                {/* Days of the week buttons */}
                                <div className='day-buttons lg:day-buttons-lg  pb-1 lg:pb-0'>
                                            {dayList.slice(0,5).map((day, index) =>
                                        <button key={index}
                                            className={index === 0 ? 'bg-gray-800 rounded-full lg:px-6 lg:py-3 px-4 py-2 ' : 'rounded-full lg:px-6 lg:py-3 px-4 py-2 lg:hover:bg-gray-700'}
                                            onClick={(e) => {
                                                setPagination(index)
                                                e.target.parentElement.childNodes.forEach(x => {
                                                    x.classList.remove('bg-gray-800', "lg:hover:bg-gray-800")
                                                    x.classList.add('lg:hover:bg-gray-700')
                                                });
                                                e.target.classList.add("bg-gray-800", "transition-all", "lg:hover:bg-gray-800")
                                            }}>{dayList[index]}</button>)}
                                </div>


                                <div className='days-panel lg:days-panel-lg'>
                                    {
                                        list.map((item, index) =>
                                            <div key={index} className={`flex items-center flex-col bg-gray-800 rounded-xl lg:flex-1 justify-between py-2 lg:px-4 ${list.length % 2 && list.length - 1 === index ? 'col-span-2' : ''} lg:min-w-[100px] `}>
                                                <p >{item.dt_txt.slice(-9, -3)}</p>
                                                <img className='rounded-full ' src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="" />
                                                <p className='text-md inline-flex items-end'><span className='text-2xl font-semibold pr-1'>{item.main.temp}</span> °C</p>
                                                <p className=' h-1/4  text-center text-sm inline-flex items-center justify-center px-2'>{item.weather[0].description.toUpperCase()}</p>
                                            </div>)
                                    }
                                </div>



                            </div>




                            <div className='w-full bg-cyan-900 bg-opacity-60 p-4 rounded-xl flex-1 flex flex-col justify-between ' id='right-bottom-panel '>
                                <h3 className='text-3xl font-semibold mb-4 text-gray-200 '>Güncel Veriler</h3>
                                {state.dataCurrent &&
                                    <div className='flex lg:flex-row flex-col flex-auto lg:items-center lg:justify-between lg:space-x-6  space-y-4 lg:space-y-0'>

                                        <div className='bg-gray-800 flex-1 h-full rounded-xl flex flex-col items-center justify-center lg:py-2 relative py-8'>
                                            <h3 className='text-md absolute top-2 left-3 underline'>Rüzgar</h3>
                                            <div className='inline-flex items-center justify-center'><span className='text-3xl font-bold mr-2'>{state.dataCurrent.wind.speed}</span> m/s</div>
                                        </div>
                                        <div className='bg-gray-800 flex-1 h-full rounded-xl flex flex-col items-center justify-center lg:py-2 relative py-8'>
                                            <h3 className='text-md absolute top-2 left-3 underline'>Nem</h3>
                                            <div className='inline-flex items-center justify-center '><span className='text-3xl font-bold mr-2'>{state.dataCurrent.main.humidity}</span> %</div>
                                        </div>
                                        <div className='bg-gray-800 flex-1 h-full rounded-xl flex flex-col items-center justify-center lg:py-2 relative py-8'>
                                            <h3 className='text-md absolute top-2 left-3 underline'>Basınç</h3>
                                            <div className='inline-flex items-center justify-center '><span className='text-3xl font-bold mr-2'>{state.dataCurrent.main.pressure}</span> hPa</div>
                                        </div>
                                    </div>}

                            </div>
                        </div>


                    </div>





                }
            </div>


            
        </>


    )
}

export default CityDetail