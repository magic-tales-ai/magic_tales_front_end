import React, { useEffect, useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { Button, Form, FormGroup, InputGroup, Input, Badge, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

// Components
import CardStory from '../components/Library/CardStory';
import { ModalFilters } from '../components/Library/ModalFilters';

// i18n
import { useTranslation } from 'react-i18next';

// Icons
import iconFilter from "../assets/images/icons/filter.svg";

// Actions
import { loadStoriesList } from '../redux/actions';

// Selectos
import { selectStories } from '../redux/stories-list/selectors';

const Library = ({ stories }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [openFilters, setOpenFilters] = useState(false);
    const [storiesFiltered, setStoriesFiltered] = useState(stories.list);
    const [filters, setFilters] = useState({
        search: '',
        profiles: [],
        genres: []
    })
    const totalFiltered = stories.list.size - storiesFiltered.size;
    
    const handleFilters = (newFilters) => {
        setFilters({
            ...filters,
            ...newFilters
        })
    }

    useEffect(() => {
        dispatch(loadStoriesList());
    }, [])

    useEffect(() => {
        applyFilters()
    }, [filters])

    const applyFilters = () => {
        const newStoriesList = stories.list.filter(story => {
            const lowercaseSearch = filters.search.toLowerCase();
            const lowercaseName = story.get('title').toLowerCase();
            const lowercaseDescription = story.get('synopsis').toLowerCase();

            const searchCondition = lowercaseName.includes(lowercaseSearch) || lowercaseDescription.includes(lowercaseSearch)

            const profilesCondition = filters.profiles.length
                    ? filters.profiles.some(p => p.id === story.profile.id)
                    : true
            
            const genresCondition = filters.genres.length
                    ? filters.genres.every(fg => !story.genres.find(g => g.id === fg.id))
                    : true
                
            return profilesCondition && genresCondition && searchCondition;
        })

        setStoriesFiltered(newStoriesList)
    }

    const getGenres = () => {
        var genres = []

        // stories.list.forEach(story => {
        //     genres = genres.concat(story.genres)
        // });

        return genres;
    }

    const getProfiles = () => {
        var profiles = []

        // stories.list.forEach(story => {
        //     profiles = profiles.concat(story.profile)
        // });

        return profiles;
    }

    const handleInputs = ({ target: { name, value } }) => {
        setFilters({
            ...filters,
            [name]: value
        })
    }

    return (
        <React.Fragment>
        <div className="w-100 overflow-hidden">
            <div className="p-3 p-lg-4 library-topbar">
                <Row>
                    <Col lg="3" className="d-flex align-items-center mb-3 mb-lg-0">
                        <Button color="outline-primary me-3 p-1" onClick={() => navigate('/dashboard')}>
                            <i className="ri-arrow-left-line font-size-24 fw-normal mx-2"></i>
                        </Button>
                        <h1 className="mb-0 ff-special font-size-24 fw-bold">{" "}{t("Library")}</h1>
                    </Col>
                    {/* <Col lg="6">
                        <Form className="d-flex justify-content-center form-search mx-auto">
                            <FormGroup noMargin className="me-2 w-100">
                                <InputGroup className="bg-soft-light rounded-3">
                                    <Input
                                        type="text"
                                        id="search"
                                        name="search"
                                        className="form-control form-control-lg border-light bg-soft-light"
                                        placeholder="Search"
                                        onChange={handleInputs}
                                    />
                                </InputGroup>
                            </FormGroup>

                            <div className="d-inline">
                                <Button color="outline-primary" className="d-flex align-items-center position-relative border-light fw-normal" type="button" onClick={() => setOpenFilters(true)}>
                                    <i className="me-2"><img src={iconFilter}/></i>
                                    {t('Filters')}
                                    <Badge color="dark" className="translate-middle position-absolute top-0 start-100 rounded-pill text-white">
                                        {totalFiltered || ''}
                                    </Badge>
                                </Button>
                            </div>
                        </Form>
                    </Col> */}
                </Row>
            </div>

            <div className="p-3 pt-0 pt-lg-4 p-lg-4 flex-wrap d-flex flex-column flex-lg-row-reverse justify-content-center library-storys gap-3">
                {stories.list.map(story => {
                    return <CardStory key={'card-story-'+story.uid} story={story} />
                })
                }
            </div>

            {/* <ModalFilters isOpen={openFilters} setOpen={setOpenFilters} genres={getGenres()} profiles={getProfiles()} callback={handleFilters} /> */}
        </div>

        </React.Fragment>
    );
}


const mapStateToProps = (state) => {
    const stories = selectStories(state);

    return { stories };
};

export default connect(mapStateToProps)(Library);