export default function Header() {
  return (
    <header className="Header bb w-100">
      <article className="Container flex items-center justify-between">
        <section className="Header__logo">
          <img className="Header__logo-image db" src="images/uf_logo.png" alt="" />
        </section>
        <ul className="Header__nav">
          <li className="Header__nav-item dib mr3">Something</li>
          <li className="Header__nav-item dib mr3">Something</li>
          <li className="Header__nav-item dib mr3">Something</li>
          <li className="Header__nav-item dib">Something</li>
        </ul>
      </article>
    </header>
  );
};
