import Link from 'next/link';

export default function Header({preview = false}) {
  return (
    <header className="Header bb w-100">
      <article className="Container flex items-center justify-between">
        <section className="Header__logo">
          <Link href={`/${preview ? '?preview=true' : ''}`}>
            <a title="Home">
              <img className="Header__logo-image db" src="images/uf_logo.png" alt="" />
            </a>
          </Link>
        </section>
        <ul className="Header__nav flex flex-column flex-row-md">
          <li className="Header__nav-item dib mr3">
            <Link href={`/about${preview ? '?preview=true' : ''}`}>
              <a title="About">About</a>
            </Link>
          </li>
          <li className="Header__nav-item dib mr3">
            <Link href={`/team${preview ? '?preview=true' : ''}`}>
              <a title="Team">Team</a>
            </Link>
          </li>
          <li className="Header__nav-item dib mr3">
            <Link href={`/voices${preview ? '?preview=true' : ''}`}>
              <a title="Voices">Voices</a>
            </Link>
          </li>
          <li className="Header__nav-item dib mr3">
            <Link href={`/events${preview ? '?preview=true' : ''}`}>
              <a title="Events">Events</a>
            </Link>
          </li>
          <li className="Header__nav-item dib">
            <Link href={`/contact${preview ? '?preview=true' : ''}`}>
              <a title="Contact">Contact</a>
            </Link>
          </li>
        </ul>
      </article>
    </header>
  );
};
