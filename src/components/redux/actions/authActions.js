export const login = () => {
    return {
        type: "LOGIN"
    }
}

export const logout = () => {
    return {
        type: "LOGOUT"
    }
}

export const unauthorized = () => {
    return {
        type: "UNAUTHORIZED"
    }
}

export const setUser = (user) => {
    return {
        type: "SET_USER",
        user: user
    }
}

export const clearUser = () => {
    return setUser("");
}