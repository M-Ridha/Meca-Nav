
import React, { useState } from "react";
import {Form } from "react-bootstrap";
import '../design/addPanne.css'
import { addNewSolution } from "../redux/actions/solutionActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faTimes} from '@fortawesome/free-solid-svg-icons'
import Loading from "./Loading";
import "../design/msgSucc.css"
import "../design/msgFld.css"
import { makeStyles } from '@material-ui/core/styles';







const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));


const AddSolution = () => {

    const dispatch = useDispatch()
    const [open] = useState(true)
    const [selectedImage, setSelectedImage] = useState("")
    const [newSolution, setNewSolution] = useState(
        {
            panne: '',
            description: [{
                id: 0,
                cause: '',
                remede: ''
            }]
        }
    )

    const handleImageChange = (e) => {
        if (e.target.files.length) {
            const myImage = e.target.files[0]
            //convert image to form data and read it 
            const reader = new FileReader()
            reader.readAsDataURL(myImage)
            reader.onloadend = () => {
                console.log(typeof reader.result)
                setSelectedImage(reader.result)
                setNewSolution({ ...newSolution, image: reader.result })
            }
        }
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addNewSolution(newSolution))
        setNewSolution ({...newSolution,panne:""})
    }



    const handlePanneAdd = () => {
        setNewSolution({
            ...newSolution, description: [...newSolution.description, {
                cause: '',
                remede: '',
                id: newSolution.description[newSolution.description.length - 1].id + 1
            }]
        })
    }



    const handleChange = (e, id ) => {
        setNewSolution({
            ...newSolution,
            description: newSolution.description.map(elm  =>  elm.id === id ? { ...elm, [e.target.name]: e.target.value }  : elm )
        })
    }

    const user = useSelector(state => state.auth.user)

    const {isLoading,success,failed} = useSelector(state => state.solutions)
    
    const classes = useStyles();

    
    
    return (

        <>
            
            <div className="elmsg">
                {
                    success !== false ? (
                        <div className="msg-succ-sol" id="alert-success">
                            <h3> {success} </h3>    
                        </div>
                    ) : ''
                }
            </div>

            <div>
                {
                    failed !== false ? (
                        <div className="msg-fldSol" id="alert-success">
                            <h4> {failed} </h4>    
                        </div>
                    ) : ''
                }
            </div>


            {user && user.Role === "admin" &&
                
                <div className="center">

                    <input type="checkbox" id="show" />

                    <label htmlFor="show" className="show-btn"> New Card</label>

                    <div className="container">

                        <label htmlFor="show" className="close-btn fas fa-times" title="close">
                            <FontAwesomeIcon icon={faTimes} />
                        </label>

                        <div className="text">
                            ADD Solution
                        </div>

                        <form action="#" onSubmit={handleSubmit}>

                            <div className={classes.root} style={{marginTop:"30px"}} >
                                <input accept="image/*"  className={classes.input} id="icon-button-file" type="file" onChange={handleImageChange}  />
                                <label htmlFor="icon-button-file"  style={{color: "Dodgerblue" , cursor:"pointer" }} >
                                    <i className="fas fa-user-cog fa-5x"   > <FontAwesomeIcon icon={ faCamera} />    </i> 
                                </label>
                            </div> 
                            
                            <img  name="preview" src = {selectedImage || null  }  alt="" />
                            
                            <div className="data">
                                
                                <Form.Control
                                    type="text"
                                    placeholder="Panne... "
                                    value={newSolution.panne}
                                    onChange={(e) => setNewSolution({ ...newSolution, panne: e.target.value })}
                                />
                            
                            </div>
                            
                            {newSolution.description.map((elm,i) =>
                                <div key={i} >
                                    <div className="data" >
                                        <Form.Control
                                            name="cause"
                                            type="text"
                                            placeholder="cause..."
                                            value={newSolution.description.cause}
                                            onChange={(e) => handleChange(e, elm.id)}
                                            
                                        />
                                    </div>

                                    <div className="data"  >
                                        <Form.Control
                                            name="remede"
                                            type="text"
                                            placeholder=" remede..."
                                            value={newSolution.description.remede}
                                            onChange={(e) => handleChange(e, elm.id)}
                                        />
                                    </div>
                                </div>)
                            }

                            <div className="btnn">
                                <div className="innner"></div>
                                <button onClick={handlePanneAdd} type='button' required> + </button>
                            </div>

                            <div className="btn">
                                <div className="inner"></div>
                                {isLoading === true ? (<Loading/>) : (
                                    <button type="submit" open={open} onClick={handleSubmit} >Save new card </button>
                                    )
                                }
                            </div>


                        </form>

                    </div>

                </div>
            }
        </>

    );

};


export default AddSolution;





