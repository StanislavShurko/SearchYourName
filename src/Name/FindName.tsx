import axios from "axios";
import React, {useEffect, useState} from "react";
import {NameInput} from "./NameInput";
import { RequestState } from "./RequestState";

export function FindName() {

    const [person, setPerson] = useState("")
    const [country, setCountry] = useState("")
    const [rs, setRs] = useState<RequestState>(RequestState.none);

    function handlePerson(e: string) {
        setPerson(e)
    }

    async function getLatest() {
        try {
            setRs(RequestState.request)
            const res = await axios.get<any>(`https://api.nationalize.io?name=${person}`);
            setCountry(res.data?.country)
            setRs(RequestState.success)
        } catch (e) {
            setRs(RequestState.failure)
            console.log(e)
        }
    }

    useEffect(() => {
            void getLatest();
            console.log(country[0])
        }
        , [person]
    )

    return (
        <div className="find_name">
            <div className="name_input">
                <NameInput
                    inputValue={handlePerson}
                />
            </div>
            <div className="column">
               <div className="first">{}</div>
            </div>
        </div>
    )
}
