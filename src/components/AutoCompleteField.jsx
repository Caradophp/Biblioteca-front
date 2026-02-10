import { useEffect, useRef, useState } from "react";
import Toast from "../utils/Toast";

export default function AutoCompleteField({label, url, onSelect, labelField}) {
    const [data, setData] = useState([]);
    const inputRef = useRef(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setData(data);
            } catch (error) { 
                Toast.error("Erro ao carregar dados para autocomplete: " + error.message);
            }
        }

        fetchData();
    }, [url]);

    useEffect(() => {
        if (data.length === 0 || !inputRef.current) return;

        const map = {};
        const idMap = {};

        data.forEach(item => {
            map[item[labelField]] = null; // Materialize exige isso
            idMap[item[labelField]] = item.id;
        });

        M.Autocomplete.init(inputRef.current, {
            data: map,
            onAutocomplete: (value) => {
                const id = idMap[value];
                if (onSelect) onSelect(id);
            },
        });
    }, [data, labelField, onSelect]);

    return (
        <div className="input-field">
            <input type="text" className="autocomplete" ref={inputRef}/>
            <label>{label}</label>
        </div>
    );
}