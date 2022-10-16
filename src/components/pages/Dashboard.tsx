import React, { FC, useEffect, useState } from 'react';
import { Badge, Button, Card, Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { getDashboard, postUnsubscriber } from "../../services/auth/PlayersServices"
import { FaBellSlash, FaExternalLinkAlt } from "react-icons/fa";
import { Link ,generatePath } from "react-router-dom"

import { Player } from "../../interfaces"
import Alerts from "../shared/Alerts"

const Dashboard: FC = () => {
  const [players, setPlayers] = useState<Player[]>([])

  const [opemMsg, setOpemMsg] = useState<boolean>(false)
  const [variant, setVariant] = useState<string>("")
  const [msgs, setMsgs] = useState<Array<string>>([])

  useEffect(() => {
    handleGetPlayersDashboard()
  }, [setPlayers])
  
  const handleGetPlayersDashboard = async () => {
    try {
      const res = await getDashboard()
      setPlayers(res.data.players)
    } catch (err) {
      // Error
      // console.log(err)
    }
  }


  const handlerUnSubscriber = async(id: number) => {
    try {
      const response = await postUnsubscriber(id)

      if(response.status === 200) {
        handleGetPlayersDashboard()
        setVariant('success')
        setMsgs(['Unsubscription sucess'])
        setOpemMsg(true)
      }else{
        setVariant('danger')
        setMsgs(['Error Unsubscription'])
        setOpemMsg(true)
      }
    } catch (err) {
      setVariant('danger')
      setMsgs(['Error Unsubscription'])
      setOpemMsg(true)
    }
    
  }

  const renderCard = (player: Player) => {
    return(
      <Col xxl='4' className='mb-4'>
        <Card>
          <Card.Header>
            {player.name}
            <span style={{float: 'right'}}>
              <Badge bg={player.notifications_count > 0 ? 'warning' : 'dark'}>{player.notifications_count}</Badge>
            </span>
          </Card.Header>
          <Card.Body>
            <Container className='mb-4'>
              <Row>
                <Col className='p-0 text-center'>
                  <span className='d-inline-block m-1'>
                    <OverlayTrigger
                        key={'top'}
                        placement={'top'}
                        overlay={
                          <Tooltip id={`tooltip-${'top'}`}>
                            Team
                          </Tooltip>
                        }
                    >
                        <Badge pill bg="primary">
                          {player.team}
                        </Badge>
                    </OverlayTrigger>
                  </span>
                  <span className='d-inline-block m-1'>
                    <OverlayTrigger
                        key={'top'}
                        placement={'top'}
                        overlay={
                          <Tooltip id={`tooltip-${'top'}`}>
                            Position
                          </Tooltip>
                        }
                    >
                      <Badge pill bg="success">
                        {player.position}
                      </Badge>
                    </OverlayTrigger>
                  </span>
                  <span className='d-inline-block m-1'>
                    <OverlayTrigger
                        key={'top'}
                        placement={'top'}
                        overlay={
                          <Tooltip id={`tooltip-${'top'}`}>
                            Number
                          </Tooltip>
                        }
                    >
                      <Badge pill bg="secondary">
                        {player.number}
                      </Badge>
                    </OverlayTrigger>
                  </span>
                  <span className='d-inline-block m-1'>
                    <OverlayTrigger
                        key={'top'}
                        placement={'top'}
                        overlay={
                          <Tooltip id={`tooltip-${'top'}`}>
                            Nationality
                          </Tooltip>
                        }
                    >
                      <Badge pill bg="info">
                        {player.nationality}
                      </Badge>
                    </OverlayTrigger>
                  </span>
                  <span className='d-inline-block m-1'>
                    <OverlayTrigger
                        key={'top'}
                        placement={'top'}
                        overlay={
                          <Tooltip id={`tooltip-${'top'}`}>
                            Age
                          </Tooltip>
                        }
                    >
                      <Badge pill bg="light" text="dark">
                        {player.age}
                      </Badge>
                    </OverlayTrigger>
                  </span>
                </Col>
                
              </Row>
            </Container>
            <Row>
              <Col className='text-center'>
                <Link className="btn btn-success" to={generatePath("/players/:id", { id:player.id  })}><FaExternalLinkAlt /> View</Link>
              </Col>
              <Col className='text-center'>
                <Button className='ml-3' onClick={() => handlerUnSubscriber(player.id) }><FaBellSlash /> Unsubscriber</Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    )
  }


  return(
    <Container>
      <Row>
        <Col xxl='12' className='mb-3'>
          <h1>Dashboard</h1>
        </Col>

        <Alerts 
          variant={variant}
          open={opemMsg}
          msgs={msgs}
        />
        
        {
          players.map((p) => renderCard(p))
        }
      </Row>
    </Container>
    
  )
}

export default Dashboard