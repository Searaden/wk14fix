const express = require('express');
const path = require('path'); // Add this line to import the 'path' module

const app = express();
const PORT = process.env.PORT || 3000;

// Update the path for serving static files
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/htmlRoutes')(app);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
