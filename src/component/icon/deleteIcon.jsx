import React from 'react';

const DeleteIcon = React.memo(({size, fill}) => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width={size !== undefined ? size : "24"} height={size !== undefined ? size : "24"} viewBox="0 0 24 24">
            <g transform="translate(-624.74 -111.426)">
                <path d="M624.74,111.426h24v24h-24Z" fill="none" opacity="0.1" />
                <path d="M628.74,115.426h16v16h-16Z" fill="none" opacity="0.16" />
                <path d="M636.74,123.426" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
            </g>
            <path fill={fill !== undefined ? fill : '#fff'} d="M643.851,118.092h-3.556v-1.777a.889.889,0,0,0-.889-.889h-5.333a.889.889,0,0,0-.889.889v1.777h-3.556a.889.889,0,0,0,0,1.778h.955l.826,10.735a.889.889,0,0,0,.886.821h8.889a.89.89,0,0,0,.886-.821l.826-10.735h.955a.889.889,0,0,0,0-1.778Zm-8.889-.889h3.555v.889h-3.555Zm5.4,12.445h-7.243l-.752-9.778h8.747Z" transform="translate(-624.74 -111.426)" />
        </svg>
    );
});

export default DeleteIcon;