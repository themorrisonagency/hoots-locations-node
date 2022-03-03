import "../styles/globals.css"
import Image from "next/image"
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <link  rel="stylesheet" href="https://hootswings.com/_assets/css/styles.css?v=1638820388" />
      <header className="main-header header--home js-header">
        <div className="main-header__container">
          <span className="js-menu-button">
            <button className="menu-burger" aria-label="Navigation">
              <span className="menu-burger__bar menu-burger__bar--1"></span>
              <span className="menu-burger__bar menu-burger__bar--2"></span>
              <span className="menu-burger__bar menu-burger__bar--3"></span>

              <span className="menu-burger__close menu-burger__close--1"></span>
              <span className="menu-burger__close menu-burger__close--2"></span>
            </button>
          </span>

          <a href="/" className="main-header__logo">
            <Image src="https://hootswings.com/perch/resources/logos/hoots-wings-logo.png" alt="Hoots Wings" height="100px" width="100px" />
          </a>
          <div className="main-header__navigation">
            <nav className="main-nav js-main-nav">
              <ul className="main-nav__list">
                <li className="main-nav__list-item">
                  <a className="main-nav__list-link " href="https://hootswings.com/locations">
                    Order
                  </a>
                </li>

                <li className="main-nav__list-item">
                  <a className="main-nav__list-link " href="/locations">
                    Locations
                  </a>
                </li>

                <li className="main-nav__list-item">
                  <a className="main-nav__list-link " href="/food">
                    Menu
                  </a>
                </li>
              </ul>
              <ul className="main-nav__list">
                <li className="main-nav__list-item">
                  <a className="main-nav__list-link hootscoop" href="/hoot-scoop">
                    Hootscoop
                  </a>
                </li>

                <li className="main-nav__list-item">
                  <a className="main-nav__list-link " href="/about">
                    About
                  </a>
                </li>

                <li className="main-nav__list-item">
                  <a className="main-nav__list-link " href="https://hootsfranchise.com/">
                    franchise
                  </a>
                </li>

                <li className="main-nav__list-item">
                  <a className="main-nav__list-link " href="https:/careers-hootswings-hoots.icims.com/"></a>
                </li>
              </ul>
            </nav>
          </div>

        </div>
      </header>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
