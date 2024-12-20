import React, { useEffect, useState } from 'react'
// import mafiaMoonQuotes
import mafiaMoonQuotes from './mafiaLines';
function Load({setLoadBool}) {
    // let x = math
    const [randomIndex,setRandomIndex] = useState(parseInt(Math.random()*51))
useEffect(()=>{
    let x =setInterval(()=>{
        setRandomIndex(parseInt(Math.random()*51))
    },7000)
    return ()=>{
        clearInterval(x)
    }
},[])
  return (
    <div className="headCont" onClick={()=>{setLoadBool(false)}}>
        <h1 className="mainHeading" data-text="mafia">Mafia</h1>
        <p className="subheading">{mafiaMoonQuotes[randomIndex]}</p>
    </div>
  )
}

export default Load
