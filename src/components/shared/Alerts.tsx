import { Alert } from 'react-bootstrap';

interface AlertsProps {
  open: boolean
  msgs: Array<string>
  variant: string
}

const Alerts = ({ open, msgs, variant }: AlertsProps) => {
  return(
    <Alert variant={variant} className={ open ? '' : ''}>
      {
        msgs.map((m, i) => (
          <p key={i} style={{margin: '0'}}>{m}</p>
        ))
      }
    </Alert>
  )
}

export default Alerts