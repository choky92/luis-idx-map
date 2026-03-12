const express = require('express');
const app = express();

app.get('*', (req, res) => res.json({ok: true, path: req.path}));

const port = process.env.PORT || 3000;
app.listen(port);
