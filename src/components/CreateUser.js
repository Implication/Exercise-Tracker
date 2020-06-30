import React, { useState } from 'react'
import axios from 'axios'
import FlashMessage from 'react-flash-message'

const CreateUser = () => {
    const [username, setUsername] = useState('');
    const [userExists, setUserExists] = useState(false);
    let base_url = window.location.origin;
    const handleUserSubmit = async (e) => {
        e.preventDefault();

        const user = {
            username
        }

        console.log(user);
        try {
            let res = await axios.post(`${base_url}/users/add`, user)
            console.log("User is created");
        } catch (err) {
            console.error(err.message);
            setUserExists(true);
        }

        setUsername('');
    }
    return (
        <div>
            {userExists &&
                <FlashMessage duration={5000}>
                    <div class="alert alert-danger" role="alert">
                        This user already exists
            </div>
                </FlashMessage>
            }
            <form onSubmit={handleUserSubmit}>
                <div className="form-group">
                    <label htmlFor="user">User:</label>
                    <input type="text"
                        required
                        className="form-control"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-primary mt-5" value="Create User"></input>
                </div>
            </form>
        </div>
    )
}

export default CreateUser
