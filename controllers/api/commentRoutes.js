// const router = require('express').Router();
// const { User, BlogPost, Comment } = require('../../models');
// const withAuth = require('../../utils/auth');


// //Get routes
// router.get('/', async (req, res) => {
//     try {
//       const commentData = await Comment.findAll({
//         include:[ 
//             { model: User, attributes: { exclude: ['password'] } }
//         ]
//       });
      
//       req.session.save(() => {
//         // req.session.current_view_pet_id = commentData.id
//         res.status(200).json(commentData);
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

// router.get('/:id', async (req, res) => {
//     try {
//       const commentDatabyId = await Comment.findByPk(req.params.id,{
//         include:[ 
//             { model: User, attributes: { exclude: ['password'] } }
//         ]
//       });
      
//       req.session.save(() => {
//         req.session.comment_id = commentDatabyId.id;
//         res.status(200).json(commentDatabyId);
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

//   //Post route
// router.post('/', async (req, res) => {
//     try {
//         const newComment = await Comment.create({
//         //Users can only add content for security reasons
//           content: req.body.content,
//         //TODO add req.session.current_blog_post_id
//           blog_id: 1,
//           //TODO test on website
//           user_id: 1
//         //    req.session.user_id,
//         });
//         //added for when user wants to put an image for said petAd
//         req.session.save(() => {
//           req.session.comment_id = newComment.id;
//           res.status(200).json(newComment);
//         });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

// //Update route
// router.put('/:id', async (req, res) => {
//     try {
//         const updateComment = await Comment.update(
//             {
//                 //Users can only edit content for security reasons
//                 content: req.body.content,
//             },
//             {
//             where: {
//                 id: req.params.id,
//                 //TODO replace with session
//                 // req.session.comment_id
//                 // user_id: req.session.user_id

//                 }
//             },
//         );
//         if (!updateComment) {
//             return res.status(404).json({ message: 'No such comment found!' });
//           } else {
//             res.status(200).json(updateComment)
//           }
//     } catch (err) {
//         res.status(500).json(err);
//       }
// });

// //Delete route
// router.delete('/:id', async (req, res) => {
//     try {
//         const deleteComment = await Comment.destroy({
//             where: {
//               id: req.params.id,
//                 // user_id: req.session.user_id
//             },
//           });
      
//           if (!deleteComment) {
//             return res.status(404).json({ message: 'No such comment found!' });
//           } else {
//                 res.status(200).json(deleteComment)
//           }
//     } catch (err) {
//         res.status(500).json(err);
//       }
// });

// module.exports = router;

