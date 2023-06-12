import { Row, Col } from 'react-bootstrap';

export default function Loading({text}: {text: string}) {
  return (
    <Row className='d-flex justify-content-center'>
      <Col md='auto'>
        <h4>{text}</h4>
        <article className="missing-slice">
          <div>
            <p></p>
            <p></p>
            <p></p>
          </div>
        </article>
      </Col>
    </Row>
  );
}
