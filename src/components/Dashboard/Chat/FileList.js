import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

// i18n
import { useTranslation } from 'react-i18next';

// Actions
import { openModalSignin, downloadStoryFileFromURL } from '../../../redux/actions';
import { downloadPDF } from '../../../helpers/files';

function FileList(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const user = useSelector(state => state.User);
    const [files] = useState(props.files);
    
    const handleDownload = ({ e, fileURL }) => {
        if(!user?.get('id')) {
            e.preventDefault();
            dispatch(openModalSignin());
            return;
        }

        dispatch(downloadStoryFileFromURL(fileURL));
    }

    return (
        <React.Fragment>
            <div className="d-flex align-items-center">
                {
                    files.map((fileURL, key) => {
                        return (
                            <div key={key} className='d-flex align-items-center'>
                                <div className="me-2 ms-0">
                                    <div className="text-primary rounded font-size-20">
                                        <i className="ri-file-text-fill text-white"></i>
                                    </div>
                                </div>

                                <div className="flex-grow-1">
                                    <div className="text-start">
                                        <li key={key} className="list-inline-item message-img-list">
                                            <div>
                                                <Link onClick={(e) => handleDownload({e, fileURL}) } className="btn btn-secondary btn-sm"><i className="ri-download-2-line me-2"></i>Download ebook</Link>
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