import { useState, useEffect } from 'react';
import Link from 'next/link';
import Nav from 'components/site/Nav';
import ScrollLockComponent from 'components/utils/scrollLockComponent';
import classnames from 'classnames';

export default function Header({preview = false, className = ''}) {
  const [burgerState, setBurgerState] = useState(false);
  useEffect(() => {
    // Whenever we hit the escape key,
    // close the burger menu (if open)
    const trackEscapeKey = e => {
      if (e.key === 'Escape') {
        setBurgerState(false);
      }
    };
    window.addEventListener('keyup', trackEscapeKey);
    return () => {
      window.removeEventListener('keyup', trackEscapeKey);
    };
  }, [setBurgerState]);
  return (
    <>
      <header className={`Header w-100 ${className}`}>
        <article className="Container flex items-center justify-between">
          <section className="Header__logo">
            <Link href={`/${preview ? '?preview=true' : ''}`}>
              <a title="Home">
                <img className="Header__logo-image db" src="/images/uf_logo_alt.png" alt="" />
              </a>
            </Link>
          </section>
          <section className="Header__hamburger fixed">
            <button
              className={classnames("Header__hamburger-button", {
                active: burgerState
              })}
              onClick={() => {setBurgerState(!burgerState)}}
            >
              <span className="top"></span>
              <span className="middle"></span>
              <span className="bottom"></span>
            </button>
          </section>
        </article>
      </header>
      <Nav
        toggleNav={burgerState}
        setToggle={setBurgerState}
      />
      {burgerState && <ScrollLockComponent />}
    </>
  );
};
