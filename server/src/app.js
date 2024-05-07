import express from 'express';
import usersRoutes from './routes/users.routes.js';

import {PORT} from './config.js';

const app = express();

app.use(express.json());

app.use(usersRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: "endpoint not found"
    })
})

app.listen(PORT, () => {
    console.log('Server running on port:', PORT)
})