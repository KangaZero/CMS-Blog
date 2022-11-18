const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogPostRoutes = require('./blogPostRoutes');
const commentRoutes = require('./commentRoutes');
// const savedPetsTagRoutes = require('./savedPetsTagRoutes');
// const uploadRoutes = require('./uploadRoutes');


router.use('/users', userRoutes);
router.use('/posts', blogPostRoutes);
router.use('/comments', commentRoutes);
// router.use('/savedPetsTags', savedPetsTagRoutes);
// router.use('/uploads', uploadRoutes);

module.exports = router;
