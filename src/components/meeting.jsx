import { useEffect, useState } from "react";
import { addMeeting, delMeeting, getMeetings } from "./api";
import AddMeeting from "./addMeeting";
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
        setAddClicked(false);
        getDataMeetings();
        const intervalId = setInterval(() => {
            getDataMeetings();
        }, 5000) // in milliseconds
        return () => clearInterval(intervalId)

    }, [])

    const getDataMeetings = async () => {
        try {
            let mettings = await getMeetings();
            setMeetings(mettings.data);
        }
        catch (err) {
            console.log(err);
        }
    }
    const handleAddMeeting = async (e) => {
        e.preventDefault();
        let data = {
            participants: participant,
            startDate: startDate,
            startHour: startHour,
            endHour: EndHour,
        }
        try {
            let mettings = await addMeeting(data);
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
        let name = event.target.value.split(' ');
        setFirstName(name[0]);
        setLastName(name[1]);
    }
    const addParticipant = () => {
        const tmp = { firstName: firstName, lastName: lastName };
        setParticipant([...participant, tmp])
        setAddShow(true);
    }
    const handlestartDate = (event) => {
        let date = Math.round(new Date(event.target.value).getTime() / 1000);
        setStartDate(date);
    }
    const handleStartHour = (event) => {
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
        let meetupTsStart = Date.parse(meetUpDateStart);
        let meetupTsEnd = Date.parse(meetUpDateEnd);
        let now = new Date().getTime();
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

    const handleDelete = async (id) => {
        const deleteRes = await delMeeting(id);
        if (deleteRes.status === 200) {
            const meetingsList = [...meetings];
            let resultOfNonDeleted = meetingsList.filter((meet) => {
                return meet.id !== id
            })
            setMeetings(resultOfNonDeleted)
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
                        <p style={{ textAlign: 'center' }} className='status'>meetings in progress<FontAwesomeIcon icon={faFire} style={{ color: "yellow", marginLeft: '0.6vw' }}></FontAwesomeIcon></p>
                        {
                            meetings ? meetings.map(meetup => {
                                return <div className='meetup-progress'>{checkStatus(meetup) === 0 ? <><Meetup meet={meetup} meetingType='progress' /></> : <></>}</div>
                            })
                                : <div>loading.....</div>
                        }
                    </div>
                    <div>
                        <p style={{ textAlign: 'center' }} className='status'>meetings to be in future</p>

                        {
                            meetings ? meetings.map(meetup => {
                                return <div className='meetup-future'>{checkStatus(meetup) === 1 ? <><Meetup meet={meetup} meetingType='future' /></> : <></>}</div>
                            })
                                : <div>loading.....</div>
                        }
                    </div>
                    <div>
                        <p style={{ textAlign: 'center' }} className='status'>meetings that are closed</p>

                        {
                            meetings ? meetings.map(meetup => {
                                return <div className='meetup-closed'>{checkStatus(meetup) === 2 ? <><Meetup meet={meetup} meetingType='closed' handleDeleteCall={handleDelete} /></> : <></>}</div>
                            })
                                : <div>loading.....</div>
                        }
                    </div>
                </div>
            </div>
            <div style={{ display: !addClicked ? 'none' : 'block' }}>
                <AddMeeting obj={{ startDate: startDate, startHour: startHour, EndHour: EndHour }} show={addShow} onsubmit={handleAddMeeting} handleNameChange={handleName} handleAddParticipant={addParticipant} handlestartDate={handlestartDate} handleStartHour={handleStartHour} handleEndHour={handleEndHour} handleAddClick={handleAddClicked} />
            </div>
        </div>
    );

};
export default Meeting;


