const path = require("path");
const express = require("express");
const fetch = require("node-fetch");
const fs = require("fs");
const PORT = process.env.PORT || 3001;
const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use("/projects", express.static(path.resolve(__dirname, "../projects")));

// Grab download counts from each api
app.get("/api/projects", (req, res) => {
  // Load in projects.json
  let projects = JSON.parse(fs.readFileSync("projects.json", "utf8"));

  // First, deliver all the cached data
  res.status(200).write(JSON.stringify(projects));

  let promises = [];

  // Set each distribution's download count with data from each api
  for (let project of projects) {
    if (!project.distributions) continue;
    for (let distributor in project.distributions) {
      let distribution = project.distributions[distributor];
      // Can't generalize this because each distributor has different API
      switch (distributor) {
        case "tml":
          promises.push(fetchTmlData(distribution).then((_)=>{res.write(JSON.stringify(projects))}));
          break;
        case "steam":
          promises.push(fetchSteamData(distribution).then((_)=>{res.write(JSON.stringify(projects))}));
          break;
        case "curseforge":
          promises.push(fetchCurseforgeData(distribution).then((_)=>{res.write(JSON.stringify(projects))}));
          break;
        case "modrinth":
          promises.push(fetchModrinthData(distribution).then((_)=>{res.write(JSON.stringify(projects))}));
          break;
        default:
          console.warn("Unsupported distribution platform:", distributor);
          break;
      }
    }
  }

  // Once all changes have been made, cache the new data and close the stream
  Promise.all(promises).then((_) => {
    fs.writeFileSync("./projects.json", JSON.stringify(projects));
    res.end();
  });

  // TODO: Some form of timeout checking
  // Each request should probably timeout individually
  // to allow the promises to resolve
});

async function fetchSteamData(distribution) {
  // Construct form
  details = {
    itemcount: 1,
    "publishedfileids[0]": distribution.id
  };
  const formBody = Object.keys(details)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(details[key]))
    .join("&");

  // Send request
  fetch("https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formBody
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.response.publishedfiledetails[0].lifetime_subscriptions) {
        // FIXME: We need to be able to sum together the downloads from multiple distributions
        distribution.downloads = data.response.publishedfiledetails[0].lifetime_subscriptions;
      }
      return;
    })
    .catch((error) => {
      console.warn("Network error connecting to Steam API:", error);
      return;
    });
}

async function fetchCurseforgeData(distribution) {
  await fetch(`https://api.cfwidget.com/minecraft/mods/${distribution.id}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.downloads.total) {
        distribution.downloads = data.downloads.total;
      }
      return;
    })
    .catch((error) => {
      console.warn("Network error connecting to CurseForge API:", error);
      return;
    });
}

async function fetchModrinthData(distribution) {
  await fetch(`https://api.modrinth.com/api/v1/mod/${distribution.id}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.downloads) {
        distribution.downloads = data.downloads;
      }
      return;
    })
    .catch((error) => {
      console.warn("Network error connecting to Modrinth API:", error);
      return;
    });
}

async function fetchTmlData(distribution) {
  fetch(`http://javid.ddns.net/tModLoader/tools/modinfo.php?modname=${distribution.id}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.downloads) {
        distribution.downloads = data.downloads;
      }
      return;
    })
    .catch((error) => {
      console.warn("Network error connecting to TML API:", error);
      return;
    });
}

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
