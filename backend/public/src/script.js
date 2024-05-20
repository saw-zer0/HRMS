
const logout = (confirmLogout=false) => {
    if (typeof window !== "undefined") {
        if (confirmLogout) {
            document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.location.href = "/login";
            return;
        }
        if (confirm("Are you sure you want to logout?")) {
            // Perform logout actions
            document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.location.href = "/login";
        }
    }
}

const getuser = () => {
    fetch('/api/user/profile')
        .then(response => response.json())
        .then(data => {
            // Process the user data
            console.log(data);
            document.querySelector(".profile-button span").innerHTML = data.full_name;
            document.querySelector(".profile-heading span").innerHTML = data.full_name;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
getuser();

document.querySelector(".notify-btn").style.display = "none";