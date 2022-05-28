// CSS
import "./Menu.css";

export const MenuLi = (props) => {
  const style = (delay, length = props.menuLi.length) => {
    return {
      animationDelay: delay * 0.1 /* (1 / length) */ + "s",
    };
  };
  return (
    <div className="MenuLi flex row">
      {props.menuLi.split("").map((elem, acc) => (
        <div className="menuLiLetter" data-letter={elem} style={style(acc)}>
          {elem}
        </div>
      ))}
    </div>
  );
};
