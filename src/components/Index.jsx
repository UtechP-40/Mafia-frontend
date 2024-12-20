import React, { useState } from 'react'
import Load from './Load';
import Card1 from './Card1';
// import "../Style/index.css"
const para1 = "Kundi Mat khadkao raja sidha andar aao raja"
const para2="A chalke tujhe mai leke chalun ek aisi gagan ke tale"
function Index() {
   const [loadBool,setLoadBool] = useState(true) 
  return ( 
    <div className='headCont lobby'>
       { loadBool ? <Load setLoadBool={setLoadBool}/> : (
        <div className="container">
        <Card1 head2="" classN="join" head3="" para={para1} anchor="Join Game"/>
        <Card1 classN="create" head3="Aao twist karein" para={para2} anchor="Create Game"/>
        </div>
      )
}
      
    </div>
  )
}

export default Index
