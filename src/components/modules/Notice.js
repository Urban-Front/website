export default function Notice({preview = false, data, className = ''}) {
  return (
    <article className={`Notice tc pv6 bb ${className}`}>
      <h1 className="body-header">This is a notice</h1>
    </article>
  );
};
