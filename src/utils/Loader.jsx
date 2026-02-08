function LoadingOverlay({ show }) {
    if (!show) return null;

    return (
        <div className="loader-container">
            <img src="/loader.gif" alt="Carregando..." />
        </div>
    );
}

export default LoadingOverlay;
