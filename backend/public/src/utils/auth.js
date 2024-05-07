//function that will check if the user is authenticated or not
const isAuthenticated = () => {
        if (typeof window == "undefined") {
            return false;
        }
        
        if (localStorage.getItem("jwt")) {
            return localStorage.getItem("jwt");
        } else {
            return false;
        }
    }

    // function to create header object using isAuthenticated function
    const getHeaders = () => {
        const header = {
            'Content-Type': 'application/json',
        };

        if (isAuthenticated()) {
            header.Authorization = `Bearer ${localStorage.getItem("jwt")}`;
        }

        return header;
    }

    const logout = () => {
        if (typeof window !== "undefined") {
            document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
    }

    module.exports = {
        isAuthenticated,
        getHeaders,
        logout
    }