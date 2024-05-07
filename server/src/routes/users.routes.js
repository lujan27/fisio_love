import {Router} from 'express';
import {getUsers, addUser, updateUser, deleteUser} from '../controllers/users.ctrl.js'
const router = Router();

    router

.get('/users', getUsers)
    
.post('/adduser', addUser)
    
.patch('/updateuser/:id', updateUser)
    
.delete('/deleteuser/:id', deleteUser)

export default router;