import React from "react";
import {useNavigate} from 'react-router-dom'


function QSitems({mealtypes}){
    const navigate=useNavigate()
    
    const handelNavigate=(mealtypeId)=>{
        // navigate(`/filter?mealtypes=${mealtypeId}`) 
        const locationid=sessionStorage.getItem('locationid')

        if(locationid){
             navigate(`/filter?mealtypes=${mealtypeId}&location=${locationid}`) 
        }
        else{
             navigate(`/filter?mealtypes=${mealtypeId}`) 
        }
    }

    return(
        <>
       <div className="mealtype-mainborder">
         {mealtypes.map((item,index)=>(
            <div className="Card col-12 col-sm-12 col-md-4 col-lg-3" key={item.meal_type} onClick={()=>handelNavigate(item.meal_type)}>
            
            <div className="QSIimgdiv">
                <img src={item.image} alt="img not found" className="QSI_img" 
                />

            </div>

            <div className="QSIcardbody">
                <div className="QSICdiv">
                    <h1 className="Ch1">{item.name}</h1>
                </div>
                <div className="paradiv">
                    <p className="para">{item.content}</p>
                </div>
            </div>
        </div>))}
       </div>
        </>
    )
}

export default QSitems