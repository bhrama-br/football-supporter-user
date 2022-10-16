import { FC, useEffect, useState } from 'react';
import { Table, Col, Container, Row, Pagination } from 'react-bootstrap';
import { getPlayers, postSubscriber, postUnsubscriber } from "../../services/auth/PlayersServices"
import { Player } from "../../interfaces"
import { FaArrowsAltV, FaArrowUp, FaArrowDown, FaRegBell, FaBellSlash, FaExternalLinkAlt } from "react-icons/fa";
import { Link, generatePath } from "react-router-dom"
import Alerts from "../shared/Alerts"


const Players: FC = () => {
  const [players, setPlayers] = useState<Player[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(0)

  const [orderField, setOrderField] = useState<string>('position')
  const [orderBy, setOrderBy] = useState<string>('ASC')

  const [opemMsg, setOpemMsg] = useState<boolean>(false)
  const [variant, setVariant] = useState<string>("")
  const [msgs, setMsgs] = useState<Array<string>>([])

  const handleGetPlayers = async (page = 1, order_field = 'position', order_by = 'ASC') => {
    try {
      setOrderField(order_field)
      setOrderBy(order_by)
      const body = {
        page,
        order_field: order_field,
        order_by: order_by
      }
      setPage(page)

      const response = await getPlayers(body)
      setPlayers(response.data.players)
      setTotalPage(response.data.total_page)
    } catch (err) {
      // Error
      // console.log(err)
    }
  }

  const handlerSubscriber = async(id: number) => {
    try {
      const response = await postSubscriber(id)
      if(response.status === 201) {
        handleGetPlayers(page, orderField, orderBy)
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
        handleGetPlayers(page, orderField, orderBy)
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

    handleGetPlayers()

  }, [setPlayers])
  return(
    <Container>
      <Row>
        <Col xxl='12'>
          <h1>Players</h1>
          <Alerts 
            variant={variant}
            open={opemMsg}
            msgs={msgs}
          />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th style={{cursor: 'pointer'}} onClick={() => handleGetPlayers(page, 'name', orderField !== 'name' ? 'ASC' : orderBy === 'ASC' ? 'DESC' : 'ASC')}>
                  Name
                  <span style={{float: 'right'}}>
                    { orderField !== 'name' ? <FaArrowsAltV /> : orderBy === 'ASC' ? <FaArrowUp /> : <FaArrowDown /> }
                  </span>
                </th>
                <th style={{cursor: 'pointer'}} onClick={() => handleGetPlayers(page, 'nationality', orderField !== 'nationality' ? 'ASC' : orderBy === 'ASC' ? 'DESC' : 'ASC')}>
                  Nationality

                  <span style={{float: 'right'}}>
                    { orderField !== 'nationality' ? <FaArrowsAltV /> : orderBy === 'ASC' ? <FaArrowUp /> : <FaArrowDown /> }
                  </span>
                </th>
                <th style={{cursor: 'pointer'}} onClick={() => handleGetPlayers(page, 'position', orderField !== 'position' ? 'ASC' : orderBy === 'ASC' ? 'DESC' : 'ASC')}>

                  Position

                  <span style={{float: 'right'}}>
                    { orderField !== 'position' ? <FaArrowsAltV /> : orderBy === 'ASC' ? <FaArrowUp /> : <FaArrowDown /> }
                  </span>
                </th>
                <th>
                  Team
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                players.map((p, i) => (
                  <tr key={i}>
                    <td>{p.name}</td>
                    <td>{p.nationality}</td>
                    <td>{p.position}</td>
                    <td>{p.team}</td>
                    <td>
                      <span className='d-inline-flex p-1'>
                        <Link to={generatePath("/players/:id", { id:p.id  })}>
                          <FaExternalLinkAlt />
                        </Link>
                      </span>
                      {
                        !p.subscriber ? (
                          <span className='d-inline-flex p-1 button-icon'>
                            <FaRegBell onClick={() => handlerSubscriber(p.id)} />
                          </span>
                        ): 
                          <span className='d-inline-flex p-1 button-icon'>
                            <FaBellSlash onClick={() => handlerUnSubscriber(p.id)} />
                          </span>
                      }
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </Col>
        <Col xxl="5">
          <Pagination>
            <Pagination.First disabled={page === 1 ? true : false } onClick={ () => handleGetPlayers(1, orderField, orderBy)} />
            <Pagination.Prev disabled={page === 1 ? true : false } onClick={ () => handleGetPlayers(page - 1)}/>
              <Pagination.Item active>{page}</Pagination.Item>
            <Pagination.Next disabled={page === totalPage ? true : false } onClick={ () => handleGetPlayers(page +1, orderField, orderBy)}/>
            <Pagination.Last disabled={page === totalPage ? true : false } onClick={ () => handleGetPlayers(totalPage, orderField, orderBy)}/>
          </Pagination>
        </Col>
      </Row>
    </Container>
    
  )
}

export default Players