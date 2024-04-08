<script>
    import { Router, Route } from 'svelte-routing';
    import Home from './components/Home.svelte';
    import Profile from './components/Profile.svelte';
    import Attendance from './components/Attendance.svelte';
    import Leave from './components/Leave.svelte';
    import Payroll from './components/Payroll.svelte';
</script>

<Router>
    <Route path="/" component={Home} />
    <Route path="/profile" component={Profile} />
    <Route path="/attendance" component={Attendance} />
    <Route path="/leave" component={Leave} />
    <Route path="/payroll" component={Payroll} />
</Router>
