const logout = () => {
    if (typeof window !== "undefined") {
        if (confirm("Are you sure you want to logout?")) {
            // Perform logout actions
            document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.location.href = "/login";
        }
    }
}

