const {Router} = require('express');
const router = Router();
const authMiddleware = require('../middlewares/auth');
const DefaultController = require('../controllers/crud.controller');

const upload = require('../helpers/uploads/upload-models.helper')

const crudController = new DefaultController();

router.get('/:model', crudController.all);
router.get('/:model/:id', crudController.get);

router.post('/:model',  upload.fields([
    { name: 'image', maxCount: 5 },  // Up to 5 images
    { name: 'file', maxCount: 5 },   // Up to 5 other files
]), crudController.add);

router.put('/:model/:modelId', upload.fields([
    { name: 'image', maxCount: 5 },  // Up to 5 images
    { name: 'file', maxCount: 5 },   // Up to 5 other files
]), crudController.put);

router.patch('/:model/:modelId',  crudController.patch);
//router.patch('/:model/modelId',  crudController.update);

router.delete('/:model/:id',  crudController.remove);



module.exports = router;
