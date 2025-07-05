import React from 'react'
import TranscationList from '../components/TransactionList'
const Transcations = () => {
  return (
    <div className='page-container'>
        <h2 className='page-title'>
            Transcations
        </h2>
        <TranscationList/>
    </div>
  )
}

export default Transcations