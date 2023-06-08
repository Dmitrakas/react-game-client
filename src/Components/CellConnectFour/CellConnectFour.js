import "./CellConnectFour.css";

const CellConnectFour = ({ handleCellClick, id, text }) => {
  return (
    <div id={id} className="cell-four" onClick={handleCellClick}>
      {text}
    </div>
  );
};

export default CellConnectFour;
