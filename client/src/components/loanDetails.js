import axios from 'axios'
import { useState, useEffect } from 'react'

export default function LoanDetails() {
    const [loanData, setLoanData] = useState([])
    
    function Display() {
        const data = []
        axios.get('http://localhost:8080/loanrequest')
            .then(function (response) {
                data.push(response.data)
                if (!loanData.length || loanData.length === 0)
                    setLoanData(data)
                else return
            })
            .catch(function (error) {
                console.log(error);
            })
        return loanData.map((data, idx) => (
            <div className='sans-serif mt4 ba bw1 w-50 center bg-near-white pa3 br3 shadow-4 mid-gray' key={idx}>
                <div className='sans-serif mid-gray'><strong>Request Created On:</strong>{new Date(data.Date).toString()}</div>
                <div className='mt1'><strong>Amount:</strong>{data.amount}₹</div>
                <div className='mt1'><strong>First Emi:</strong>{data.amount / data.duration}₹</div>
                <div className='mt1'><strong>Duration:</strong>{data.duration} Months</div>
                <div className='mt1'><strong>Status:</strong>{data.status}</div>
            </div>
        ))
    }

    return (
        <div className='mt6'>
            <div className='sans-serif tc mid-gray'>
                Since You are a <strong className='underline'>Coustomer</strong> so you can view your own Loan Request's
            </div>
            <div className='sans-serif mid-gray tc b mt3'>
                LogIn as <strong className='courier underline'>Admin</strong> or <strong className='underline courier'>Agent</strong> to view every Coustomer Loan Request
            </div>
            {Display()}
        </div>
    )
}