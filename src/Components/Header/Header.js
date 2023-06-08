import "./Header.css";

const Header = ({ title }) => {
  return (
    <header>
      <h1 className="header-title">Multiplayer {title}</h1>
    </header>
  );
};

export default Header;
