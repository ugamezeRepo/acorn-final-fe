import GNBServerBlock from './GNBServerBlock';
import { useState } from 'react';


const GlobalNavBar = () => {

    const [servers, setServers]  = useState([
        {
            url: 'hello',
            thumbnail: 'https://via.placeholder.com/60',
            description: '',
        },
        {
            url: 'hello',
            thumbnail: 'https://via.placeholder.com/60',
            description: 'hi',
        },
        {
            url: 'hello',
            thumbnail: 'https://via.placeholder.com/60',
            description: 'hi',
        },
        {
            url: 'hello',
            thumbnail: 'https://via.placeholder.com/60',
            description: 'hi',
        },
        {
            url: 'hello',
            thumbnail: 'https://via.placeholder.com/60',
            description: 'hi',
        },
    ]);
    const [selectedIndex, setSelectedIndex] = useState(-1); 


    const mouseOver = (idx)=>{
        setSelectedIndex(idx)
    };

    const mouseOut= ()=>{
        setSelectedIndex(-1)
    }


    return (
        <>
            <div className="GnbContainer">
                <ul>
                    <li>
                        <GNBServerBlock url={'/Channel/@me'} description={'direct message'} thumbnail='https://via.placeholder.com/60'/>
                    </li>
                    <hr />
                    
                    {servers.map((v, idx) => (
                    <li key={idx} onMouseOver={()=>{mouseOver(idx)}} onMouseOut={mouseOut} >
                        
                        <GNBServerBlock  url={v.url} thumbnail={v.thumbnail} description={v.description}/>

                        <span className={selectedIndex === idx ? 'pointBar selected' : 'pointBar' } ></span>

                    </li>))}
                </ul>
            </div>
        </>
    );
}

export default GlobalNavBar;