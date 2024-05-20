import React, { useState, useEffect } from "react";
import { Nav, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch, connect } from 'react-redux';

// i18n
import { useTranslation } from 'react-i18next';

// Actions
import { openModalSignin } from "../../../redux/actions";

// Selectors
import { selectUser } from "../../../redux/user/selectors";
import { selectProfiles } from "../../../redux/profiles-list/selectors";
import { selectPlans } from "../../../redux/plans-list/selectors";

const SidebarFooterComponent = ({ user, plansList, anyProfile }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [dropdownOpen, setdropdownOpen] = useState(false)
    const [disableOptionsProfile, setDisableOptionsProfile] = useState(false);

    const toggle = () => setdropdownOpen(!dropdownOpen);

    useEffect(() => {
        if(user?.get('id') && !anyProfile) {
            setDisableOptionsProfile(true);
            return;
        }

        setDisableOptionsProfile(false);
    }, [user, anyProfile]);

    const userMenu = user && <>
        <Dropdown isOpen={dropdownOpen} toggle={toggle} className="user-dropdown" >
        <DropdownToggle tag="a">
            <div className="d-flex align-items-center">
                <div className="chat-user-img online align-self-center me-1 ms-0">
                    <div className="avatar-xs">
                        {user?.get('image') && <img src={'data:image/*;base64,' + user?.get('image')} className={`rounded avatar-xs`} alt="avatar" />}
                    </div>
                </div>
                <div className="flex-grow-1 overflow-hidden">
                    <h5 className="text-truncate font-size-14 mb-0 ms-1">{user.get('username')}</h5>
                </div>
                <div className="flex-lg-column font-size-24">
                    <i className="ri-more-fill ms-auto"></i>
                </div>
            </div>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
            {!disableOptionsProfile && <>
                <Link to="/profiles" size="xs" className="dropdown-item"> {t('Manage Profiles')} </Link>
                <DropdownItem divider />
            </>}
            <Link to="/settings" size="xs" className="dropdown-item"> {t('Settings')} </Link>
            <DropdownItem divider />
            <Link to="/logout" size="xs" className="dropdown-item"> {t('Logout')} </Link>
        </DropdownMenu>
        </Dropdown>
    </>

    const bestPlan = plansList.reduce((bestPlan, currentPlan) => {
        return currentPlan.get('price') > bestPlan.get('price') 
            ?   currentPlan
            :   bestPlan
    })

    const subscriptionInfo = user?.get('plan')?.get('id') !== bestPlan?.get('id')
        ?
            <React.Fragment>
                {!user?.get('plan') || (user.get('plan').get('price') === 0)
                    ?
                        <Link to="/subscription/plans" className="d-flex btn btn-outline-primary text-start mb-2">
                            <i className="ri-star-line me-2"></i>
                            {t('Upgrade Suscription')}
                        </Link>
                    :
                        <React.Fragment>
                            <p>
                                {t("Used _month_stories_count_ of _stories_per_month_ tales.",
                                    {
                                        monthStoriesCount: user?.get('monthStoriesCount'),
                                        storiesPerMonth: user?.get('plan')?.get('storiesPerMonth')
                                    })
                                }
                            </p>

                            <Link to="/subscription/plans" className="d-flex btn btn-outline-primary text-start mb-2">
                                <i className="ri-star-line me-2"></i>
                                {t('Upgrade to Plus')}
                            </Link>
                        </React.Fragment>
                }
            </React.Fragment>
        : 
            null

    const btnJoinMagicTales = <>
        <Button size="lg" color="outline-primary w-100" type="button" onClick={() => dispatch(openModalSignin())}>
            {t('Join Magic Tales')}
        </Button>
    </>

    return (
        <React.Fragment>
            <div className="flex-column mt-auto border-top p-3">
                {user
                    ?
                    <>
                        {subscriptionInfo}
                        {userMenu}
                    </>
                    :
                    <Nav className="side-menu-nav d-block">
                        <Dropdown nav isOpen={dropdownOpen} className="nav-item d-block btn-group dropup profile-user-dropdown" toggle={toggle}>
                            {btnJoinMagicTales}
                        </Dropdown>
                    </Nav>
                }
            </div>
        </React.Fragment>
    )
}


const mapStateToProps = (state) => {
    const { user } = selectUser(state);
    const { list } = selectPlans(state);
    const profiles = selectProfiles(state);
    const anyProfile = profiles.list.size > 0;

    return { user, plansList: list, anyProfile };
};

export const SidebarFooter = connect(mapStateToProps, { openModalSignin })(SidebarFooterComponent);