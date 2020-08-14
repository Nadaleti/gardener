import jwtDecode from 'jwt-decode';

function useUserInfo(){
  const getUserId = () => {
    const token = localStorage.getItem('token');

    if (!token) return;

    const decoded: {id: number} = jwtDecode(token);
    return decoded.id;
  }

  return { userId: getUserId() };
}

export default useUserInfo;
