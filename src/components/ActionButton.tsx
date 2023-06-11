import { Button } from "react-bootstrap";

interface IActionButtonProps {
  onClick: () => void;
}

export default function ActionButton({ onClick }: IActionButtonProps) {


  return (
    <div className="m-0">
      <Button className="p-2 font-sm align-center" style={{ lineHeight: 1 }} size='sm' variant='secondary' onClick={() => onClick()}>
        <small>{'Show history'}</small>
      </Button>
    </div>
  );
}
