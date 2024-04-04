import React from 'react';

//i18n
import { useTranslation } from 'react-i18next';

export const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="pt-5 mt-md-5">
            <div className="container text-center h-100 py-2">
                <div className="d-flex h-100 justify-content-center">
                    <div className="copyright mt-auto col-9"><p className="fw-light">{t('Copyright © 2023 Mole Street. All Rights Reserved.')}</p></div>
                </div>
            </div>
        </footer>
    )
}