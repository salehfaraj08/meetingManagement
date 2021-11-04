import { useEffect, useState } from "react";
import { getUsers } from "./api";
const AddMeeting = ({ handleAddClick, obj, show, onsubmit, handleNameChange, handleAddParticipant, handlestartDate, handleStartHour, handleEndHour }) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers().then(response => {
            console.log(response.data);
            setUsers(response.data);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    return (
        <div className='form-out-container'>
            <div className='form-container'>
                <form className='form' onSubmit={onsubmit} >
                    <h2>Add Meeting</h2>
                    <select name="users" id="usersSelect" onChange={(event) => { handleNameChange(event) }} >
                        {
                            users ? users.map((user, indx) => {
                                return <option key={indx} value={`${user.firstName} ${user.lastName}`}>
                                    {`${user.firstName} ${user.lastName}`}
                                </option>
                            }) : ''
                        }
                    </select>
                    <input type="button" value="add Participant" onClick={handleAddParticipant} />
                    {show ? <div style={{ color: 'green', marginBottom: '6px' }}>participant added succesfully</div> : ''}
                    <div>
                        <label htmlFor="startDate">start date</label>
                        <input defaultValue={obj.startDate} type="date" name="startDate" id="startDate" onChange={handlestartDate} required />
                    </div>
                    <div>
                        <label htmlFor="startHour">start hour</label>
                        <input value={obj.startHour} type="time" id="startHour" min="08:00" max="18:00" onChange={handleStartHour} required />
                    </div>
                    <div>
                        <label htmlFor="endHour">end hour</label>
                        <input value={obj.EndHour} type="time" id="endHour" min="11:00" max="20:00" onChange={handleEndHour} required />
                    </div>
                    <input type="submit" value="submit" />
                    <input type="button" value="back to Meetings" onClick={handleAddClick} />
                </form>
            </div>
        </div>
    );

};

export default AddMeeting;


