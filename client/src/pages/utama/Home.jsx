import React from 'react'
import { Link, useLocation } from "react-router-dom";
import RealTime from './RealTime';

import jam from '../../img/assets/output-onlinepngtools.png'
import add from '../../img/assets/add.png'
import alarm from '../../img/assets/waktuu.png'


import Card from './Card';


const Home = () => {
  

  return (
    <div className="home">
    <div className="homee">
      <RealTime/>
      <div className='deskripsi'>
        <h1>R.WATCH</h1>
        <h5>produk alarm digital dengan teknologi Iot, akan memudahkan hidup anda untuk menata jadwal dalam kehidupan anda</h5>
      </div>
    </div>
    <Card/>
    </div>
  )
}

export default Home
