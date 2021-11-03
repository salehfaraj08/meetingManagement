import { useEffect, useState } from "react";
import { addMeeting, getMeetings } from "./api";
import AddMeeting from "./addMeeting";
import { Link } from "react-router-dom";
import Meetup from "./meetup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faHandshake } from "@fortawesome/free-solid-svg-icons";
const Meeting = () => {
    const [meetings, setMeetings] = useState([]);
    const [participant, setParticipant] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [startHour, setStartHour] = useState('');
    const [EndHour, setEndHour] = useState('');
    const [addClicked, setAddClicked] = useState(false);
    const [addShow, setAddShow] = useState(false);
    useEffect(() => {
        getDataMeetings();
        const intervalId = setInterval(() => {
            getDataMeetings();
        }, 5000) // in milliseconds
        return () => clearInterval(intervalId)

    }, [])

    const getDataMeetings = async () => {
        try {
            let mettings = await getMeetings();
            console.log('mettings:', mettings);
            setMeetings(mettings.data);
        }
        catch (err) {
            console.log(err);
        }
    }
    const handleAddMeeting = async (e) => {
        e.preventDefault();
        console.log('submit:', participant, startDate, startHour, EndHour);
        let data = {
            participants: participant,
            startDate: startDate,
            startHour: startHour,
            endHour: EndHour,
        }
        try {
            let mettings = await addMeeting(data);
            console.log('add mettings:', mettings.data);
            let newData = mettings.data;
            const mettingsList = [...meetings];
            mettingsList.push(newData)
            setMeetings(mettingsList)
            setParticipant([]);
            setFirstName('');
            setLastName('');
            setStartDate(null);
            setStartHour('');
            setEndHour('');
            setAddClicked(!addClicked);
            setAddShow(false);
        }
        catch (err) {
            console.log(err);
        }

    }

    const handleName = (event) => {
        console.log(event.target.value);
        let name = event.target.value.split(' ');
        setFirstName(name[0]);
        setLastName(name[1]);
        console.log(name);
    }
    const addParticipant = () => {
        const tmp = { firstName: firstName, lastName: lastName };
        console.log(tmp);
        setParticipant([...participant, tmp])
        setAddShow(true);
        console.log('part', participant);
    }
    const handlestartDate = (event) => {
        console.log(event.target.value);
        let date = Math.round(new Date(event.target.value).getTime() / 1000);
        console.log(date);
        setStartDate(date);
    }
    const handleStartHour = (event) => {
        console.log(event.target.value);
        setStartHour(event.target.value);
    }
    const handleEndHour = (event) => {
        console.log(event.target.value);
        setEndHour(event.target.value);
    }
    const handleAddClicked = () => {
        setAddClicked(!addClicked);
    }
    const checkStatus = (meetup) => {
        let meetupyear = new Date(meetup.startDate * 1000).getFullYear(),
            meetupmonth = new Date(meetup.startDate * 1000).getMonth() + 1,
            dateObject = new Date(meetup.startDate * 1000),
            meetupday = parseInt(dateObject.toLocaleString("en-US", { day: "numeric" }));
        let meetupMonthStr = meetupmonth < 10 ? '0' + meetupmonth : '' + meetupmonth;
        let meetupDayStr = meetupday < 10 ? '0' + meetupday : '' + meetupday;
        const meetUpDateStart = `${meetupyear}/${meetupMonthStr}/${meetupDayStr} ${meetup.startHour}`;
        const meetUpDateEnd = `${meetupyear}/${meetupMonthStr}/${meetupDayStr} ${meetup.endHour}`;
        console.log(meetUpDateStart, meetUpDateEnd);
        let meetupTsStart = Date.parse(meetUpDateStart);
        let meetupTsEnd = Date.parse(meetUpDateEnd);
        console.log('yousef', meetupTsStart, meetupTsEnd);
        let now = new Date().getTime();
        console.log(now);

        if (meetupTsEnd > now && meetupTsStart < now) {
            return 0;
        }
        else if (meetupTsStart > now) {
            return 1;
        }
        else if (meetupTsEnd < now) {
            return 2;
        }

    }



    return (
        <div className='container'>
            <hr />
            <div style={{ display: addClicked ? 'none' : 'block' }}>
                <div className='list'>
                    <span className='listmeet'>List Of Meetings</span>
                    <FontAwesomeIcon icon={faHandshake} className='handShake' size='5x'></FontAwesomeIcon>
                    <input className='addMeetbtn' type="button" value="New meeting" onClick={handleAddClicked} />
                </div>

                <div className='cards-cont' style={{ marginTop: '2vh', justifyContent: "center", display: 'flex', gap: '3vw', minHeight: '100vh' }}>
                    <div className='card-cont'>
                        <p style={{ textAlign: 'center' }} className='status'>meetings in progress<FontAwesomeIcon icon={faFire} style={{ color: "orange", marginLeft: '0.5vw' }}></FontAwesomeIcon></p>
                        {
                            meetings ? meetings.map(meetup => {
                                return <div className='meetup-progress'>{checkStatus(meetup) === 0 ? <><Meetup meet={meetup} /></> : <></>}</div>
                            })
                                : <div>loading.....</div>
                        }
                    </div>
                    <div>
                        <p style={{ textAlign: 'center' }} className='status'>meetings to be in future</p>

                        {
                            meetings ? meetings.map(meetup => {
                                return <div className='meetup-future'>{checkStatus(meetup) === 1 ? <><Meetup meet={meetup} /></> : <></>}</div>
                            })
                                : <div>loading.....</div>
                        }
                    </div>
                    <div>
                        <p style={{ textAlign: 'center' }} className='status'>meetings that are closed</p>

                        {
                            meetings ? meetings.map(meetup => {
                                return <div className='meetup-closed'>{checkStatus(meetup) === 2 ? <><Meetup meet={meetup} /></> : <></>}</div>
                            })
                                : <div>loading.....</div>
                        }
                    </div>
                </div>
            </div>
            <div style={{ display: !addClicked ? 'none' : 'block' }}>
                <AddMeeting obj={{ startDate: startDate, startHour: startHour, EndHour: EndHour }} show={addShow} onsubmit={handleAddMeeting} handleNameChange={handleName} handleAddParticipant={addParticipant} handlestartDate={handlestartDate} handleStartHour={handleStartHour} handleEndHour={handleEndHour} />
                <input type="button" value="back to Meetings" style={{ display: !addClicked ? 'none' : 'block' }} onClick={handleAddClicked} />
            </div>
        </div>
    );

};
export default Meeting;


