export default function Die(props) {
  const buttonClass = props.isHeld ? "die selected" : "die";
  return (
    <button
      onClick={() => props.hold(props.id)}
      className={buttonClass}
      aria-pressed={props.isHeld}
      aria-lable={`Die with value of ${props.value} is ${
        props.isHeld ? "held" : "not held"
      }`}
    >
      {props.value}
    </button>
  );
}
