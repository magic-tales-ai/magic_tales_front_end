import React from 'react';

// Components
import { Header } from '../components/Landing/Header';
import { Footer } from '../components/Landing/Footer';
import { Hero } from '../components/Landing/Hero';
import { PlansList } from '../components/SubscriptionPlans/PlansList';

//i18n
import { useTranslation } from 'react-i18next';

// Images
import section2dk from '../assets/images/landing/section-2-bg-dk.png'
import section2 from '../assets/images/landing/section-2-bg.png'
import section3dk from '../assets/images/landing/section-3-dk.png'
import section3 from '../assets/images/landing/section-3.png'
import section4dk from '../assets/images/landing/section-4-dk.png'
import section4 from '../assets/images/landing/section-4.png'
import section5dk from '../assets/images/landing/section-5-dk.png'
import section5 from '../assets/images/landing/section-5.png'
import section6dk from '../assets/images/landing/section-6-dk.png'
import section6 from '../assets/images/landing/section-6.png'
import section7dk from '../assets/images/landing/section-7-dk.png'
import section7 from '../assets/images/landing/section-7.png'
import section8dk from '../assets/images/landing/section-8-dk.png'
import section8 from '../assets/images/landing/section-8.png'

import library from '../assets/images/landing/library.svg'
import readerProfile from '../assets/images/landing/reader-profile.svg'
import ghost from '../assets/images/landing/ghost.svg'
import languages from '../assets/images/landing/languages.svg'

import separador from '../assets/images/landing/separador.svg'

function ButtonNextSection({scrollTo, className}){

	function scrollToNext(elem) {
	    document.getElementById(elem).scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	return (
		<button data-scrollTo={scrollTo} onClick={() => scrollToNext(scrollTo)} className={`${className} text-dark btn border-0 d-block mx-auto btn-link jump-animation`}>
	        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-chevron-double-down" viewBox="0 0 16 16">
	          <path fillRule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
	          <path fillRule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
	        </svg>
	    </button>
	)
};


const Landing = () => {
	const { t } = useTranslation();
	
	return (
		<div className='container-landing'>
			<Header />
			
			<main>
				<Hero />

				<div id="inicio" className="vh-100 d-md-flex w-100 align-items-center justify-content-center py-5 position-relative">
					<div className="container py-5 text-center">
						<div className="title-infinte-stories mx-auto">
							<h2 className="fw-normal">{t('You can create infinite stories')}</h2>
							<p className="mb-5 px-5">{t('With a sprinkle of AI magic, craft stories that captivate any audience by chatting with our enchanting bot.')}</p>
						</div>
						<picture>
							<source srcSet={section2dk} media="(min-width: 768px)" />
							<img src={section2} className="mx-auto img-fluid mb-5 d-block" />
						</picture>
						<div className="mx-auto px-3 d-inline-block lista-infinite-stories mb-3">
							<ul className="list-unstyled text-start lista-img d-md-flex">
								<li className="mb-4 col-md-3"><img src={library} width="24" /><span className="opacity-75">{t('Save your favourite creations.')}</span></li>
								<li className="mb-4 col-md-3"><img src={readerProfile} width="24" /><span className="opacity-75">{t("Have multiple reader's profiles.")}</span></li>
								<li className="mb-4 col-md-3"><img src={ghost} width="24" /><span className="opacity-75">{t('Create tailor made characters with their own personallities.')}</span></li>
								<li className="col-md-3"><img src={languages} width="24" /><span className="opacity-75">{t('Choose and combine languages freely.')}</span></li>
							</ul>
						</div>
					</div>
					<ButtonNextSection className="scrollRight d-none d-md-block" scrollTo="whyMagicTales"/>
					<ButtonNextSection className="scrollRight d-md-none" scrollTo="unveilNarratives"/>
				</div>

				<div id="whyMagicTales" className="vh-100 d-md-flex w-100 align-items-center justify-content-center position-relative d-none">
					<div className="container py-5 text-center">
						<div className="title-why-magic py-5 mx-auto">
							<h2 className="mb-4 h1">{t('Why MagicTales?')}</h2>
							<p className="mb-5 px-5 opacity-75 mb-md-0">{t('Uncover a wealth of unique features and unparalleled benefits that distinguish us from the ordinary. Allow us to illustrate why MagicTales stands as the ultimate destination for those in search of captivating, personalized narratives.')}</p>
						</div>
					</div>
					<ButtonNextSection className="scrollRight" scrollTo="unveilNarratives"/>
				</div>

				<div id="unveilNarratives" className="vh-100 d-flex w-100 align-items-center justify-content-center position-relative">
					<div className="container py-5 text-center text-md-start section-3">
						<div className="row pb-5">
							<div className="col-md-6">
								<div className="txt-columna mx-auto">
									<h2 className="mb-5">{t('Unveil narratives')} 📚</h2>
									<p className="opacity-75 mb-3">{t('...that resonate with the rich tapestry of diverse cultures!')}</p>
									<p className="opacity-75 mb-3">{t('With the power of cutting-edge technology, we curate stories that honor every festivity, tradition, and culture, spanning across all major languages.')}</p>
									<p className="opacity-75">{t('For the language enthusiasts among us, immerse yourself in tales woven from the threads of multiple languages, turning the journey of language acquisition into a captivating and enchanting experience')}</p>
								</div>
							</div>
							<div className="col-md-6">
								<picture>
									<source srcSet={section3dk} media="(min-width: 768px)" />
									<img src={section3} alt="Stories card" className="mx-auto img-fluid d-block" />
								</picture>
							</div>
						</div>
					</div>
					<ButtonNextSection className="scrollRight" scrollTo="healingThroughStories"/>
				</div>

				<div id="healingThroughStories" className="vh-100 d-flex w-100 align-items-center justify-content-center position-relative">
					<div className="container py-5 text-center text-md-start">
						<div className="row flex-row-reverse pb-5">
							<div className="col-md-6">
								<div className="txt-columna mx-auto">
									<h2 className="mb-5">{t('Healing Through Stories')} 📖</h2>
									<p className="opacity-75 mb-5 mb-md-0">{t("Collaboratively crafted with child psychologists and educational experts, our tales are more than just entertainment. They're tools for personal growth, aiding in navigating fears, school hurdles, and emotional development. Let each narrative  offer a hand of support in every chapter")}</p>
								</div>
							</div>
							<div className="col-md-6">
								<picture>
									<source srcSet={section4dk} media="(min-width: 768px)" />
									<img src={section4} alt="Therapeutic Narratives" className="mx-auto img-fluid mb-5 mb-md-0 d-block" />
								</picture>
							</div>
						</div>
					</div>
					<ButtonNextSection className="scrollRight" scrollTo="discoverMagic"/>
				</div>

				<div id="discoverMagic" className="vh-100 d-flex w-100 align-items-center justify-content-center position-relative">
					<div className="container py-5 text-center text-md-start">
						<div className="row pb-5">
							<div className="col-md-6">
								<div className="txt-columna mx-auto">
									<h2 className="mb-5">{t('Discover the Magic in Everyday Moments!')} ✨</h2>
									<p className="opacity-75 mb-5">{t('Choose from enchanting bedtime tales or knowledge-rich narratives designed to bolster vocabulary and reading prowess. Every story is meticulously tailored to cater to the unique preferences of our users.')}</p>
								</div>
							</div>
							<div className="col-md-6">
								<picture>
									<source srcSet={section5dk} media="(min-width: 768px)" />
									<img src={section5} alt="Magic Learning" className="mx-auto img-fluid mb-5 d-block" />
								</picture>
							</div>
						</div>
					</div>
					<ButtonNextSection className="scrollRight" scrollTo="notJustTales"/>
				</div>

				<div id="notJustTales" className="vh-100 d-flex w-100 align-items-center justify-content-center position-relative">
					<div className="container py-5 text-center text-md-start">
						<div className="row flex-row-reverse">
							<div className="col-md-6">
								<div className="txt-columna mx-auto">
									<h2 className="mb-5">{t('Not Just Tales, but Lifelong Conversations!')} 👴</h2>
									<p className="opacity-75 mb-5">{t('From teens on a journey of self-discovery to adults in pursuit of a delightful escape, our platform crafts compelling conversations for every phase of life. Dive into interactions that enlighten, entertain, and inspire.')}</p>
								</div>
							</div>
							<div className="col-md-6">
								<picture>
									<source srcSet={section6dk} media="(min-width: 768px)" />
									<img src={section6} alt="Conversations" className="mx-auto img-fluid mb-5 d-block" />
								</picture>
							</div>
						</div>
					</div>
					<ButtonNextSection className="scrollRight" scrollTo="storiesWay"/>
				</div>

				<div id="storiesWay" className="vh-100 d-flex w-100 align-items-center justify-content-center position-relative">
					<div className="container py-5 text-center text-md-start">
						<div className="row pb-5">
							<div className="col-md-6">
								<div className="txt-columna mx-auto">
									<h2 className="mb-5">{t('Your Stories, Your Way!')} 📱</h2>
									<p className="opacity-75 mb-5">{t("Dive into tales anytime, anywhere with our intuitive web portal or our handy mobile app. Schedule your next story adventure in advance, or let spontaneity guide your reading journey. With MagicTales, you're in control.")}</p>
								</div>
							</div>
							<div className="col-md-6">
								<picture>
									<source srcSet={section7dk} media="(min-width: 768px)" />
									<img src={section7} alt="Flexible Access" className="mx-auto img-fluid mb-5 d-block" />
								</picture>
							</div>
						</div>
					</div>
					<ButtonNextSection className="scrollRight" scrollTo="globalStorytelling"/>
				</div>

				<div id="globalStorytelling" className="vh-100 d-flex w-100 align-items-center justify-content-center position-relative">
					<div className="container py-5 text-center">
						<img src={separador} width="210" className="mx-auto mb-5" />
						<div className="title-global-storytelling mx-auto mb-5">
							<h2 className="mb-5">{t('Global Storytelling')}</h2>
							<p className="opacity-75">{t('Step into the realm of languages with our enchanting stories, tailored in any language or a blend of your choice. A magical tool for language enthusiasts on a journey to enhance their linguistic skills')}</p>
						</div>
						<picture>
							<source srcSet={section8dk} media="(min-width: 768px)" />
							<img src={section8} className="mx-auto img-fluid mb-5" />
						</picture>
					</div>
					<ButtonNextSection className="scrollRight" scrollTo="plansList"/>
				</div>

				<PlansList />

			</main>

			<Footer />
		</div>
	);
};

export default Landing;
