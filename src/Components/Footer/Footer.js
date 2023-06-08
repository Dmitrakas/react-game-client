import DarkMode from "../../Assets/DarkMode";
import LinkSvg from "../../Assets/Link";
import "./Footer.css";

const Footer = ({ setShowModal }) => {
  return (
    <footer>
      <LinkSvg setShowModal={setShowModal} />
      <DarkMode />
    </footer>
  );
};

export default Footer;
