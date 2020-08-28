export default function Notice({preview = false, data = {header: 'notice'}, className = ''}) {
  return (
    <article className={`Notice tc pv6 bb ${className}`}>
      <h1 className="body-header">{data.header}</h1>
    </article>
  );
};
