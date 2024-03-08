import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, FormFeedback, InputGroup, Label, Input, Badge, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

import CardTale from './CardTale';
import { ModalFilters } from './ModalFilters';

//i18n
import { useTranslation } from 'react-i18next';

//images
import avatar1 from "../../assets/images/users/avatar-tales-big.png";
import avatar2 from "../../assets/images/users/avatar-2.jpg";

import iconFilter from "../../assets/images/icons/filter.svg";

const Index = (props) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [openFilters, setOpenFilters] = useState(false);
    const [filters, setFilters] = useState({
        search: '',
        profiles: [],
        genres: []
    })
    const handleFilters = (newFilters) => {
        setFilters({
            ...filters,
            ...newFilters
        })
    }

    const library = {
        tales: [
            {
                id: 0,
                name: 'Carlos and the dragons',
                image: avatar2,
                description: "Johnny, an 8-year-old boy, discovers his magical ability when he is transported to a realm of dragons and wizards. With the help of new friends, he must learn to control his powers and confront a dark threat to save the magical kingdom.",
                characters: [
                    { name: 'Character 1'},
                    { name: 'Character 2'},
                    { name: 'Character 3'},
                ],
                genres: [
                    { id: 0, name: 'Fantasy' },
                    { id: 1, name: 'Comedy' }
                ],
                profile: {
                    id: 0,
                    name: 'Carlos',
                    image: '',
                    years: 8,
                }
            },
            {
                id: 1,
                name: 'Juan and the dragons',
                image: avatar1,
                description: "Johnny, an 8-year-old boy, discovers his magical ability when he is transported to a realm of dragons and wizards. With the help of new friends, he must learn to control his powers and confront a dark threat to save the magical kingdom.",
                characters: [
                    { name: 'Character 4'},
                    { name: 'Character 5'},
                    { name: 'Character 6'},
                ],
                genres: [
                    { id: 2, name: 'Adventure' }
                ],
                profile: {
                    id: 1,
                    name: 'Juan',
                    image: '',
                    years: 10,
                }
            },
        ]
    }

    const [talesFiltered, setTalesFiltered] = useState(library.tales)
    const totalFiltered = library.tales.length - talesFiltered.length
    useEffect(() => {
        applyFilters()
    }, [filters])

    const applyFilters = () => {
        const newListTales = library.tales.filter(tale => {
            const lowercaseSearch = filters.search.toLowerCase();
            const lowercaseName = tale.name.toLowerCase();
            const lowercaseDescription = tale.description.toLowerCase();

            const searchCondition = lowercaseName.includes(lowercaseSearch) || lowercaseDescription.includes(lowercaseSearch)

            const profilesCondition = filters.profiles.length
                    ? filters.profiles.some(p => p.id === tale.profile.id)
                    : true
            
            const genresCondition = filters.genres.length
                    ? filters.genres.every(fg => !tale.genres.find(g => g.id === fg.id))
                    : true
                
            return profilesCondition && genresCondition && searchCondition;
        })

        setTalesFiltered(newListTales)
    }

    const getGenres = () => {
        var genres = []

        library.tales.forEach(tale => {
            genres = genres.concat(tale.genres)
        });

        return genres;
    }

    const getProfiles = () => {
        var profiles = []

        library.tales.forEach(tale => {
            profiles = profiles.concat(tale.profile)
        });

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
                    <Col lg="6">
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
                    </Col>
                </Row>
            </div>

            <div className="p-3 pt-0 pt-lg-4 p-lg-4 flex-wrap d-flex flex-column flex-lg-row-reverse justify-content-center library-tales gap-3">
                {talesFiltered.map(tale => {
                    return <CardTale key={tale.uid} {...tale} />
                })
                }
            </div>

            <ModalFilters isOpen={openFilters} setOpen={setOpenFilters} genres={getGenres()} profiles={getProfiles()} callback={handleFilters} />
        </div>

        </React.Fragment>
    );
}

export default Index;