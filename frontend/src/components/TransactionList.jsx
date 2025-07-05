import React , {useState,useEffect} from 'react'
import { getTransactions,deleteTransaction } from '../api/api'
import '../App.css'
const TransactionList = () => {
  const [transcations , setTranscations] = useState([]);
  const [filters , setFilters] = useState({start:'',end:'',page:1,limit:10});
  const [error,setError] = useState('');
  const fetchTranscations = async() =>{
        try{
           const response = await getTransactions(filters);
           setTranscations(response.data);
           setError('')
        }catch(err){
            setError(err.response?.data?.error);
        }
  };
  useEffect(() =>{
     fetchTranscations();
  },[filters])

  const handleDelete = async(id) =>{
    try{
       await deleteTransaction(id);
       fetchTranscations();
    }catch(err){
        setError(err.response?.data?.error);
    }
  };
  const handleFilterChange = (e) =>{
    setFilters({ ...filters,[e.target.name]:e.target.value,page:1});
  };
  const handlePageChange = (newPage) => {
      if(newPage >= 1){
        setFilters({...filters,page:newPage});
      }
  };
  return (
    <div className='transcation-list-container'>
        <h3 className='form-title'>Transcations</h3>
        {error && <p className='error-message'>{error}</p>}
        <div className='filter-group'>
        <div className='form-group'>
            <label htmlFor='start' className='form-label'>Start Date</label>
            <input
              type = "date"
              id = "start"
              name = "start"
              value = {filters.start}
              onChange={handleFilterChange}
              className='form-input'
            />
        </div>
        <div className='form-group'>
            <label htmlFor='end' className='form-label'>End Date</label>
            <input
              type = "date"
              id = "end"
              name = "end"
              value = {filters.end}
              onChange={handleFilterChange}
              className='form-input'
            />
        </div>
         <div className='form-group'>
            <label htmlFor='end' className='form-label'>Type</label>
            <select
              id = "type"
              name = "type"
              value = {filters.type}
              onChange={handleFilterChange}
              className='form-select'
            >
             <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
       </div>
       <table className='transcation-table'>
        <thead>
            <tr>
                <th>Title</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Category</th>
                <th>Date</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
           {transactions.length > 0 ? (
            transactions.map((tx) => (
              <tr key={tx._id}>
                <td>{tx.title}</td>
                <td>${tx.amount.toFixed(2)}</td>
                <td>{tx.type}</td>
                <td>{tx.category}</td>
                <td>{new Date(tx.date).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => handleDelete(tx._id)}
                    className="action-button delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-data">No transactions found.</td>
            </tr>
          )}
        </tbody>
       </table>
       <div className='pagination'>
         <button
          onClick={() => handlePageChange(filters.page - 1)}
          disabled={filters.page === 1}
          className={filters.page === 1 ? 'form-button-disabled' : 'form-button'}
        >
          Previous
        </button>
        <span className="page-info">Page {filters.page}</span>
        <button
          onClick={() => handlePageChange(filters.page + 1)}
          className="form-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default TransactionList;