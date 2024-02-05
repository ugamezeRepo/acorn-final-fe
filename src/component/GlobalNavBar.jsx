import GNBServerBlock from './GNBServerBlock';
import { useState } from 'react';


const GlobalNavBar = () => {

    const [servers, setServers]  = useState([
        {
            url: 'hello',
            thumbnail: 'world',
            description: 'hi',
        },
        {
            url: 'hello',
            thumbnail: 'world',
            description: 'hi',
        },
        {
            url: 'hello',
            thumbnail: 'world',
            description: 'hi',
        },
        {
            url: 'hello',
            thumbnail: 'world',
            description: 'hi',
        },
        {
            url: 'hello',
            thumbnail: 'world',
            description: 'hi',
        },
    ]);

    return (
        <>
            <div className="GnbContainer">
                <ul>
                    <GNBServerBlock url={'/Channel/@me'} description={'direct message'} thumbnail='' />
                    <hr />
                    
                    {servers.map((v, idx) => (<li key={idx}><GNBServerBlock  url={v.url} thumbnail={v.thumbnail} description={v.description}/></li>))}
                </ul>
            </div>
        </>
    );
}

export default GlobalNavBar;