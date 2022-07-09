import React, {useState, useEffect} from 'react';
import ReactDOM, {createPortal} from 'react-dom';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {Bars} from 'react-loader-spinner'

function Modal(props) {
    return (
        <div>
            <div className='w-full h-screen absolute z-20 bg-gray-500 opacity-50'/>
            <div
                className='bg-white py-5 px-10 absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg'>
                <Bars
                    height="100"
                    width="100"
                    color='teal'

                />
            </div>

        </div>

    );
}

function Overlay(props) {
   const [isBrowser, setIsBrowser] = useState(false);

   useEffect(() => {
       setIsBrowser(true);
   },[]);

   if(isBrowser){
       return createPortal(<Modal/>, document.getElementById('overlay'))
   }else{
       return null;
   }


}

export default Overlay;