import { useEffect, useState } from "react";
import { getUsers } from "./api";
const AddMeeting = ({ onsubmit }) => {
    const [users, setUsers] = useState([]);
    const [participant, setParticipant] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [startDate, setStartDate] = useState(null);
    useEffect(() => {
        getUsers().then(response => {
            console.log(response.data);
            setUsers(response.data);
        }).catch(err => {
            console.log(err);
        })
    }, [])
    const handleFormSubmit = (e) => {
        e.preventDefault();
        onsubmit(participant);
    }
    const handleName = (event) => {
        console.log(event.target.value);
        let name = event.target.value.split(' ');
        setFirstName(name[0]);
        setLastName(name[1]);
        console.log(name);
        console.log(firstName, lastName);
    }
    const addParticipant = () => {
        const tmp = { firstName: firstName, lastName: lastName, startDate: startDate };
        console.log(tmp);
        setParticipant([...participant, tmp])
        console.log(participant);
    }
    const handlestartDate = (event) => {
        console.log(event.target.value);
        let date = Math.round(new Date(event.target.value).getTime() / 1000);
        console.log(date);
        // console.log('date',new Date(date * 1000).getMonth()+1)
        setStartDate(date);
    }
    return (
        <div>
            <form className='form' onSubmit={handleFormSubmit} action="">
                <select name="users" id="usersSelect" onChange={handleName}>
                    {
                        users ? users.map((user, indx) => {
                            return <option key={indx} value={`${user.firstName} ${user.lastName}`}>
                                {`${user.firstName} ${user.lastName}`}
                            </option>
                        }) : ''
                    }
                </select>
                <div>
                    <label htmlFor="startDate">start date</label>
                    <input type="date" name="startDate" id="startDate" onChange={handlestartDate} />
                </div>

                <input type="button" value="add Participant" onClick={addParticipant} />
                <input type="submit" value="submit" />
            </form>
        </div>
    );

};

export default AddMeeting;


