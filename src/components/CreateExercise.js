import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Datepicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
const CreateExercise = () => {
    const [description, setDescription] = useState();
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());
    const [users, setUsers] = useState([])
    const [username, setUsername] = useState((users[0] || ""));
    useEffect(() => {
        async function getUsers() {
            let res = await axios.get('http://localhost:5000/users');
            let Users = res.data.map(r => r.username);
            setUsers([...Users]);
        }
        getUsers();
    }, [])
    const onSubmitExercise = async (e) => {
        e.preventDefault();
        const exercise = {
            username,
            description,
            duration,
            date,
        }
        console.log(exercise);
        let res = await axios.post('http://localhost:8000/exercises/add', exercise);
        console.log(res);
        window.location = '/';
    }
    return (
        <div>
            <h3>Create New Exercise</h3>
            <form onSubmit={onSubmitExercise}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <select
                        required
                        className="form-control"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    >
                        {users.map(user => {
                            return <option
                                key={user}
                                value={user}>{user}
                            </option>
                        })}
                    </select>
                </div>
                <div className="fomr-group">
                    <label htmlFor="descrption">Description:</label>
                    <input type="text"
                        required
                        className="form-control"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="duration">Duration (in minutes):</label>
                    <input type="text"
                        required
                        className="form-control"
                        value={duration}
                        onChange={e => setDuration(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="Date">Date:</label>
                    <div>
                        <Datepicker
                            selected={date}
                            onChange={e => setDate(e)}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary mt-5" />
                </div>
            </form>
        </div>
    )
}

export default CreateExercise
