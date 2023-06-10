import { Button } from "react-bootstrap";

export interface IActionButtonProps {
  from: string;
  to: string;
}

export default function ActionButton({ from, to }: IActionButtonProps) {

  const spaceMission = () => {
    alert(
      `Sorry, it's impossible here. You may ask Elon Musk.

Current relation: ${from} - ${to}.`
    )
  }

  return (
    <div className="m-0">
      <Button className="p-2 font-sm align-center" style={{ lineHeight: 1 }} size='sm' variant='secondary' onClick={() => spaceMission()}>
        <small>{'Send me to the space!'}</small>
      </Button>
    </div>
  );
}
