export default function Header({ poolSize, totalSize }) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="brand">
          <span className="brand__mark" aria-hidden="true" />
          <div className="brand__text">
            <h1>Champ Picker</h1>
            <p>Randomised League of Legends champion selector</p>
          </div>
        </div>

        <div className="pool-badge" aria-live="polite">
          <span className="pool-badge__count">{poolSize}</span>
          <span className="pool-badge__label">
            of {totalSize} champions in pool
          </span>
        </div>
      </div>
    </header>
  );
}
