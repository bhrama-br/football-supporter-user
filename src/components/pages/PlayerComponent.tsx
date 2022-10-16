import { FC, useEffect, useState } from 'react';
import { Button, Col, Container, Row, Card } from 'react-bootstrap';
import moment from 'moment';
import { getPlayer, postSubscriber, postUnsubscriber } from "../../services/auth/PlayersServices"
import { Player, Notification } from "../../interfaces"
import { FaRegBell, FaBellSlash } from "react-icons/fa";
import { useParams } from "react-router-dom"
import Alerts from "../shared/Alerts"

const PlayerComponent: FC = () => {
  const { id } = useParams<{id: string}>();
  const id_params = Number(id);
  const [player, setPlayer] = useState<Player>(Object)
  
  const [opemMsg, setOpemMsg] = useState<boolean>(false)
  const [variant, setVariant] = useState<string>("")
  const [msgs, setMsgs] = useState<Array<string>>([])

  const handleGetPlayer = async (id: number) => {
    try {
      const response = await getPlayer(id)
      setPlayer(response.data.player)
    } catch (err) {
      // Error
      // console.log(err)
    }
  }

  const handlerSubscriber = async(id: number) => {
    try {
      const response = await postSubscriber(id)

      if(response.status === 201) {
        handleGetPlayer(id)
        setVariant('success')
        setMsgs(['Subscription sucess'])
        setOpemMsg(true)
      }else{
        setVariant('danger')
        setMsgs(['Error Subscription'])
        setOpemMsg(true)
      }
    } catch (err) {
      setVariant('danger')
      setMsgs(['Error Subscription'])
      setOpemMsg(true)
    } 
  }

  const handlerUnSubscriber = async(id: number) => {
    try {
      const response = await postUnsubscriber(id)

      if(response.status === 200) {
        handleGetPlayer(id)
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

  useEffect(() => {
    handleGetPlayer(id_params)
  }, [id_params, setPlayer])


  const renderNotification = (notify: Notification, i: number) => {
    return (
      <Col xxl='12' className='mb-2' key={i}>
        <Card>
          <Card.Header>
            {moment(notify.created_at).format('YYYY-MM-DD')}
          </Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p>
                {notify.message}
              </p>
            </blockquote>
          </Card.Body>
        </Card>
      </Col>
    )
  }


  return(
    <Container>
      <Row>
        <Col xxl='10'>
          <h1>{player.name} - Number {player.number} - Position {player.position}</h1>
        </Col>
        <Col xxl='2' className='text-left mt-2 mb-5'>
          {
            player.subscriber ? 
              (
                <Button onClick={() => handlerUnSubscriber(id_params) }><FaBellSlash /> Unsubscriber</Button>
              ) 
              : (
                <Button onClick={() => handlerSubscriber(id_params) }><FaRegBell /> Subscriber</Button>
              )
          }
        </Col>

        <Alerts 
          variant={variant}
          open={opemMsg}
          msgs={msgs}
        />
        
        
        <Col xxl='4'>
          <b>Team:</b> {player.team}
        </Col>
        <Col xxl='4'>
          <b>Nationality:</b> {player.nationality}
        </Col>
        <Col xxl='2'>
          <b>Birth Date:</b> {player.birth_date}
        </Col>
        <Col xxl='2'>
          <b>Age:</b> {player.age}
        </Col>

        <Col xxl='12' className='mt-5'>
          <h1>Notifications</h1>
        </Col>
        
        <>
        {
          player.notifications ? player.notifications.map((notify, i) => renderNotification(notify, i) ) : ''
        }
        </>
      </Row>
    </Container>
    
  )
}

export default PlayerComponent