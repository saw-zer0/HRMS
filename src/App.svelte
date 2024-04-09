
<script>
    import { Router, Link, Route } from "svelte-routing";
    import Login from "./routes/login.svelte";
    import Forgot from "./routes/forgot.svelte";

    let forgotClicked = false;

    function handleForgotClick() {
        forgotClicked = true;
    }
</script>

<!-- <Router>
    <nav>
        <Link to="/">Login</Link>
        {#if !forgotClicked}
            <Link to="/forgot" on:click={handleForgotClick}>Forgot</Link>
        {/if}
    </nav>
    <div>
        <Route path="/forgot" component={Forgot} />
        <Route path="/" component={Login} />
    </div>
</Router> -->
<Router>
    <div>
        <Route path="/forgot" component={Forgot} />
        <Route path="/" component={Login} />
    </div>
</Router>
