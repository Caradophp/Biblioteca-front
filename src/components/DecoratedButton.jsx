export default function DecoratedButton({text, icon, action, description}) {
    return (
        <button className="btn-clm-al" onClick={action} title={description}><i className="material-icons">{icon}</i>{text}</button>
    );
}