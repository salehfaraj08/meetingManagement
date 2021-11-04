import { useState } from "react";

const Contact = () => {
    const [sent, setSent] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [Address, setAddress] = useState('');
    const onsubmit = (e) => {
        e.preventDefault();
        setSent(!sent);
        setFirstName('');
        setLastName('');
        setEmail('');
        setAddress('');
    }
    const handleFirstName = (event) => {
        setFirstName(event.value);
    }
    const handleLastName = (event) => {
        setLastName(event.value);
    }
    const handleEmail = (event) => {
        setEmail(event.value);
    }
    const handleAddress = (event) => {
        setAddress(event.value);
    }
    return (
        <div className='contact' >
            <div className='contact-form-container' style={{ marginTop: '2vh', display: 'flex', justifyContent: 'center' }}>
                <form className='form contact-form' onSubmit={onsubmit} >
                    <h2>Contact us</h2>
                    <div>
                        <label htmlFor="firstName">First Name</label>
                        <input value={firstName} onChange={handleFirstName} type="text" name="firstName" required />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name</label>
                        <input value={lastName} onChange={handleLastName} type="text" name="lastName" required />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor="Email">Email</label>
                        <input value={email} onChange={handleEmail} type="email" name="Email" required />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor="address">Address</label>
                        <input value={Address} onChange={handleAddress} type="text" name="text" required />
                    </div>
                    <input className="submit" type="submit" value="submit" />
                    {sent ? <p style={{ color: 'green' }}>your details have been sent succesfully we will contact you</p> : ''}
                </form>
            </div>
        </div>);
}

export default Contact;