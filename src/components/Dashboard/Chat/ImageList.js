import React, { useState } from 'react';
import { DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { Link } from "react-router-dom";

//i18n
import { useTranslation } from 'react-i18next';

//lightbox
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

//helper
import { getNameFromUrl } from '../../../helpers/files';

function ImageList(props) {
    const [isOpen, setisOpen] = useState(false);
    const [currentImage, setcurrentImage] = useState(null);
    const [images] = useState(props.images);

    /* intilize t variable for multi language implementation */
    const { t } = useTranslation();

    const toggleLightbox = (currentImage) => {
        setisOpen(!isOpen);
        setcurrentImage(currentImage);
    }

    return (
        <React.Fragment>
            <ul className="list-inline message-img  mb-0">
                {
                    images.map((image, key) => {
                        const fileName = getNameFromUrl(image);
                        return (
                            <li key={key} className="list-inline-item message-img-list">
                                <div>
                                    <Link to="#" onClick={() => toggleLightbox(image)} onError={(e) => console.error('Image Load Error:', e)} className="popup-img d-inline-block" title={fileName}>
                                        <img src={image} alt="chat" className="rounded-3" />
                                    </Link>
                                </div>
                            </li>)
                    })
                }

                {isOpen && (
                    <Lightbox
                        mainSrc={currentImage}
                        onCloseRequest={toggleLightbox}
                        imageTitle={getNameFromUrl(currentImage)}
                    />
                )}

            </ul>
        </React.Fragment>
    );
}

export default ImageList;