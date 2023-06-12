import { PropsWithChildren } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useGraphContext } from "../GraphContext";


interface IGraphModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export default function GraphModal({ show, setShow, children }: PropsWithChildren<IGraphModalProps>) {
  const { toCurrency } = useGraphContext();
  return (
    <>
      <Modal show={show} size="lg">
        <Modal.Header>
          <Modal.Title>
            {`EUR - ${toCurrency} rates in last 30 days.`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' size='sm' onClick={() => setShow(false)}>
            {'Close'}
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}
