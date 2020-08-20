const initialState = {token: '', name: '', gender: ''};

export const saveSessionToLocalStorage = (state: any) => {
  try {
    const serializedSession = JSON.stringify({
      token: state.token,
      name: state.name,
      gender: state.gender
    });
  
    localStorage.setItem('session', serializedSession);
  } catch (error) {
    console.log(error);
  }
}

export const loadSessionFromLocalStorage = () => {
  try {
    const serializedSession = localStorage.getItem('session');

    if (!serializedSession) return initialState;

    return JSON.parse(serializedSession);
  } catch (error) {
    return initialState;
  }
}

export const removeSessionFromLocalStorage = () => {
  localStorage.removeItem('session');
}
