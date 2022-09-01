import React from 'react';
import {Link} from 'react-router-dom';
import './others-style/About.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';

function About() {

  return (
    <>
    <div className='f-body about-body'>
      <Accordion >
        <Accordion.Item eventKey="0">
          <Accordion.Header>Chess game</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>React Quiz</Accordion.Header>
          <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Weather API</Accordion.Header>
          <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>


    <div className='my-carousel'>
    <Carousel fade>
      <Carousel.Item className='car-item' style={{border: 'solid white 2px', height: '70vh'}}>
        <img
          className="d-block w-100"
          src={require("./imgs/react-chess.jpg")}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Chess</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          <Link  to='/games/chess' ><Button  variant='outline-light' type='button'>Play</Button></Link>
          
        </Carousel.Caption>
      </Carousel.Item >
      <Carousel.Item className='car-item' style={{border: 'solid white 2px', height: '70vh'}}>
        <img
          className="d-block w-100"
          src={require("./imgs/react-quiz.jpg")}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Quiz</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <Link to='/games/quiz'>
            <Button variant='outline-light'>Play</Button>
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className='car-item' style={{border: 'solid white 2px', height: '70vh'}}>
        <img
          className="d-block w-100 img-fluid "
          src={require("./imgs/react-weather.jpg")}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Weather</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          <Button variant='outline-light'>Show</Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>

    </>
  )
}

export default About;