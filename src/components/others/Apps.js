import React from 'react';
import './others-style/Apps.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { NavLink } from 'react-router-dom';



function Apps() {
  return (
    <>
      <div className='f-body about-body'>
          
{/*  */}
          <Card className="text-center">
          <Card.Header>#1</Card.Header>
          <Card.Body>
            <Card.Title>React Games</Card.Title>
            
            <NavLink to='/playground'>
              <Button variant="primary">Try this</Button>
            </NavLink>
          </Card.Body>
        </Card>
        {/*  */}
        <Card className="text-center">
          <Card.Header>#2</Card.Header>
          <Card.Body>
            <Card.Title>React Weather</Card.Title>
            
            <NavLink to='/apps/weather'>
              <Button variant="primary">Try this</Button>
            </NavLink>
          </Card.Body>
        </Card>

        <Card className="text-center">
          <Card.Header>#3</Card.Header>
          <Card.Body>
            <Card.Title>React Todo</Card.Title>
            
            <NavLink to='/apps/todo'>
              <Button variant="primary">Try this</Button>
            </NavLink>
          </Card.Body>
        </Card>

        {/* <Card className="text-center">
          <Card.Header>#4</Card.Header>
          <Card.Body>
            <Card.Title>React 4</Card.Title>
            
            <NavLink to='/apps/todo'>
              <Button variant="primary">Try this</Button>
            </NavLink>
          </Card.Body>
        </Card>

        <Card className="text-center">
          <Card.Header>#5</Card.Header>
          <Card.Body>
            <Card.Title>React 5</Card.Title>
            
            <NavLink to='/apps/todo'>
              <Button variant="primary">Try this</Button>
            </NavLink>
          </Card.Body>
        </Card> */}
      </div>
    </>
  )
}

export default Apps;