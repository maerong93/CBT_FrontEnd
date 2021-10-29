import React from 'react';

const Layout2Icon = React.memo(({size, fill}) => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width={size !== undefined ? size : "24"} height={size !== undefined ? size : "24"} viewBox="0 0 24 24">
            <g transform="translate(-435.167 -145.963)">
                <g>
                    <g>
                        <path d="M435.167,145.963h24v24h-24Z" fill="none" opacity="0.1" />
                        <path d="M439.167,149.963h16v16h-16Z" fill="none" opacity="0.16" />
                        <path d="M447.167,157.963" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                    </g>
                </g>
                <g>
                <path fill={fill !== undefined ? fill : '#fff'} d="M454.278,153.518h-5.333a.889.889,0,1,1,0-1.777h5.333a.889.889,0,1,1,0,1.777Z" />
                <path fill={fill !== undefined ? fill : '#fff'} d="M445.389,153.518h-5.333a.889.889,0,1,1,0-1.777h5.333a.889.889,0,1,1,0,1.777Z" />
                <path fill={fill !== undefined ? fill : '#fff'} d="M454.278,164.185h-5.333a.889.889,0,1,1,0-1.778h5.333a.889.889,0,0,1,0,1.778Z" />
                <path fill={fill !== undefined ? fill : '#fff'} d="M445.389,164.185h-5.333a.889.889,0,1,1,0-1.778h5.333a.889.889,0,1,1,0,1.778Z" />
                <path fill={fill !== undefined ? fill : '#fff'} d="M454.278,158.852h-5.333a.889.889,0,1,1,0-1.778h5.333a.889.889,0,0,1,0,1.778Z" />
                <path fill={fill !== undefined ? fill : '#fff'} d="M445.389,158.852h-5.333a.889.889,0,1,1,0-1.778h5.333a.889.889,0,1,1,0,1.778Z" />
                </g>
            </g>
        </svg>
    );
});

export default Layout2Icon;