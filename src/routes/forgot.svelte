<script>
  let emailAddress = '';

  function resetPassword() {
      // Code to handle password reset
      console.log('Reset password for email:', emailAddress);
      // You can add more logic here to handle password reset process
  }
</script>

<style>
  body {
    font-family: Arial, sans-serif;
    background-color: #f2f2f2;
  }

  .container {
    max-width: 400px;
    margin: auto;
    padding: 50px;
    margin-top: 200px;
  }

  .logo {
    position: absolute;
    top: 15px;
    left: 15px;
    width: 120px;
    height: auto;
  }

  h2 {
    text-align: center;
    color: #1e4f66;
    margin-top: 30px;
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 20px;
    margin-top: 20px;
    color: #7c7c7c;
    text-align: center;
  }

  label {
    display: block;
    margin-bottom: 10px;
  }

  input[type="email"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 30px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  input[type="submit"] {
    font-size: 20px;
    width: 100%;
    background-color: #7f9dab;
    color: white;
    padding: 10px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  input[type="submit"]:hover {
    background-color: #0056b3;
  }
</style>

<img src="logo.png" alt="Logo" class="logo">
<div class="container">
  <h2>Forgot Password</h2>
  <p>Please enter your email address below and we’ll help you reset your password.</p>
  <form action="#">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" placeholder="Enter your email" required>
    <input type="submit" value="Reset">
  </form>
</div>