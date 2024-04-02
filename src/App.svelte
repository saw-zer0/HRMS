<script>
    let username = '';
    let password = '';
    let rememberMe = false;

    function handleSubmit(event) {
        event.preventDefault();
        alert(`Username: ${username}\nPassword: ${password}\nRemember Me: ${rememberMe ? 'Yes' : 'No'}`);
    }
</script>

<style>
    

    .container {
        display: flex;
        flex-direction: row;
        width: 100%; 
        border-radius: 10px;
        justify-content: center;
        height:100%;

    }
    .logo-container img {
        width:120px;
        height: 120px;

    }


    .image-container {
    flex: 2;
    background-image: url('/img.png');
    background-size: cover; 
    background-position: center center;
    width: 750px;
    height: 500px;
    
}

    .login-container {
        flex: 1;
        padding: 100px;
        
    }

    h2 {
        text-align: center;
        margin-bottom: 20px;
        color: #1E4F66;
    }

    .input-group {
        margin-bottom: 15px;
    }

    .input-group label {
        display: block;
        font-weight: bold;
        margin-bottom: 5px;
    }

    .input-group input {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .remember-me {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    }

    .remember-me input[type="checkbox"] {
        margin-right: 8px;
    }

    .forgot-password {
        text-align: right;
        margin-top: 10px;
        margin-right: 10px;
        font-size: 14px; 
        
    }

    .forgot-password a {
        color: red;
        text-decoration: none;
    }

    .forgot-password a:hover {
        text-decoration: underline;
    }

    button {
        width: 100%;
        padding: 10px;
        background-color: #7F9DAB;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    button:hover {
        background-color: #0056b3;
    }

</style>
<div class="logo-container">
    <img src='/logo.png' alt="logo">
</div>
<div class="container">
    
    <div class="image-container"></div>
    <div class="login-container">
        <h2>Login</h2>
        <form on:submit={handleSubmit}>
            <div class="input-group">
                <label for="username">Username</label>
                <input type="text" id="username" placeholder="Enter Username" bind:value={username} required>
            </div>
            <div class="input-group">
                <label for="password">Password</label>
                <input type="password" id="password" placeholder="Enter Password" bind:value={password} required>
            </div>
            <div class="remember-me">
                <input type="checkbox" id="rememberMe" bind:checked={rememberMe}>
                <label for="rememberMe">Remember Me</label>
            </div>
            <div class="forgot-password">
                <a href="#">Forgot Password?</a>
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
</div>
