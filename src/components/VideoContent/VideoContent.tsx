import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, Col, Container, Figure, Row } from 'react-bootstrap';

import VideoContent from '../../models/VideoContent'
import { BASE_URL, getDateTimePreview } from '../../tools/Config';
import { BiTime } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';
import { AiTwotoneLike } from 'react-icons/ai';
import { AiTwotoneDislike } from 'react-icons/ai';
import { APIRequest } from '../../tools/API';
import DefaultState from '../../models/DefaultState';
import StoreState from '../../models/StoreState';

import './VideoContent.css'

const VideoContentComponent = () => {
    const { videoCODE } = useParams();
    const [videoContent, setVideoContent] = useState<VideoContent>();

    const defState = (useSelector(store => store) as any).defaultStore;
    const tokenState = (useSelector(store => store) as any).tokenStore;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'LOADING', payload: null });
        setVideoContent(undefined);

        APIRequest<VideoContent>(`${BASE_URL}/app/contents/${videoCODE}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${tokenState}`
            },
            method: 'GET'
        })
            .then(videoContent => {
                dispatch({ type: 'LOADED', payload: "Video content" });
                setVideoContent(videoContent);
            })
            .catch((error: Error) => {
                dispatch({ type: 'ERROR', payload: error.message });
            })
    }, [videoCODE]);

    return (
        <Container fluid style={{ paddingTop: 75, display: 'flex', justifyContent: 'center' }}>
            {
                (defState as DefaultState).status === StoreState.LOADED_SUCCESSFULLY &&
                <Card style={{ width: '700px'}}>
                    <Card.Body>
                        <video width="640" controls>
                            <source src={`${BASE_URL}/media/placeholder.mp4`} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <Card.Title>
                            <h6><strong>{videoContent?.title}</strong></h6>
                        </Card.Title>
                        <Row>
                            <div style={{ width: '90%' }}>
                                {videoContent?.description}
                            </div>
                        </Row>
                        <Row>
                            <Col>
                                <Row>
                                    <span><BiTime style={{ marginBottom: '4px' }} /> {getDateTimePreview(`${videoContent?.created_on}`)}</span>
                                </Row>
                                <Row>
                                    <span><AiOutlineEye width={'50px'} style={{ marginBottom: '3px' }} /> {`${videoContent?.views} views`}</span>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <span><AiTwotoneLike style={{ marginBottom: '4px' }} />{`${videoContent?.likes} likes`}</span>
                                </Row>
                                <Row>
                                    <span><AiTwotoneDislike width={'50px'} style={{ marginBottom: '3px' }} />{`${videoContent?.dislikes} dislikes`}</span>
                                </Row>
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
                                        src={`${BASE_URL}${videoContent?.on_channel.avatar}`}
                                    />
                                </Col>
                                <Col>
                                    <Figure.Caption>
                                        <span>
                                            {videoContent?.on_channel.name} <br />
                                            {videoContent?.on_channel.subscribers} subscribers
                                        </span>
                                    </Figure.Caption>
                                </Col>
                                <Col md="auto" style={{ paddingTop: '5px' }}>
                                    <Figure.Caption>
                                        <Button>Subscribe</Button>
                                    </Figure.Caption>
                                </Col>
                            </Row>
                        </Container>
                    </Card.Body>
                </Card>
            }
        </Container>
    );
}

export default VideoContentComponent;
