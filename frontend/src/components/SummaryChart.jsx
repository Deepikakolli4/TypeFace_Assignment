import React,{useState,useEffect} from 'react';
import { getSummary } from '../api/api';
import '../App.css'
const SummaryChart = () => {
    const [summary,setSummary] = useState({totalIncome : 0 , totalExpense : 0});
    const [error,setError] = useState('');
    useEffect(() =>{
        const fetchSummary = async() =>{
            try{
                const response = await getSummary();
                setSummary(response.data);
                setError('');
            }catch(err){
                setError(err.response?.data?.error);
            }
        };
        fetchSummary();
    },[]);

    const chartData = {
        type: 'pie',
        data : {
            labels : ['Income' , 'Expense'],
            datasets : [{
                data: [summary.totalIncome,summary.totalExpense],
                backgroundColor: ['#36A2EB', '#FF6384'],
            }]
        },
        options: {
        responsive: true,
        plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Income vs Expense' },
         },
        },
     };
  return (
    <div className='chart-container'>
        <h3 className='form-title'>Summary</h3>
        {error && <p className='error-message'>{error}</p>}
         <div className='chart-wrapper'>
            <chart className="js">`${JSON.stringify(chartData)}`</chart>
         </div>
    </div>
  )
}

export default SummaryChart