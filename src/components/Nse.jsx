import React,{useEffect, useState} from 'react'
import { NseIndia } from  "stock-nse-india";
const  nseIndia = new  NseIndia()
nseIndia.getEquityDetails('IRCTC').then(details  => {
    console.log(details)
    })
function Nse() {
const [data,setData]= useState(null)
// useEffect(()=>{
    //  function hello(){
        
    // }
    // hello()
// },[])
  return (
    <div>
      {/* {data} */}
    </div>
  )
}

export default Nse
