import axios from "axios";
import React, {useEffect, useState} from "react";
import {NameInput} from "./NameInput";

export function FindName() {

    const [person, setPerson] = useState("")
    const [country, setCountry] = useState("")

    function handlePerson(e: string) {
        setPerson(e)
    }

    async function getLatest() {
        try {
            const res = await axios.get<any>(`https://api.nationalize.io?name=${person}`);
            setCountry(res.data?.country)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
            void getLatest();
            console.log(country[0]["country_id"])
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
               <div className="first"></div>
               <div className="second"></div>
               <div className="third"></div>
            </div>
        </div>
    )
}
