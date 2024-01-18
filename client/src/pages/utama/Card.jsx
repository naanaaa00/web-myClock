import React from 'react'

import jam from '../../img/assets/output-onlinepngtools.png'
import add from '../../img/assets/add.png'
import alarm from '../../img/assets/waktuu.png'
import gif from '../../img/assets/dribbble_on_and_off.gif'

const Card = () => {
  

    return (
      <div>
         <h1>FITUR</h1>
        <div className='fitur'>
        <div className='fitur1'>
          <img src={jam} alt="" />
          <h3><b>Real Time</b></h3>
          <p>Menampilkan waktu secara real time</p>
        </div>
        <div className='fitur2'>
          <img src={gif} alt="" />
          <h3><b>On/Off</b></h3>
          <p>fitur on/off alaram yang dapat diakses kapam saja dan dimana saja</p>
        </div>
        <div className='fitur3'>
          <img src={alarm} alt="" />
          <h3><b>Set Date and Time</b></h3>
          <p>Jam ini dilengkapi dengan fitur untuk mengatur tanggal dan waktu alarm, yang dapat diatur langsung melalui situs web ini</p>
        </div>
      </div>
      </div>
  )
}

export default Card