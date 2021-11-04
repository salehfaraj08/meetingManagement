const Meetup = ({ meet, meetingType, handleDeleteCall,handleEditCall }) => {
    const convertTimeStamp = (time) => {
        let unix_timestamp = time
        let date = new Date(unix_timestamp * 1000);
        return date.getDay() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }
    return <>
        <div className='card'>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <p className='num'>meeting number: <span>{meet.id}</span></p>
                {meet.participants ? <p>participants:</p> : ''}
                {meet.participants && meet.participants.length > 0 ? meet.participants.map(participant => {
                    return <p>{participant.firstName} {participant.lastName}</p>
                })
                    : <p>there is no paricipants yet</p>}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '4rem' }}>
                <p style={{ fontSize: '15px' }}>meeting date: <span style={{ fontSize: '15px', color: '#707070' }}>{convertTimeStamp(meet.startDate)}</span> </p>
                <p>start hour: {meet.startHour}</p>
                <p>end hour: {meet.endHour}</p>
                {meetingType === 'closed' || meetingType === 'future' ?
                    <input className='deleteBtn' type='button' value='delete' onClick={() => handleDeleteCall(meet.id)}></input>
                    : ''
                }
                
            </div>
        </div>
    </>
}

export default Meetup;