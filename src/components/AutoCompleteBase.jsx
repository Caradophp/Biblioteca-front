export default function AutoCompleteBase({ id, label, options, onChange }) {
    useEffect(() => {
        const elem = document.getElementById(id);
        const instance = M.Autocomplete.init(elem, {
            data: options.reduce((acc, option) => {
                acc[option.label] = null;
                return acc;
            }, {}),
            onAutocomplete: (selected) => {
                const selectedOption = options.find(option => option.label === selected);
                if (selectedOption) {
                    onChange(selectedOption.value);
                }
            }
        });
        return () => {
            instance.destroy();
        };
    }, [id, options, onChange]);
    
    return (
        <div className="input-field">
            <input type="text" className="autocomplete" id={id} />
            <label htmlFor={id}>{label}</label>
        </div>
    );
}