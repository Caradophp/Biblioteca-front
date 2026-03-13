import { createContext, useContext, useState } from "react";

const LoaderContext = createContext();

export function LoaderProvider({ children }) {
  const [ativo, setAtivo] = useState(false);

  const show = () => setAtivo(true);
  const hide = () => setAtivo(false);

  return (
    <LoaderContext.Provider value={{ show, hide }}>
      {children}
      {/* O HTML do Loader fica aqui dentro, fixo na tela */}
      {ativo && (
        <div id="loading" style={styles.overlay}>
          <img src="/src/assets/loading.gif" alt="carregando" width="50px" height="50px" />
          <label style={{ color: 'white' }}>Carregando...</label>
        </div>
      )}
    </LoaderContext.Provider>
  );
}

// Hook personalizado para facilitar o uso
export const useLoader = () => useContext(LoaderContext);

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex', flexDirection: 'column',
    justifyContent: 'center', alignItems: 'center',
    zIndex: 9999
  }
};