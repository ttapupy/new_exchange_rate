import { PropsWithChildren } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


interface IGraphModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export default function GraphModal({ show, setShow, children }: PropsWithChildren<IGraphModalProps>) {
  return (
    <>
      <Modal show={show} className="graph-modal">

        <Modal.Header>
          <Modal.Title>
            {'Hello Leo'}
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
