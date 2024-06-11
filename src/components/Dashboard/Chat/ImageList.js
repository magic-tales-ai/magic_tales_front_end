import React, { useState } from 'react';
import { Image } from 'antd';

// Helpers
import { getNameFromUrl } from '../../../helpers/files';

function ImageList(props) {
    const [images] = useState(props.images);

    return (
        <React.Fragment>
            <ul className="list-inline message-img mb-0">
                <Image.PreviewGroup visible={false}>
                    {
                        images.map((image, key) => {
                            const fileName = getNameFromUrl(image);
                            return (
                                <li key={key} className="list-inline-item message-img-list">
                                    <Image
                                        placeholder={fileName}
                                        src={image}
                                        alt={fileName}
                                        className="popup-img d-inline-block"
                                    />
                                </li>)
                        })
                    }
                </Image.PreviewGroup>
            </ul>
        </React.Fragment>
    );
}

export default ImageList;