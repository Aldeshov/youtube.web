import { useContext } from 'react';
import { useNavigate } from "react-router";
import { Button, Card, Col, Collapse, Container, Figure, Row } from 'react-bootstrap';
import { BiTime } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';
import { AiOutlinePlayCircle } from 'react-icons/ai';

import VideoContent from '../../models/VideoContent';
import VideoContentListContext from '../../contexts/VideoContentListContext';
import { BASE_URL, getDateTimePreview } from '../../tools/Config';

import './ContentItem.css';

const ContentItem = (props: any) => {
  const navigate = useNavigate();

  let index: number = props.index
  let videoContent: VideoContent = props.videoContent
  
  const { currentIndex, setCurrentIndex } = useContext(VideoContentListContext);

  return (
    <Card
      className={"video-content"} style={{ backgroundColor: '#ddeeff' }}
      onClick={() => { if (currentIndex === index) { setCurrentIndex(-1) } else { setCurrentIndex(index) } }}>
      <Card.Img variant="top" className="crop" src={`${BASE_URL}${videoContent.preview}`} />
      <Card.Body>
        <Card.Title>
          <h6><strong>{videoContent.title}</strong></h6>
        </Card.Title>
        <Row>
          <Col>
            <span><BiTime style={{ marginBottom: '4px' }} /> {getDateTimePreview(videoContent.created_on)}</span>
          </Col>
          <Col>
            <span><AiOutlineEye width={'50px'} style={{ marginBottom: '3px' }} /> {`${videoContent.views} views`}</span>
          </Col>
        </Row>
        <Container fluid="md"
          style={
            {
              border: '0.5px solid rgba(176, 176, 176, 0.64)',
              borderRadius: '10px',
              boxShadow: '0 0 2px rgba(0,0,0,0.2)',
              padding: '10px',
              marginTop: '10px',
              marginBottom: '10px',
            }
          }>
          <Row>
            <Col md="auto">
              <img
                width={48}
                alt="Channel"
                style={{ borderRadius: '50%', boxShadow: '0 0 5px rgba(0,0,0,0.5)' }}
                src={`${BASE_URL}${videoContent.on_channel.avatar}`}
              />
            </Col>
            <Col md="auto">
              <Figure.Caption>
                <span>
                  {videoContent.on_channel.name} <br />
                  {videoContent.on_channel.subscribers} subscribers
                </span>
              </Figure.Caption>
            </Col>
          </Row>
        </Container>
        <Card.Text>
          <Collapse in={currentIndex === index}>
            <div id="description" style={{ marginBottom: '4px', marginRight: '5px' }} >{videoContent.description}</div>
          </Collapse>
          <Button variant="primary" onClick={() => navigate(`/video/${videoContent.code}`)}>
            <AiOutlinePlayCircle style={{ marginBottom: '4px', marginRight: '5px' }} />Watch
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ContentItem;
