/* GET home page. */
import express from 'express';

const router = express.Router();
router.get('/', async (req, res) => {
  res.render('index', { name: '<strong>santhanam</strong>' });
});
export default router;
