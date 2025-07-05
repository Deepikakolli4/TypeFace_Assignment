import React from 'react';
import TransactionForm from '../components/TranscationForm';
import SummaryChart from '../components/SummaryChart';

const DashBoard = () =>{
    return (
        <div className='page-container'>
            <h2 className='page-title'>Dashboard</h2>
            <div className='dashboard-grid'>
                <div>
                    <TransactionForm onTransactionCreated={() => window.location.reload()}/>
                </div>
            <div>
            <SummaryChart/>
            </div>
            </div>
        </div>
    )
}
export default DashBoard;