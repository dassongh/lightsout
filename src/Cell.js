import './Cell.css';

export default function Cell({ flipCellsAroundMe, isLit }) {
  const handleClick = evt => {
    flipCellsAroundMe();
  };

  let classes = 'Cell' + (isLit ? ' Cell-lit' : '');

  return <td className={classes} onClick={handleClick} />;
}
