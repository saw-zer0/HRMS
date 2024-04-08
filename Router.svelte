<script>
    import { Router, Route } from 'svelte-routing';
    import Login from './src/App.svelte';
    import Logout from './Profile.svelte';
</script>

<Router>
    <Route path="/app" component={Login} />
    <Route path="/profile" component={Logout} />
</Router>