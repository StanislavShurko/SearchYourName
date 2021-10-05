import axios from "axios";
import React, {useEffect, useState} from "react";
import {NameInput} from "./NameInput";

export function FindName() {

    const [person, setPerson] = useState("")
    const [firstCountry, setFirstCountry] = useState("")
    const [secondCountry, setSecondCountry] = useState("")
    const [thirdCountry, setThirdCountry] = useState("")

    function handlePerson(e: string) {
        setPerson(e)
    }

    async function getLatest() {
        try {
            const res = await axios.get<any>(`https://api.nationalize.io?name=${person}`);
            setFirstCountry("1." + res.data?.country[0].country_id)
            setSecondCountry("2." + res.data?.country[1].country_id)
            setThirdCountry("3." + res.data?.country[2].country_id)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
            void getLatest();
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
                <div className="first">{secondCountry}</div>
                <div className="second">{firstCountry}</div>
                <div className="third">{thirdCountry}</div>
            </div>
        </div>
    )
}
