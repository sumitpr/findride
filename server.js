const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(path.resolve(__dirname,"jsMapi/dist")));

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname,"jsMapi/dist/index.html"));
});

app.listen(port);
console.log("server started");