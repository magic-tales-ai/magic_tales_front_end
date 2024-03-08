import React, { useState, useRef } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Badge } from "reactstrap";

import Profile from "../ReadProfiles/Profile";

//i18n
import { useTranslation } from 'react-i18next';

export const ModalFilters = (props) => {
    const { isOpen, setOpen, callback, genres, profiles, currentProfilesSelected = [], currentGenresSelected = [] } = props;
    const { t } = useTranslation();

    const profileRefs = useRef(profiles.map(() => React.createRef()));
    const genresRefs = useRef(genres.map(() => React.createRef()));
    const [profilesSelected, setProfilesSelected] = useState(currentProfilesSelected);
    const [genresSelected, setGenresSelected] = useState(currentGenresSelected);

    const toggle = () => {
        setOpen(!isOpen)
    }

    const toggleGenre = () => {
        if (genresSelected) {

        }
    }

    const handleProfileClick = (index) => {
        const profileRef = profileRefs.current[index]
        const found = profilesSelected.find(p => p.id == profileRef.id)

        if (found) {
            setProfilesSelected(profilesSelected.filter(p => p.id != profileRef.id))
            return;
        }

        setProfilesSelected([...profilesSelected, profiles.find(p => p.id == profileRef.id)])
    }

    const handleGenreClick = (index) => {
        const genreRef = genresRefs.current[index]
        const found = genresSelected.find(g => g.id == genreRef.id)

        if (found) {
            setGenresSelected(genresSelected.filter(g => g.id != genreRef.id))
            return;
        }

        setGenresSelected([...genresSelected, genres.find(g => g.id == genreRef.id)])
    }

    const handleClear = () => {
        clearGenres();
        clearProfiles();
    }

    const clearProfiles = () => {
        setProfilesSelected([])
    }

    const clearGenres = () => {
        setGenresSelected([])
    }

    return (
        <Modal isOpen={isOpen} centered toggle={toggle} size="lg">
            <ModalHeader toggle={toggle} cssModule={{ 'modal-title': 'modal-title text-center w-100 opacity-75' }}>
                Filters
            </ModalHeader>
            <ModalBody className="p-4">
                <h4 className="ff-special fw-bold font-size-24 mb-3">Reader profiles</h4>
                <div className="d-flex flex-wrap gap-3">
                    {profiles.map((profile, index) => {
                        return (
                            <div
                                id={profile.id}
                                ref={(el) => profileRefs.current[index] = el}
                                className={`border-light border rounded-3 filter-profile ${profilesSelected.find(p => p.id === profile.id) ? 'active' : ''}`}
                                onClick={() => handleProfileClick(index)}
                            >
                                <Profile key={profile.id} profile={profile} displayActions={false} small />
                            </div>
                        )
                    })}
                </div>
                <hr className="my-4" />

                <h4 className="ff-special fw-bold font-size-24 mb-3">Genres</h4>

                <div className="d-flex flex-wrap gap-1">
                    <Badge
                        id="all-genres"
                        pill
                        role="button"
                        className={`mb-1 mb-lg-0 py-2 px-3 font-size-16 fw-semibold ${genresSelected.length > 0 ? '' : 'text-white'}`}
                        color={`${genresSelected.length > 0 ? 'secondary' : 'dark'}`}
                        onClick={() => clearGenres()}
                    >
                        {t('All')}
                    </Badge>
                    {genres.map((genre, index) => {
                        return (
                            <Badge
                                id={genre.id}
                                innerRef={(el) => genresRefs.current[index] = el}
                                role="button"
                                className={`mb-1 mb-lg-0 py-2 px-3 font-size-16 fw-semibold ${genresSelected.find(g => g.id === genre.id) ? 'text-white' : ''}`}
                                color={`${genresSelected.find(g => g.id === genre.id) ? 'dark' : 'secondary'}`}
                                pill
                                onClick={() => handleGenreClick(index)}
                            >
                                {genre.name}
                            </Badge>
                        )
                    })}
                </div>

            </ModalBody>
            <ModalFooter className="justify-content-between">
                    <Button color="link border-0 text-dark" onClick={handleClear}>
                        Clear all
                    </Button>
                    <Button color="primary" className="px-4" onClick={() => { callback({ profiles: profilesSelected, genres: genresSelected }); toggle(); }} >
                        Apply
                    </Button>
            </ModalFooter>
        </Modal>
    )
}