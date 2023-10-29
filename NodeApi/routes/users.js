import express from 'express';
const router = express.Router();
import { deleteUser, getAllUsers, getUserId, newUserRegister, putUser } from '../controller/user.js';

router.get('/all', getAllUsers)

router.post('/new', newUserRegister)


//If we have multiple routes we can use this:-
router.route('/usersid/').get(getUserId).put(putUser).delete(deleteUser);
// router.get('/usersid/', getUserId)
// router.put('/usersid/', putUser)
// router.delete('/usersid/',deleteUser)
export default router