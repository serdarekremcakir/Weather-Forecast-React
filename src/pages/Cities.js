import React, { useEffect, useState } from 'react'
import cities from '../turkey_cities.json';
import CityItem from '../components/CityItem';
import TurkeyMap from 'turkey-map-react';
import { useNavigate } from 'react-router-dom';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc'

const Cities = () => {
    const [filteredCities, setFilteredCities] = useState(cities)
    const navigate = useNavigate();

    const [pagination, setPagination] = useState(0)

    const changeHandle = (e) => {
        setFilteredCities(cities.filter(city => city.name.toLocaleLowerCase().substring(0, e.target.value.length).includes(e.target.value.toLocaleLowerCase())))
        setPagination(0);
    }

    return (
        <>
            <div className='bg-cyan-900 h-screen fixed top-0 left-0 w-screen -z-10'> </div>
            <div className=' flex  justify-center flex-col  items-center min-h-screen'>

                <div className='hidden lg:block lg:w-full'>
                    <TurkeyMap customStyle={{ idleColor: "#fff", hoverColor: "rgb(31 41 55)", }} hoverable={true} showTooltip={true} onClick={({ plateNumber, name }) => navigate(`city/${plateNumber}-${name}`)} />
                </div>

                <div className='xl:w-3/4 w-full flex flex-col items-center flex-1 py-6 lg:py-0  '>
                    <input
                        className='border-2 border-black w-1/2 min-w-[250px] max-w-[600px] rounded-full p-3 outline-none '
                        type="text" placeholder='Şehir Ara' onChange={e => changeHandle(e)} />

                    <div className={`w-full  flex lg:flex-row flex-col  justify-center lg:justify-between items-center   relative  px-2 py-4 lg:py-0  ${filteredCities.length < 81 ? 'md:flex-1' : 'flex-1'} `}>

                        <button onClick={() => pagination !== 0 && setPagination(state => state - 12)} className='cities-button lg:cities-button-lg' ><VscChevronLeft style={{ width: '100%', height: '100%' }} /></button>

                        <div className=' w-full  flex flex-wrap  items-center justify-center ' >
                            {filteredCities.slice(pagination, pagination + 12).map(city => <CityItem key={city.id}  {...city} />)}
                        </div>
                        <button onClick={() => pagination !== 72 && filteredCities.length > 12 && setPagination(state => state + 12)} className='cities-button lg:cities-button-lg lg:right-0 ' ><VscChevronRight style={{ width: '100%', height: '100%' }} /></button>
                    </div>
                </div>


            </div>
        </>


    )
}

export default Cities