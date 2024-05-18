document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded with JavaScript')
    fetch('/api/attendance/requests')
        .then(response => response.json())
        .then(data => {
            // Process the data here
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
});