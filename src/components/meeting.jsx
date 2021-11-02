import { useEffect, useState } from "react";
import { addMeeting, getMeetings } from "./api";
import AddMeeting from "./addMeeting";
const Meeting = () => {
    const [meetings, setMeetings] = useState([]);
    useEffect(() => {
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
        getDataMeetings();
    }, [])

    const handleAddMeeting=(arr)=>{
        console.log(arr);
    }
    return (
        <div className='container'>
            <div>
                <AddMeeting onsubmit={handleAddMeeting}/>
            </div>
            <div>
            {
                meetings ? meetings.map((meetup,index) => {
                    return <p key={index}>{new Date(meetup.startDate * 1000).getFullYear()}</p>
                })
                    : <div>loading....</div>
            }
            </div>
        </div>
    );

};

export default Meeting;


