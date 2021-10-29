import React, { useRef } from 'react';
import DeleteIcon from '../../../component/icon/deleteIcon';
import AddFile from '../../../component/inputs/addFile/addFile';
import { Editor } from '@tinymce/tinymce-react';

const SheetRow = React.memo(({index, onDeleteRow, sheet, onChangeSheetText, currentModifyExam, fileInfo, type, onViewModal, sheetText, onChangeSheet, examType, onChangeInputs, onDeleteSheetFiles, onCheckedSelectExamType}) => {
    
    const {answer} = sheet;
    //console.log(sheet.text);

    const deleteRow = () => {
        onDeleteRow(sheet);
    };

    const sheetTextRef = useRef();

    const changeSheet = (event) => {
        if(examType === '') {
            if(event.target.type === 'checkbox') {
                event.target.checked = 'false';
            }
            return onChangeInputs(event);
        }
        const currentSheet = sheet;

        // 문항 첨부파일 삭제
        if(event.name === 'img') {
            return onDeleteSheetFiles(currentSheet);
        }
        
        // 첨부파일 제외한 value 저장
        onChangeSheet(event, currentSheet, sheetTextRef);
    };

    const changeSheetText = () => {
        if(!currentModifyExam && examType === '') {
            return onCheckedSelectExamType();
        }
        const currentSheet = sheet;
        onChangeSheetText(currentSheet, sheetTextRef);
    };
    return(
        <tr data-name={sheetText}>
            <td>{index}</td>
            <td>
                <Editor
                value={sheet.text}
                onInit={(evt, editor) => sheetTextRef.current = editor}
                required
                onEditorChange={changeSheetText}
                init={{
                height: 200,
                menubar: false,
                plugins: [
                    'advlist autolink lists image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar: 'Source code | undo redo | ' +
                        'bold italic underline | superscript subscript | ' +
                        'alignleft aligncenter alignright alignjustify | outdent indent |' +
                        'table | ' +
                        'removeformat',
                content_style: 'body { font-family: NotoSansKR, sans-serif; font-size: inherit; } table[border]:not([border="0"]):not([style*=border-color]) td, table[border]:not([border="0"]):not([style*=border-color]) th {border-color: #000}'
                }}
                /> 

                {/* <textarea name="text" value={sheet.text} id={sheetText} className="w-100" placeholder="문항을 입력하세요" rows="2" autoComplete="off" required onChange={ChangeSheet}></textarea> */}
            </td>
            {type !== 'r-question' &&
            <td>
                <AddFile
                id={`sheet-img-${index}`}
                name={`sheetImg${index}`}
                dataName={'sheetImg'}
                onViewModal={onViewModal}
                onChangeSheet={changeSheet}
                examType={examType}
                onChangeInputs={onChangeInputs}
                blackIcon={`#333`}
                onDeleteSheetFiles={onDeleteSheetFiles}
                sheet={sheet}
                file={sheet.img}
                />
            </td>}
            <td>
                <div className="center checkbox-wrap">
                    <input type={type !== 'r-question' ? 'radio' : 'checkbox'} checked={answer} name='answer' id={`answer${index}`} onChange={changeSheet} />
                    <label htmlFor={`answer${index}`}>정답</label>
                </div>
            </td>
            {type === 'r-question' &&
            <td>
                <div className="btn-wrap">
                    <button type="button" className="btn del-btn" onClick={deleteRow}><DeleteIcon /><span>문항 삭제</span></button>
                </div>
            </td>}
        </tr>
    )
});

export default SheetRow;