document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/attendance/requests/pendings')
        .then(response => response.json())
        .then(data => {
            // Process the data here
            console.log(data)
            if(data.length > 0) {
            let redDot =
                document.getElementsByClassName(
                    "red-dot"
                )[0]
            redDot.style.display = "inline-block"
            }
        })
    
        .catch(error => {
            console.error('Error:', error);
        });
    fetch('/api/leaves/pending')
        .then(response => response.json())
        .then(data => {
            // Process the data here
            console.log(data)
            if(data.length > 0) {
            let leaveRedDot =
                document.getElementsByClassName(
                    "leave-red-dot"
                )[0]
            leaveRedDot.style.display = "inline-block"
            }
        })
    
        .catch(error => {
            console.error('Error:', error);
        });
});