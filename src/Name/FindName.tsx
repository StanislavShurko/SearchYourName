import axios from "axios";
import React, {useEffect, useState} from "react";
import {NameInput} from "./NameInput";
import { RequestState } from "./RequestState";

export function FindName() {

    const [person, setPerson] = useState("")
    const [country, setCountry] = useState([{country_id: "", probability: 0}])
    const [rs, setRs] = useState<RequestState>(RequestState.none);

    function handlePerson(e: string) {
        setPerson(e)
    }

    async function getLatest() {
        try {
            setRs(RequestState.request)
            const res = await axios.get(`https://api.nationalize.io?name=${person}`);
            setCountry(res?.data.country)
            setRs(RequestState.success)
        } catch (e) {
            setRs(RequestState.failure)
            console.log(e)
        }
    }

    useEffect(() => {
            if (person.length > 2) {
                void getLatest();
            }else{
                setCountry([{country_id: "", probability: 0}])
            }
        }
        , [person]
    )

    const renderCountries = () => {
        if (rs === RequestState.request) {
            return <div className="loading-elem">Loading...</div>
        }else if (person.length <= 2) {
            return <div className="li-elem">Countries will be here...</div>
        }

        const list = country.map(c =>
            <li className="li-elem" key={c.country_id}>{c.country_id}   </li>    
        );
        return <ul className="ul-elem">{list}</ul>
    }


    return (
        <div className="find_name">
            <div className="name_input">
                <NameInput
                    inputValue={handlePerson}
                />
            </div>
            {renderCountries()}
        </div>
    )
}
