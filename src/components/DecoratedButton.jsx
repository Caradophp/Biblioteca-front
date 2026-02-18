export default function DecoratedButton({text, icon, action, description, item}) {
    return (
        <button className="btn-clm-al" onClick={() => action(item)} title={description}><i className="material-icons">{icon}</i>{text}</button>
    );
}