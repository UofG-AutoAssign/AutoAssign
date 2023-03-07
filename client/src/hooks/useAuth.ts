import authStore from "../context/authStore";

// Used for role-based authorization with user token and type
const useAuth = () => {
    const { authToken } = authStore;
    const { userType } = authStore;

    return { authToken, userType }
}

export default useAuth;