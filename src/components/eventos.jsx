import * as React from "react";
import axios from 'axios';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import PropTypes from 'prop-types';import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

import {eventos, textos} from "./variables";
import "./eventos.css";


export class Eventos extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
     eventos: [],
        };
    }
  componentDidMount() {
      window.scrollTo(0, 0);
	  axios.get('/variables', {
		  params: {
            eventos: 1
	  }})
          .then(response =>{
            console.log(response.data.eventos);
		  this.setState({eventos: response.data.eventos})
          })
          .catch(error=> {
            console.log(error);
          });
		  console.log("state", this.state.eventos )
    }
  isMobile = () =>  {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return true
    } else {
      return false
    }
  }
    render(){
        return(
            <section id="eventos">
              <div className="sectionTitle">
                <h1> 
                  {textos.eventos}
                </h1>
              </div>
              {!this.isMobile() && <EventList home={this.props.home} eventos={this.state.eventos}/>}
              {this.isMobile() && <EventLine home={this.props.home} eventos={this.state.eventos}/>}
              
              {this.props.home &&  <Link to="eventos">
                  <div className="sectionButton">Revisa nuestros proximos eventos</div>
              </Link>}
            </section>
        )
    }
}
class EventLine extends React.Component{
  
  render(){
	  let e;
	  console.log(this.props)
	this.props.eventos != null ? e = this.props.eventos : e = eventos
  let sets = []
  var i,j, temporary, qt=3
  for (i = 0,j = e.length; i < j; i += qt) {
      temporary = e.slice(i, i + qt);
      sets.push(temporary);
  }
  this.props.home ? sets = e.slice(0,6) : sets = e
    return(  
      <Timeline position="alternate">
        {sets.map((list, index)=> (
          <TimelineItem key={index}>
            <TimelineOppositeContent color="text.secondary">
              <Typography variant="subtitle2">{list.fecha}</Typography>
              <Typography variant="subtitle2">{list.hora}</Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography>{list.evento}</Typography>
              
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    )
  }
}
class EventList extends React.Component{
    render(){
        let sets = []
		let e;
		this.props.eventos != null ? e = this.props.eventos : e = eventos
        var i,j, temporary, qt=3
        for (i = 0,j = e.length; i < j; i += qt) {
            temporary = e.slice(i, i + qt);
            sets.push(temporary);
        }
        if (this.props.home){ sets = sets.slice(0,2) }
        return(    
            <Stack sx={{ width: '100%' }} spacing={4}>
                {sets.map((list, index)=> (
                  <Stepper key={index} alternativeLabel activeStep={5} connector={<QontoConnector />}>
                      {list.map((label, index) => (
                        <Step key={index}>
                            <StepLabel StepIconComponent={QontoStepIcon}>
                                <h2>{label.evento}</h2>
                
                                <h4>{label.fecha}</h4>
                                <h4>{label.hora}</h4>
                                <h5>{label.direccion.rendered}</h5>
                            </StepLabel>
                        </Step>
                      ))}
                  </Stepper>  
                ))} 
            </Stack>
        )
    }
}
const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
}));
const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));

function QontoStepIcon(props) {
    const { active, completed, className } = props;
  
    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <div className="QontoStepIcon-completedIcon" />
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    );
  }
  
  QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
  };