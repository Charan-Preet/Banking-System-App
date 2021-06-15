import { useEffect,useContext } from "react"
import AuthContext from "../context/Coustomer-auth"
import axios from 'axios'

export default function LoanReq(){
    const { loggedIn } = useContext(AuthContext);

    async function getUser(){
        let user = await axios.get("http://localhost:8080/loanrequest");
        console.log(user);
    }
    // const isLogged = () => {
        http://localhost:3000/
    // }

    // useEffect(() => {
    //     if(loggedIn) return 
    // })
    return(
        <div className='outline mt6 w-90 center'>
            {loggedIn ? (<div>
                <button onClick={getUser}>Test</button>
            </div>): (<div>no test</div>)}
        </div>
    )
}