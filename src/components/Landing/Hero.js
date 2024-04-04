import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

// i18n
import { useTranslation } from 'react-i18next';

// Images
import downloadShap from '../../assets/images/landing/download-sharp.svg';

// Actions
import { openModalSignin } from '../../redux/actions';

export const Hero = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    return (
        <div className="hero vh-100 d-flex w-100 align-items-center justify-content-center">
            <div className="container-fluid text-center hero-txt">
                <h1 className="fw-normal mb-5">{t('Magic Tales')}</h1>
                <p className="fs-1 fw-bold mb-5">{t('Get infinite hyper personalized stories within mins')} ✨</p>
                <div className="mx-auto mb-4">
                    <Link to="/dashboard" className="btn btn-primary rounded-pill btn-lg me-3 me-xs-0" type="button">{t('Try to free')}</Link>
                    <Link to="/dashboard" onClick={() => { dispatch(openModalSignin()) }} className="btn btn-primary rounded-pill btn-lg" type="button">{t('Login')}</Link>
                </div>
                <a href="#" className="d-block mx-auto btn-link"><img src={downloadShap} width="24" className="d-inline-block" /> {t('Download Story Sample')}</a>
            </div>
        </div>
    )
}