<script>
        // import { App.svelte } from 'svelte-routing';
        import App from './App.svelte';


      const name = "Batman";
      const post = "Sales Manager";
      const address = "Naxal, Kathmandu";
      const joined = "Employee Since September, 2020";
</script>


<main>
  <div class="wrapper">
    <div class="sidebar">
        <h2><img src="image/LOGO.png">Logo</h2>
        <ul>
          <li class="home"><Link to="/home">Home</Link></li>
        <li class="profile"><Link to="/">Profile</Link></li>
        <li class="attendance"><Link to="/attendance">Attendance</Link></li>
        <li class="leave"><Link to="/leave">Leave</Link></li>
        <li class="payroll"><Link to="/payroll">Payroll</Link></li>
          </ul>
        <div class="social_media">
        </div>
    </div>
    <div class="main_content">
        <div class="header">
            <div class="notification">
                <i class="fas fa-bell"></i>
            </div>
            <button class="log-out">Logout</button>
        </div>
        <div class="info">
            <div class="profile-heading"><h2>My Profile</h2></div>
            <div class="profile-info"> 
                <div class="profile-img"><h3><img src="image/profile.png" alt="Profile Picture"></h3></div>
                <div class="name-add-emp" style="margin: 10px;">
                    <h3>{name}</h3>
                    <p class="employee-post">{post}</p>
                    <p class="employee-address">{address}</p>
                    <p class="employee-joined">{joined}</p>
                </div>   
            </div>
            <div class="gap"></div>
            <div class="personal-details">
                <div class="left-details">
                    <div class="highlight-personal-details">
                        <span class="span-highlight">Personal Details</span>
                        <i class="fas fa-edit edit-icon"></i>
                    </div>
                    <p><strong>Nationality :</strong> Nepali</p>
                    <p><strong>Gender :</strong> Male</p>
                    <p><strong>Marital Status :</strong> Single</p>
                    <p><strong>DOB :</strong> January 1, 1990</p>
                    <p><strong>Contact :</strong> 123-456-7890</p>
                </div>
                <div class="line"></div> 
                <div class="right-details">
                    <div class="highlight-employee-details">
                        <span class="span-highlight">Employee Details</span>
                    </div>
                    <p><strong>Employee ID :</strong> 123456</p>
                    <p><strong>Joined Date :</strong> September 1, 2020</p>
                    <p><strong>Company Email :</strong> employee@example.com</p>
                </div>
            </div>
        </div>
    </div>
</div>

</main>

<style>
    /* @import url('https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap'); */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
  font-family: 'Josefin Sans', sans-serif;
}

body{
   background-color: #f3f5f9;
}

.wrapper{
  display: flex;
  position: relative;
}

.wrapper .sidebar{
  width: 200px;
  height: 100%;
  background: #7F9DAB;
  padding: 30px 0px;
  position: fixed;
}

.wrapper .sidebar h2{
  color: #fff;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 30px;
}

.wrapper .sidebar ul li{
  padding: 30px;
  font-weight: bold;
  border-bottom: 1px solid #252525;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  border-top: 1px solid rgba(255,255,255,0.05);
}    

.wrapper .sidebar ul li a{
  color: #ffffff;
  display: block;
}

.wrapper .sidebar ul li a .fas{
  width: 25px;
}

.wrapper .sidebar ul li:hover{
  background-color: #586C75;
}
    
.wrapper .sidebar ul li:hover a{
  color: #fff;
}
 
.wrapper .sidebar .social_media{
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
}

.wrapper .sidebar .social_media a{
  display: block;
  width: 40px;
  background: #594f8d;
  height: 40px;
  line-height: 45px;
  text-align: center;
  margin: 0 5px;
  color: #bdb8d7;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.wrapper .main_content{
  width: 100%;
  margin-left: 200px;
}

.wrapper .main_content .header{
  padding: 10px ;
  background: #1E4F66;
  color: #717171;
  border-bottom: 1px solid #e0e4e8;
}

.header {
    background-color: #ffffff; 
    padding: 10px; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
    display: flex;
    justify-content: space-between;
  }
  
  .log-out {
    background-color: #cc2626; 
    color: #ffffff; 
    border: none; 
    padding: 10px 20px;
    font-size: 16px; 
    cursor: pointer; 
    border-radius: 5px; 
    transition: background-color 0.3s, transform 0.3s;     
    margin-left: auto;
  }
  
  .log-out:hover {
    background-color: #e74c3c; 
    transform: translateY(-2px); 
  }
  
.wrapper .main_content .info{
  margin: 20px;
  color: #161616;
  line-height: 25px;
}

.wrapper .main_content .info div{
  margin-bottom: 20px;
}

.profile-info{
    display: flex;
    align-items: center; 
}

.profile-img{
    flex: 0 0 auto;
    margin-right: 20px;
}

.profile-img img {
    width: 250px; /* Adjust width as needed */
    height: auto; /* Adjust height as needed */
    margin-right: 10px; /* Add spacing between image and text */
}

.personal-details {
    display: grid;
    grid-template-columns: auto 1px auto;
    align-items: start;
  }
  
.name-add-emp{
    flex: 1;
    font-size: 17px;
}

  .left-details{
    flex: 1;
    padding: 50px 100px 30px 150px;
    margin-right: 20px;
  }

  .right-details {
    flex: 1;
    padding: 50px 180px 100px 100px;
  }


  .left-details p, .right-details p {
    margin: 10px 0;
  }

  .highlight-employee-details {
    font-size: 18px;
    background-color: #1DB4AB;
    border: 1px solid #ccc;
    font-weight: bold;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px; 
 }

  .span-highlight{
    color: #424242;
  }

  .line {
    height: 100%;
    width: 1px; 
    border-right: 1px solid #000000;
    background-color: #000000;
    content: '';
    display: block; 
    margin: 0 20px; 
  }

  .highlight-personal-details {
    font-size: 18px;
    background-color: #1DB4AB;
    border: 1px solid #ccc;
    font-weight: bold;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
 }
  
  .edit-icon {
    color: #333;
    cursor: pointer;
  }
  
  .edit-icon:hover {
    color: #666;
  }

  .profile-heading{
    font-size: 20px;
    padding-top: 30px;
    padding-left: 57px;
  }

@media (max-height: 500px){
  .social_media{
    display: none !important;
  }
}

.wrapper .sidebar .nav-item active {
    background-color: #586c75; 
    color: #ffffff; 
    font-weight: bold; 
}

.line {
    width: 0.5px;
    height: 80%;
    background-color: #000000;
    margin: 0 20px; 
    margin-top: 40px;
}

.notification {
    display: flex;
    align-items: center;
    margin-right: 10px;
    padding-left: 1140px;
    color: #ffffff;
}


</style>

