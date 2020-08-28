export default function Notice({preview = false, data, className = ''}) {
  return (
    <article className={`Gallery h75 flex items-center ${className}`}>
      <h1 className="body-header w-100 tc">This is a gallery</h1>
    </article>
  );
};
