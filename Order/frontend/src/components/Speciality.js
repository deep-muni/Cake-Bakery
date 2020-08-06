import React, {useEffect, useState} from 'react';
import {withRouter, useHistory} from "react-router-dom";
import axios from "axios";
import Cake from "./Cake";

const Speciality = (props) => {

    console.log(props.location.state.data);

    let history = useHistory();

    const [cake, setCake] = useState();

    useEffect(() => {
        const getCake = async () => {
            const data = await axios.get("http://localhost:5000/cake/getallcake");
            console.log(data);
            setCake(data.data.data);
        };
        getCake();
    }, []);

    return (
        <div className="speciality">
            <div className="speciality__back" onClick={() => history.push('/')}>
                <span>&#8592;</span>
            </div>
            <div className="speciality__container">
                {
                    cake?.map((item, index) => {
                        return (
                            <Cake cake={item} key={index}/>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default withRouter(Speciality);
