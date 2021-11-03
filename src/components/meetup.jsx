const Meetup = ({ meet }) => {
    const convertTimeStamp = (time) => {
        let unix_timestamp = time
        let date = new Date(unix_timestamp * 1000);

        return date.getDay() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }
    return <>
        <div className='card'>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <p>meeting number: {meet.id}</p>
                {meet.participants ? <p>participants:</p> : ''}
                {meet.participants ? meet.participants.map(participant => {
                    return <p>{participant.firstName} {participant.lastName}</p>
                })
                    : <p>there is no paricipants yet</p>}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '3rem' }}>
                <p>meeting date: {convertTimeStamp(meet.startDate)}</p>
                <p>start hour: {meet.startHour}</p>
                <p>end hour: {meet.endHour}</p>
            </div>
        </div>
    </>
}

export default Meetup;