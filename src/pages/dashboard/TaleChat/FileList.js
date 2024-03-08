import React, { useState } from 'react';
import { Card, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from "reactstrap";
import { Link } from "react-router-dom";

//i18n
import { useTranslation } from 'react-i18next';

//helper
import { downloadPDF, getNameFromUrl } from '../../../helpers/files';

function FileList(props) {
    const [files] = useState(props.files);

    /* intilize t variable for multi language implementation */
    const { t } = useTranslation();

    return (
        <React.Fragment>
            <div className="d-flex align-items-center">
                {
                    files.map((file, key) => {
                        const fileName = getNameFromUrl(file);
                        return (
                            <div key={key} className='d-flex align-items-center'>
                                <div className="me-2 ms-0">
                                    <div className="text-primary rounded font-size-20">
                                        {props.fileImage
                                            ? <img src={props.fileImage} alt="" width="48" className="logo logo-dark" />
                                            : <i className="ri-file-text-fill text-white"></i>
                                        }

                                    </div>
                                </div>

                                <div className="flex-grow-1">
                                    <div className="text-start">
                                        <li key={key} className="list-inline-item message-img-list">
                                            <div>
                                                <h5 className="font-size-14">{fileName}</h5>
                                                <Link to={file} target="_blank" {...{/* onClick={(e) => downloadPDF(file) } */}} className="btn btn-secondary btn-sm"><i className="ri-download-2-line me-2"></i>Download ebook</Link>
                                            </div>
                                        </li>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div >
        </React.Fragment >
    );
}

export default FileList;