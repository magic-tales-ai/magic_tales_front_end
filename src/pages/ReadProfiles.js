import React, { useEffect } from 'react';
import { Button, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from "react-redux";

// Components
import Profile from '../components/ReadProfiles/Profile';

// i18n
import { useTranslation } from 'react-i18next';

// Profiles
import { selectProfiles } from '../redux/profiles-list/selectors';
import { selectStories } from '../redux/stories-list/selectors';

// Actions
import { loadProfilesList } from '../redux/actions';

const ReadProfiles = ({ profiles, stories }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { t } = useTranslation()

    useEffect(() => {
        dispatch(loadProfilesList());
    }, [, stories])

    const cardNewProfile = <div className="border-light border rounded-3 filter-profile">
            <div className="justify-content-center align-items-center d-flex h-100 my-2">
                <Button color="primary" className="py-2 px-3"><i className="font-size-24 fw-normal text-white ri-add-line"></i></Button>
            </div>
        </div>

    return (
        <React.Fragment>
        <div className="w-100">
            <div className="p-3 p-lg-4">
                <Row>
                    <Col lg="12" className="d-flex align-items-center mb-0">
                        <Button color="outline-primary me-3 p-1" onClick={() => navigate('/dashboard')}>
                            <i className="ri-arrow-left-line font-size-24 fw-normal mx-2"></i>
                        </Button>
                        <h1 className="mb-0 ff-special font-size-24 fw-bold">{" "}{t("Reader Profiles")}</h1>
                    </Col>
                </Row>
            </div>

            <div className="p-3 p-lg-4 flex-wrap d-flex flex-column flex-lg-row-reverse justify-content-center reader-list-profile gap-3">
                {cardNewProfile}
        
                {profiles?.list.map(profile => {
                    return (
                        <div key={profile.id} className="border-light border rounded-3 filter-profile">
                            <Profile key={profile.id} profile={profile} />
                        </div>
                    )
                })
                }

            </div>


        </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    const profiles = selectProfiles(state);
    const stories = selectStories(state);

    return { profiles, stories };
};

export default connect(mapStateToProps)(ReadProfiles);