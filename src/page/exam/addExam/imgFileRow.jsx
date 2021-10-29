import React from 'react';

const ImgFileRow = React.memo(({props}) => {
    //console.log(props);
    return(
        <tr>
            <td className="text-left">첨부파일 1</td>
            {/* <td><AddFile id={'imgFile01'} name={'imgFile01'} onViewModal={viewModal} onChangeInputs={onChangeInputs} examType={inputs.type} onDeleteFiles={deleteFiles} /></td> */}
        </tr>
    );
});

export default ImgFileRow;