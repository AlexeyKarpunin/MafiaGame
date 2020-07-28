const express = require('express');
const {app} = require('./backend/app');

app.use(express.static('./build'));

app.listen(3000, () => console.log('Example app listening at http://localhost:3000'));
