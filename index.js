const express = require('express');
const {app} = require('./backend/src/app');

app.use(express.static('./frontend/build'));

app.listen(3000, () => console.log('Example app listening at http://localhost:3000'));
