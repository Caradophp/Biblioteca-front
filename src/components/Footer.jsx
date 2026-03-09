import { useEffect, useState } from "react";

const Footer = () => {

    const [hora, setHora] = useState('');
    const [minutos, setMinutos] = useState('');
    const [segundos, setSegundos] = useState('');
    const [dia, setDia] = useState('');
    const [mes, setMes] = useState('');
    const [ano, setAno] = useState('');

    function setRelogio() {
        const instance = new Date();
        setHora(instance.getHours());
        setMinutos(instance.getMinutes());
        setSegundos(instance.getSeconds());
    }

    useEffect(() => {
        const instance = new Date();
        setDia(instance.getDate());
        setMes(instance.getMonth() + 1);
        setAno(instance.getFullYear());
        setInterval(() => setRelogio(), 1000)
    }, []);

    return (
        <footer className="nav-wrapper blue my-footer">
            <div>
                <p>Sistema de Reservas PágInas</p>
            </div>
            <div>
               <p>Data e Hora:</p> 
               <p>{dia <= 9 ? "0" + dia : dia}/{mes <= 9 ? "0" + mes : mes}/{ano}</p>
               {hora <= 9 ? "0" + hora : hora } : {minutos <= 9 ? "0" + minutos : minutos} : {segundos <= 9 ? "0" + segundos : segundos}
            </div>
        </footer>
    );
}

export default Footer;