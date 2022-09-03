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
          The current form of the game emerged in Spain and the rest of Southern Europe during the second half of the 15th century after evolving from chaturanga, a similar but much older game of Indian origin. Today, chess is one of the world's most popular games, played by millions of people worldwide. <br/><br/>
          <Link to='/games/chess'>
            <Button>Play</Button>
          </Link>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>React Quiz</Accordion.Header>
          <Accordion.Body>
          A quiz is a form of game or mind sport in which players attempt to answer questions correctly about a certain or variety of subjects. Quizzes can be used as a brief assessment in education and similar fields to measure growth in knowledge, abilities, or skills.  <br/><br/>
          <Link to='/games/quiz'>
            <Button>Play</Button>
          </Link>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Weather API</Accordion.Header>
          <Accordion.Body>
          OpenWeatherMap is an online service, that provides global weather data via API, including current weather data, forecasts, nowcasts and historical weather data for any geographical location.  <br/> <br/>
          <Link to='/apps/weather'>
            <Button>Show</Button>
          </Link>
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
          <Link to='/apps/weather'>
            <Button variant='outline-light'>Show</Button>
          </Link>
          {/* <Button variant='outline-light'>Show</Button> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>

    </>
  )
}

export default About;