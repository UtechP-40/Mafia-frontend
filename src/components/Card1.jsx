// import React from "react";

export default function Card1({classN,head3,para,anchor}) {
  return (
    <div className={`card ${classN}`}>
      <div className="content">
        <h2>{anchor}</h2>
        <h3>{head3}</h3>
        <p style={{textAlign:"center"}}>
          {para}
        </p>
        <a href={`/${classN}`}>{anchor}</a>
      </div>
    </div>
  );
}
