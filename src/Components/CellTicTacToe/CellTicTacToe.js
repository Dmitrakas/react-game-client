import "./CellTicTacToe.css";

const CellTicTacToe = ({ handleCellClick, id, text }) => {
  return (
    <div id={id} className="cell" onClick={handleCellClick}>
      {text}
    </div>
  );
};

export default CellTicTacToe;
