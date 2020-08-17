import jwtDecode from 'jwt-decode';
import store from '../store';

function useUserInfo(){
  const getUserId = () => {
    const token = store.getState().token;

    if (!token) return;

    const decoded: {id: number} = jwtDecode(token);
    return decoded.id;
  }

  return { userId: getUserId() };
}

export default useUserInfo;
