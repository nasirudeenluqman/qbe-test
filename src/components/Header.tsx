const Header = () => {
  return (
    <header data-testid="app-header">
      <nav className="navbar">
        <div className="brand-wrap">
          <div className="brand-name" data-testid="header-brand-name">
            Age Calculator
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
