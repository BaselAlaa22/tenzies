export default function Die(props) {
  const buttonClass = props.isHeld ? "die selected" : "die";
  return <button className={buttonClass}>{props.value}</button>;
}
