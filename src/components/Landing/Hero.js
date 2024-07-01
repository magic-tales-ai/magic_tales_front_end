import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

// i18n
import { useTranslation } from 'react-i18next';

// Images
import downloadShap from '../../assets/images/landing/download-sharp.svg';

// Actions
import { openModalSignin } from '../../redux/actions';

function scrollToNext(elem) {
    document.getElementById(elem).scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export const Hero = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    return (
        <div className="hero vh-100 d-flex w-100 align-items-center justify-content-center py-5">
            <div className="container-fluid text-center hero-txt">
                <h1 className="fw-normal mb-5">{t('Magic Tales')}</h1>
                <p className="fs-1 fw-bold mb-5">{t('Get infinite hyper personalized stories within mins')} ✨</p>
                <div className="mx-auto mb-4">
                    <Link to="/dashboard" className="min-width btn btn-primary rounded-pill btn-lg me-3 me-xs-0" type="button">{t('Try to free')}</Link>
                    <Link to="/dashboard" onClick={() => { dispatch(openModalSignin()) }} className="min-width btn btn-primary rounded-pill btn-lg" type="button">{t('Login')}</Link>
                </div>
                <a href="/#" className="d-block mx-auto btn-link mb-5"><img src={downloadShap} width="24" className="d-inline-block" alt="Download" /> {t('Download Story Sample')}</a>
                <button onClick={() => scrollToNext('inicio')} className="text-dark btn border-0 d-block mx-auto btn-link jump-animation">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-chevron-double-down" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                      <path fillRule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}