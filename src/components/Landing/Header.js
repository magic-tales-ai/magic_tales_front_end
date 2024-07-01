import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

// i18n
import { useTranslation } from 'react-i18next';

// Actions
import { openModalSignin } from '../../redux/actions';

export const Header = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [lastKnownScrollPosition, setLastKnownScrollPosition] = useState(0);
    const [ticking, setTicking] = useState(false);
    const headerRef = useRef();

    const changeHeader = useCallback((scrollPos) => {
        if (headerRef.current) {
            if (scrollPos > 400) {
                headerRef.current.classList.add('onScroll');
                return;
            }
            
            headerRef.current.classList.remove('onScroll');
        }
    }, [headerRef]);

    const handleScroll = useCallback(() => {
        const scrollY = window.scrollY;
        setLastKnownScrollPosition(scrollY);
    
        if (!ticking) {
            window.requestAnimationFrame(() => {
                changeHeader(lastKnownScrollPosition);
                setTicking(false);
            });
        }
        setTicking(true);
    }, [changeHeader, ticking, lastKnownScrollPosition]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    return (
        <header ref={headerRef} className="fixed-top">
            <nav className="navbar navbar-expand-md">
                <div className="container-fluid">
                    <a href="/#" className="navbar-brand"><span>{t('Magic Tales')}</span></a>
                    <div className="ms-auto">
                        <Link to="/dashboard" className="min-width btn btn-primary rounded-pill me-3 me-xs-0" type="button" id="btn-try-free">{t('Try to free')}</Link>
                        <Link to="/dashboard" onClick={() => { dispatch(openModalSignin()) }} className="min-width btn btn-primary rounded-pill" type="button" id="btn-login">{t('Login')}</Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}