<!-- Navbar.svelte -->
<script>
    import { Link } from 'svelte-routing';
</script>

<nav>
    <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/attendance">Attendance</Link></li>
        <li><Link to="/leave">Leave</Link></li>
        <li><Link to="/payroll">Payroll</Link></li>
    </ul>
</nav>
