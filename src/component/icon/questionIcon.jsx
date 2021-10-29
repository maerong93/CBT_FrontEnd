import React from 'react';

const QuestionIcon = React.memo(({size, fill}) => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width={size !== undefined ? size : "24"} height={size !== undefined ? size : "24"} viewBox="0 0 24 24">
            <path d="M107.878,111.484h24v24h-24Z" transform="translate(-107.878 -111.484)" fill="none" opacity="0.1" />
            <path d="M111.878,115.484h16v16h-16Z" transform="translate(-107.878 -111.484)" fill="none" opacity="0.16" />
            <g transform="translate(-107.878 -111.484)">
                <path fill={fill !== undefined ? fill : '#fff'} d="M119.878,131.484a8,8,0,1,1,8-8A8.009,8.009,0,0,1,119.878,131.484Zm0-14.222a6.222,6.222,0,1,0,6.222,6.222A6.229,6.229,0,0,0,119.878,117.262Z" />
                <circle fill={fill !== undefined ? fill : '#fff'} cx="0.889" cy="0.889" r="0.889" transform="translate(118.989 126.151)" />
                <path fill={fill !== undefined ? fill : '#fff'} d="M119.878,125.262a.889.889,0,0,1-.889-.889,2.724,2.724,0,0,1,1.014-2.28c.047-.043.093-.083.135-.126a1.772,1.772,0,0,0,.629-1.149.889.889,0,0,0-1.778,0,.889.889,0,0,1-1.778,0,2.667,2.667,0,0,1,5.334,0,3.432,3.432,0,0,1-1.15,2.406c-.064.064-.132.127-.2.191a1,1,0,0,0-.424.958A.889.889,0,0,1,119.878,125.262Z" />
            </g>
        </svg>
    );
});

export default QuestionIcon;