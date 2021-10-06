import React from "react";

interface NameInputProps {
    inputValue: (e: any) => void
}

export function NameInput({inputValue}: NameInputProps) {
    return (
        <div>
            <input type="text" onChange={ e => inputValue(e.target.value) } />
        </div>
    )
}