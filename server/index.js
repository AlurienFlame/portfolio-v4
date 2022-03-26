const path = require('path');
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api/steam", (req, res) => {
    res.json({ lifetime_subscriptions: "1234" });
});

app.get("/api/tml", (req, res) => {
    res.json({ downloads: "1234" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    console.log("Unhandled GET request passing to React app:", req.url)
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

