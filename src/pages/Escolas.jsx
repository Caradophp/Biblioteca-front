import { useState } from "react";
import CrudComponent from "../components/CrudComponent";

export default function Escolas() {

    const [escolas, setEscolas] = useState([])

    async function buscarEscolas() {
        try {

        } catch (error) {
            
        }
    }

    return (
        <div>
            <CrudComponent 
                data={escolas}
            />
        </div>
    );
}