import get from './common/http'
export const getUserData = (params) => {
    const { endpoint, email } = params;
    return get(`${endpoint}/${email}`);
};