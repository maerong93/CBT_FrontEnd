import React from 'react';
import DeleteIcon from '../../icon/deleteIcon';
import FolderIcon from '../../icon/folderIcon';
import styles from './addFile.module.css';

const AddFile = React.memo(({id, name, video, onChangeInputs, onDeleteFiles, onDeleteSheetFiles, sheet, file, dataName, examType, onChangeSheet, blackIcon}) => {

    const changeFile = (event) => {
        //console.log(event.target);

        // 선택한 문제 유형이 없을 때
        if(examType === '') {
           return onChangeInputs(event);
        }

        // 선택한 파일 저장하기
        event.target.dataset.name === 'sheetImg' && onChangeSheet(event); // 문항 이미지 파일
        event.target.dataset.name !== 'sheetImg' && onChangeInputs(event); // 이미지, 동영상 첨부파일
    };

    // 첨부파일 value 삭제
    const deletFile = (event) => {

        const inputContainer = event.currentTarget.closest('.btn-wrap').previousElementSibling;
        const target = inputContainer.childNodes[0];
        
        target.value = '';
        //console.log(target);
        
        target.dataset.name !== 'sheetImg' && onDeleteFiles(target); // 이미지, 동영상 첨부파일
        target.dataset.name === 'sheetImg' && onDeleteSheetFiles(target, sheet); // 문항 첨부파일
    };

    return(
        <>
            <div className={`${styles.container} files-container`}>
                <div className={styles.file}>
                    <input type="file" accept={video === true? "video/*" : "image/*"} id={id} name={name} data-name={dataName} className="w-100" onChange={changeFile} />
                    <label htmlFor={id} title="파일 업로드">
                        <FolderIcon fill={'#333'} />
                    </label>
                    <span>{file.URL ? (file.name || '선택한 파일 있음') : '선택된 파일 없음'}</span>
                    {/* <span>{fileInfo}</span> */}
                </div>
                <div className="btn-wrap">
                    <button type="button" className="btn del-btn" onClick={deletFile} title="파일 삭제"><DeleteIcon fill={blackIcon} /><span>파일 삭제</span></button>
                </div>
            </div>
        </>
    );
});

export default AddFile;