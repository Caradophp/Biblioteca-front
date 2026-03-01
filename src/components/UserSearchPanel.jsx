import { useRef, useEffect } from "react";
import DecoratedButton from "./DecoratedButton";
import M from "materialize-css";

export default function UserSearchPanel({onSearch}) {

    const inputRef = useRef(null);
    const instanceRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            if (!inputRef.current) return;

            const valores = [
                localStorage.getItem("p1"),
                localStorage.getItem("p2"),
                localStorage.getItem("p3"),
                localStorage.getItem("p4")
            ].filter(Boolean);

            if (valores.length === 0) return;

            const data = {};
            valores.forEach(v => data[v] = null);

            // Destroy anterior (evita bug do React StrictMode)
            if (instanceRef.current) {
                instanceRef.current.destroy();
            }

            instanceRef.current = M.Autocomplete.init(inputRef.current, {
                data,
                limit: 5,
                minLength: 1,
                onAutocomplete: (val) => {
                    console.log("Selecionado:", val);
                }
            });

            return () => {
                if (instanceRef.current) {
                    instanceRef.current.destroy();
                }
            };
        }, 3000)
    }, []);

    return (
        <div className="user-search-panel">
            <div className="search-field">
                <input 
                    type="search" 
                    name="busca" 
                    id="busca" 
                    className="autocomplete" 
                    placeholder="Pesquisar" 
                    ref={inputRef} 
                />
            </div>
            <div>
                <DecoratedButton 
                    text=""
                    icon="search"
                    description="Realiza a pesquisa"
                    action={onSearch}
                />
            </div>
        </div>
    );
}