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