import React from 'react';
import { DropdownMenu, DropdownItem, DropdownToggle, Card, UncontrolledDropdown } from "reactstrap";
import { Link } from "react-router-dom";

//i18n
import { useTranslation } from 'react-i18next';

function AttachedFiles(props) {
    const files = props.files;

    /* intilize t variable for multi language implementation */
    const { t } = useTranslation();

    return (
        <React.Fragment>
            {
                files.map((file, key) =>
                    <Card key={key} className="p-2 border mb-2">
                        <div className="d-flex align-items-center">
                            <div className="avatar-sm me-3 ms-0">
                                <div className="avatar-title bg-primary-subtle text-primary rounded font-size-20">
                                    <i className={file.thumbnail}></i>
                                </div>
                            </div>
                            <div className="flex-grow-1 overflow-hidden">
                                <div className="text-left">
                                    <h5 className="font-size-14 mb-1">{file.name}</h5>
                                    <p className="text-muted font-size-13 mb-0">{file.size}</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                )
            }
        </React.Fragment>
    );
}

export default AttachedFiles;