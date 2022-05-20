import get from './common/http'
export const getUserData = (email,endpoint) => {
    
    return get(`${endpoint}/${email}`);
};