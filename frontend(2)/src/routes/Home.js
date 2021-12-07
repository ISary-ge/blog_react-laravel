import React from "react";
import Header from "../Components/Header";
import Todos from "./Todos";

const Home = () => {
    return(
        <div>
        <div >
            <Header/>
            <div className="">    
                <Todos/>
            </div>
            {/* <div className="page-content js-page-content" data-plugin="themeAnimation">
        <main>
    <section className="section section--no-overflow section--full-height ui-gray ui-gray-background" data-scroll-section data-appear-animation-group data-static-theme="gray" style={{transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)', opacity: 1, pointerEvents: 'all'}} data-scroll-section-inview>
      <div className="section__content" data-plugin="parallax" data-parallax-pattern="intro" style={{willChange: 'transform', transform: 'translateY(0vh)'}}>
        <div className="landing-intro-deco landing-intro-deco--left" data-plugin="circleDeco" data-circle-deco-delay={450} data-circle-deco-title-direction="reverse" data-circle-deco-wrapper=".section">
          <div className="landing-intro-deco__wrapper">
            <div className="landing-intro-deco__sizer">
              <canvas width={694} height={694} />
            </div>
          </div>
        </div>
        <div className="container-h container-v-intro landing-intro content-full-height content-align-separate">
          <div className="is-hidden--md-up" />
          <div className="landing-intro__card is-hidden--sm-down" data-plugin="parallax" data-parallax-pattern="block" data-parallax-block-multiplier={1} style={{willChange: 'transform', opacity: 0, transform: 'translateY(0.931164vmax)'}}>
            <a className="card card--latest" href="work/alcon.html">
              <figure className="card__image card__image--zoom animation--slow">
                <picture className data-appear-delay={1800} data-plugin="appear  " draggable="false" data-appear-animation-name="image-in">
                  <img src="data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22240%22%20height=%22160%22%20preserveAspectRatio=%22xMinYMax%20meet%22%20viewBox=%220%200%20240%20160%22%3E%3C/svg%3E" alt="Alcon Group" height={160} width={240} className="is-hidden--no-js" draggable="false" srcSet="/assets/images/media/works/alcon/preview-landing.jpg" />
                </picture>
                <noscript>
                  &lt;img src="assets/images/media/works/alcon/preview-landing.jpg" alt="Alcon Group" height="160" width="240"&gt;
                </noscript>
              </figure>
              <div className="card__content">
              </div>
            </a>
          </div>
          <div className="row row--pad row--middle-md">
            <div className="block-block-small-top col col--xs-4 col--sm-1 col--md-3 col--lg-2 offset--lg-4 col--xl-4 col--order-last-xs col--order-first-sm">
              <a className="btn btn--lg btn--square btn--primary" href="#info" data-appear-animation-stagger={17} aria-label="Scroll down">
                <span className="btn__content">
                  <svg className="icon icon-arrow-down" width={22} height={22} aria-hidden="true"><use xlinkHref="/assets/images/icons.svg#arrow-down" /></svg>
                </span>
              </a>
            </div>
            <div className="block-block-small-top col col--xs-4 col--sm-3 col--md-5 col--lg-5 col--xl-4 landing-intro__text">
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
            </div> */}

        </div>
        </div>
    )
}

export default Home;