import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = ()=>{
    const {t} = useTranslation(); 
    return(
        <div className='footer'>
            <h3>{t("footerData")}</h3>
        </div>
    )
}

export default Footer;