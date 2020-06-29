import React, { useState, useEffect } from 'react'
import axios from 'axios'

const EditExercise = (props) => {
    const [description, setDescription] = useState();
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());
    const [users, setUsers] = useState([])
    const [username, setUsername] = useState((users[0] || ""));
    useEffect(() => {
        async function getUser() {
            let base_url = window.location.origin;
            let res = await axios.get(`${base_url}/users`);
            let Users = res.data.map(r => r.username);
            let id = props.match.params.id
            let nextRes = await axios.get(`${base_url}/exercises/${id}`)
            let info = nextRes.data;
            console.log(nextRes);
            setUsers([...Users]);

            setDescription(info.description);
            setDate(info.date);
            setUsername(info.username);
            setDuration(info.duration);
        }
        getUser();
    }, [])
    const onSubmitExercise = async (e) => {
        e.preventDefault();
        const exercise = {
            id: props.match.params.id,
            username,
            description,
            duration,
            date,
        }
        console.log(exercise);
        let res = await axios.post(`http://localhost:8000/exercises/${props.match.params.id}`, exercise);
        console.log(res);
        window.location = '/';
    }
    return (
        <div>
            <h3>Edit Exercise</h3>
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
                    <label htmlFor="descrption">Description</label>
                    <input type="text"
                        required
                        className="form-control"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <div className="fomr-group">
                    <label htmlFor="duration">Duration (in minutes):</label>
                    <input type="text"
                        required
                        className="form-control"
                        value={duration}
                        onChange={e => setDuration(e.target.value)}
                    />
                </div>
                <div className="fomr-group">
                    <label htmlFor="descrption">Description</label>
                    <input type="text"
                        required
                        className="form-control"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Save Exercise" className="btn btn-primary mt-5" />
                </div>
            </form>
        </div>
    )
}

export default EditExercise
