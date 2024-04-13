const express = require("express");

const server = express();

server.get("/", (req, res) => {
    // res.send("Hello sneha");
    // res.json("Hello sneha");
    
    const sneha = {
        name: "sneha",

    }

    res.json(sneha)
})

const PORT = 8080;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`))