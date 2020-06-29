import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const ExerciseList = () => {


    const [exerciseList, setExerciseList] = useState([]);
    useEffect(() => {
        async function getExercises() {
            let res = await axios.get('http://localhost:5000/exercises')
            console.log(res);
            setExerciseList([...res.data]);
        }
        getExercises();
    }, [])

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/exercises/${id}`)
        console.log("Item deleted");
        window.location.reload();
    }

    console.log(exerciseList);
    return (
        <div>
            {exerciseList.map((exercise) => {
                return (
                    <div key={exercise._id} className="card">
                        <div className="card-header row" style={{ margin: "0px" }}>
                            <h3 className="col-6" >{exercise.description}</h3>
                            <button className="col-2 btn-outline-dark rounded mr-5 btn text-white">
                                <Link to={`/edit/${exercise._id}`}><button className="btn editbtn">Edit</button></Link>
                            </button>
                            <button className="col-2 rounded btn-outline-danger" onClick={() => handleDelete(exercise._id)}>Delete</button>
                        </div>
                        <div className="card-body text-dark">
                            <div className="card-title pl-3">Created by user {exercise.username}</div>
                            <div className="card-text pl-3">Duration: {exercise.duration} minutes</div>
                        </div>
                        <div className="card-footer" style={{ paddingLeft: "32px" }}>Created on: {exercise.date}</div>
                    </div>
                )
            })}
        </div>
    )
}


export default ExerciseList
