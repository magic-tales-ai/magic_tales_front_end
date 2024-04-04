import React from 'react';
import { Button, Card, CardBody } from "reactstrap";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

//actions
import { setActiveTab } from "../../../redux/actions";

//i18n
import { useTranslation } from 'react-i18next';

//image default
import avatar1 from "../../../assets/images/users/avatar-1.jpg";

const defaultProfile = {
    id: 0,
    name: 'Carlos',
    image: '',
    years: 8,
    description: "Smiles a lot, like magic, is strong",
    characteristics: [
        "Carlos easily makes friends with his love for wizards and dragons.",
        "He's a funny kid who loves making his friends laugh.",
        "Carlos is curious and loves asking questions about magic and science.",
        "He's a budding artist who enjoys drawing and painting.",
        "Carlos is compassionate and enjoys helping and comforting his friends.",
        "He's an adventurous eater, always eager to try new foods.",
        "A young musician, he plays the guitar and composes songs.",
        "In school, Carlos excels and gets creative with assignments related mathematics.",
        "Carlos loves reading fantasy novels, especially those with wizards and dragons.",
        "Carlos really enjoys playing soccer.",
        "He adores his dog Rocky.",
        "Outdoorsy, he explores nature and sometimes imagines magical creatures."
    ]
}

const EditProfile = ({ profile = defaultProfile }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch()

    const goToChat = () => {
        dispatch(setActiveTab('chat'))
    }

    return (
        <React.Fragment>

            <div className="d-flex p-3 align-items-center">
                <Button color="outline-primary" className="me-3 p-1" onClick={goToChat}>
                    <i className="ri-arrow-left-line font-size-24 fw-normal mx-2"></i>
                </Button>
                <h1 className="mb-0 ff-special font-size-24 fw-bold">{t('Reader editor')}</h1>
            </div>

            <div className="p-3">
                <div className="border-light border rounded-3 p-3">
                    <div className="avatar-md mb-3">
                        <picture>
                            <source srcSet={profile?.image} className="rounded avatar-md" />
                            <img src={avatar1} className="rounded avatar-md" alt="chatvia" />
                        </picture>
                    </div>

                    <div className="mb-3">
                        <h6 className="mb-2"> {profile?.name} </h6>
                        <p className="opacity-75 font-size-12"> {profile?.years + ' ' + t('years')} </p>
                    </div>

                    <ul className="opacity-75 font-size-12 ps-3">
                        {
                            profile?.characteristics?.map((characteristic, key) =>
                                <li key={key} id={"characteristic" + key} >
                                    {characteristic}
                                </li>
                            )
                        }
                    </ul>

                </div>
            </div>

        </React.Fragment>
    );
}

export default connect(null, { setActiveTab })(EditProfile);