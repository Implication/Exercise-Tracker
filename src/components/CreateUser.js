import React, { useState } from 'react'
import axios from 'axios'

const CreateUser = () => {
    const [username, setUsername] = useState('');
    const handleUserSubmit = async (e) => {
        e.preventDefault();

        const user = {
            username
        }

        console.log(user);
        let res = await axios.post('http://localhost:8000/users/add', user)
        console.log(res.data);

        setUsername('');
    }
    return (
        <div>
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
