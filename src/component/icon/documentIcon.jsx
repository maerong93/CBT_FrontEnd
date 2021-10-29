import React from 'react';

const DocumentIcon = React.memo(({size, fill}) => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width={size !== undefined ? size : "24"} height={size !== undefined ? size : "24"} viewBox="0 0 32 32">
            <g transform="translate(-518.92 -38.703)">
                <path d="M518.92,38.7h32v32h-32Z" fill="none" opacity="0.1" />
                <path d="M522.92,42.7h24v24h-24Z" fill="none" opacity="0.16" />
                <path fill={fill !== undefined ? fill : '#fff'} d="M544.079,51.579a.91.91,0,0,0-.2-.3l-8.307-8.307a.928.928,0,0,0-.653-.271h-8.307a.923.923,0,0,0-.923.923V65.78a.923.923,0,0,0,.923.923h16.615a.923.923,0,0,0,.923-.923V51.934A.912.912,0,0,0,544.079,51.579Zm-8.236-5.724L541,51.011h-5.157Zm-8.307,19V44.549H534v7.385a.923.923,0,0,0,.923.923H542.3v12Z" />
            </g>
        </svg>
    );
});

export default DocumentIcon;