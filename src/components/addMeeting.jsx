import { useEffect, useState } from "react";
import { getUsers } from "./api";
const AddMeeting = ({ onsubmit, handleNameChange, handleAddParticipant, handlestartDate, handleStartHour, handleEndHour }) => {
    const [users, setUsers] = useState([]);
    console.log();
    useEffect(() => {
        getUsers().then(response => {
            console.log(response.data);
            setUsers(response.data);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    return (
        <div>
            <form className='form' onSubmit={onsubmit} action="">
                <select name="users" id="usersSelect" onChange={(event) => { handleNameChange(event) }} required>
                    {
                        users ? users.map((user, indx) => {
                            return <option key={indx} value={`${user.firstName} ${user.lastName}`}>
                                {`${user.firstName} ${user.lastName}`}
                            </option>
                        }) : ''
                    }
                </select>
                <input type="button" value="add Participant" onClick={handleAddParticipant} />
                <div>
                    <label htmlFor="startDate">start date</label>
                    <input type="date" name="startDate" id="startDate" onChange={handlestartDate} required />
                </div>
                <div>
                    <label htmlFor="startHour">start hour</label>
                    <input type="time" id="startHour" min="09:00" max="18:00" onChange={handleStartHour} required />
                </div>
                <div>
                    <label htmlFor="endHour">end hour</label>
                    <input type="time" id="endHour" min="09:00" max="18:00" onChange={handleEndHour} required />
                </div>
                <input type="submit" value="submit" />
            </form>
        </div>
    );

};

export default AddMeeting;


