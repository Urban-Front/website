import Link from 'next/link';
import classnames from 'classnames';

export default function Nav({preview = false, toggleNav, setToggle}) {
  return (
    <>
      <div
        className={classnames('Nav__overlay fixed w-100 h-100', {
          'open': toggleNav
        })}
        onClick={() => {setToggle(false)}}
      ></div>
      <nav className={classnames(`Nav w-100 w-50-lg h-100 fixed flex items-center`, {
        'Nav--open': toggleNav
      })}>
        <ul className="Container Container__auto h-100 pv4 pv6-lg flex flex-column items-center justify-center tc tr-lg">
          <li className="Nav__nav-item db w-100">
            <Link href={`/${preview ? '?preview=true' : ''}`}>
              <a title="Home" className="Nav__nav-link">Home</a>
            </Link>
          </li>
          <li className="Nav__nav-item db w-100">
            <Link href={`/about${preview ? '?preview=true' : ''}`}>
              <a title="About" className="Nav__nav-link">About</a>
            </Link>
          </li>
          <li className="Nav__nav-item db w-100">
            <Link href={`/team${preview ? '?preview=true' : ''}`}>
              <a title="Team" className="Nav__nav-link">Team</a>
            </Link>
          </li>
          <li className="Nav__nav-item db w-100">
            <Link href={`/voices${preview ? '?preview=true' : ''}`}>
              <a title="Voices" className="Nav__nav-link">Voices</a>
            </Link>
          </li>
          <li className="Nav__nav-item db w-100">
            <Link href={`/events${preview ? '?preview=true' : ''}`}>
              <a title="Events" className="Nav__nav-link">Events</a>
            </Link>
          </li>
          <li className="Nav__nav-item db w-100">
            <Link href={`/contact${preview ? '?preview=true' : ''}`}>
              <a title="Contact" className="Nav__nav-link">Contact</a>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
