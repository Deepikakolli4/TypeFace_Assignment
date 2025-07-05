import React from 'react'
import TranscationList from '../components/TransactionList'
import '../App.css'
const Transcations = () => {
  return (
    <div className='page-container'>
        <h2 className='page-title'>
            Transactions
        </h2>
        <TranscationList/>
    </div>
  )
}

export default Transcations