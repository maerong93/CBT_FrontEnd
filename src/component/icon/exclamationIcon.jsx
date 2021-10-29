import React from 'react';

const ExclamationIcon = React.memo(({size, fill}) => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width={size !== undefined ? size : "24"} height={size !== undefined ? size : "24"} viewBox="0 0 24 24">
        <path d="M43.271,111.484h24v24h-24Z" transform="translate(-43.271 -111.484)" fill="none" opacity="0.1" />
        <path d="M47.271,115.484h16v16h-16Z" transform="translate(-43.271 -111.484)" fill="none" opacity="0.16" />
        <g transform="translate(-43.271 -111.484)">
            <path fill={fill !== undefined ? fill : '#fff'} d="M55.271,131.484a8,8,0,1,1,8-8A8.009,8.009,0,0,1,55.271,131.484Zm0-14.222a6.222,6.222,0,1,0,6.222,6.222A6.23,6.23,0,0,0,55.271,117.262Z" />
            <path fill={fill !== undefined ? fill : '#fff'} d="M55.271,124.373a.889.889,0,0,1-.889-.889v-3.555a.889.889,0,0,1,1.778,0v3.555A.889.889,0,0,1,55.271,124.373Z" />
            <circle fill={fill !== undefined ? fill : '#fff'} cx="0.889" cy="0.889" r="0.889" transform="translate(54.382 126.151)" />
        </g>
        </svg>
    )
});

export default ExclamationIcon;