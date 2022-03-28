const path = require("path");
const express = require("express");
const fetch = require("node-fetch");
const PORT = process.env.PORT || 3001;
const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use("/projects", express.static(path.resolve(__dirname, "../projects")))

app.get("/api/steam", (req, res) => {

    // Construct form
    details = {
        itemcount: 1,
        "publishedfileids[0]": req.query.id
    };
    const formBody = Object.keys(details)
        .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(details[key]))
        .join("&");

    // Fetch from steam servers
    fetch("https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody
    })
        .then((response) => response.json())
        .then((data) => {
            // console.log("Recieved data from Steam API on id", req.query.id);
            res.json(data);
        })
        .catch((error) => {
            console.log(error);
            res.send(error);
        });
});

app.get("/api/tml", (req, res) => {
    // Fetch from TML servers
    fetch(`http://javid.ddns.net/tModLoader/tools/modinfo.php?modname=${req.query.id}`)
        .then((response) => response.json())
        .then((data) => {
            // console.log("Recieved data from TML API on id", req.query.id);
            res.json(data);
        })
        .catch((error) => {
            console.log(error);
            res.send(error);
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
