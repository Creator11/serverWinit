const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const router = new Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const multer = require("multer");

const upload = multer({ dest: 'uploads/avatars' });




router.post(
    '/registration',
    body('email').isEmail(),
    body('nickName').isLength({ min: 3, max: 32 }),
    body('password').isLength({ min: 3, max: 32 }),
    userController.registration
);
 
router.post('/login', userController.login);
router.post('/logout', userController.logout);

router.post('/upload-avatar', authMiddleware, upload.single('image'), userController.uploadAvatar);

router.post('/coins/add', authMiddleware, body('amount').isInt({ min: 1 }), userController.addCoins);
router.post('/coins/remove', authMiddleware, body('amount').isInt({ min: 1 }), userController.removeCoins);
router.post('/stars/add', authMiddleware,body('amount').isInt({ min: 1 }), userController.addStars);
router.post('/level/add', authMiddleware,body('amount').isInt({ min: 1 }), userController.addLevel);
router.post('/streak/add', authMiddleware,body('amount').isInt({ min: 1 }), userController.addStreak);
router.post('/complete-task/add', authMiddleware, body('taskId').isInt({ min: 1 }),userController.addCompleteTask);

router.get('/avatar', authMiddleware, userController.getAvatar);

router.get('/coins', authMiddleware, userController.getCoins);
router.get('/stars', authMiddleware, userController.getStars);
router.get('/level', authMiddleware, userController.getLevel);
router.get('/streak', authMiddleware, userController.getStreak);
router.get('/complete-task', authMiddleware, userController.getCompleteTask);
router.get('/user', authMiddleware, userController.getUser);
router.get('/premium', authMiddleware, userController.getPremium);

router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);

module.exports = router;

/**
 * @swagger
 * /registration:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - nickName
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *               nickName:
 *                 type: string
 *                 description: The user's nickname
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid email or password
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: login  user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - nickName
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *               nickName:
 *                 type: string
 *                 description: The user's nickname
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: User login successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User login successfully
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid email or password
 * 
 */
 
/**
 * @swagger
 * /logout:
 *   post:
 *     summary: login  user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 description: The user's token
 * 
 * 
 */

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: login  user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 description: The user's token
 * 
 * 
 */

/**  
 * 
 * @swagger
 * /upload-avatar:
 *   post:
 *     summary: upload-avatar
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 description: The user's token
 * 
 * 
 */

/**  
 * 
 * 
 * @swagger
 *  /coins/add:
 *   post:
 *     summary: add coins
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - amount
 *             properties:
 *               id:
 *                 type: string
 *               amount:
 *                 type: number
 * 
 * 
 */

/**  
 * 
 * 
 * @swagger
 *  /coins/add:
 *   post:
 *     summary: add coins
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - amount
 *             properties:
 *               id:
 *                 type: string
 *               amount:
 *                 type: number
 * 
 * 
 * 
 * 
 */

/**  
 * 
 * 
 * @swagger
 *  /coins/remove:
 *   post:
 *     summary: remove coins
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - amount
 *             properties:
 *               id:
 *                 type: string
 *               amount:
 *                 type: number
 * 
 * 
 * 
 * 
 */

/**  
 * 
 * 
 * @swagger
 *  /stars/add:
 *   post:
 *     summary: add stars
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - amount
 *             properties:
 *               id:
 *                 type: string
 *               amount:
 *                 type: number
 * 
 * 
 * 
 * 
 */

/**  
 * 
 * 
 * @swagger
 *  /level/add:
 *   post:
 *     summary: add stars
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - amount
 *             properties:
 *               id:
 *                 type: string
 *               amount:
 *                 type: number
 * 
 * 
 * 
 * 
 */

/**  
 * 
 * 
 * @swagger
 *  /streak/add:
 *   post:
 *     summary: add stars
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - amount
 *             properties:
 *               id:
 *                 type: string
 *               amount:
 *                 type: number
 * 
 * 
 * 
 * 
 */

/**  
 * 
 * 
 * 
 * @swagger
 *  /complete-task/add:
 *   post:
 *     summary: add stars
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - amount
 *             properties:
 *               id:
 *                 type: string
 *               amount:
 *                 type: number
 * 
 * 
 * 
 * 
 */

/**  
 * 
 * 
 * @swagger
 *  /coins:
 *   get:
 *     summary: get coins
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id 
 *             properties:
 *               id:
 *                 type: string
 * 
 */

/**  
 * 
 * 
 * @swagger
 *  /stars:
 *   get:
 *     summary: get coins
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id 
 *             properties:
 *               id:
 *                 type: string
 * 
 */

/**  
 * 
 * 
 * @swagger
 *  /level:
 *   get:
 *     summary: get coins
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id 
 *             properties:
 *               id:
 *                 type: string
 * 
 */

/**  
 * 
 * 
 * @swagger
 *  /streak:
 *   get:
 *     summary: get coins
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id 
 *             properties:
 *               id:
 *                 type: string
 * 
 */

/**  
 * 
 * 
 * @swagger
 *  /complete-task:
 *   get:
 *     summary: get coins
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id 
 *             properties:
 *               id:
 *                 type: string
 * 
 */


/**  
 * 
 * 
 * @swagger
 *  /user:
 *   get:
 *     summary: get coins
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id 
 *             properties:
 *               id:
 *                 type: string
 * 
 */

/**  
 * 
 * 
 * @swagger
 *  /premium:
 *   get:
 *     summary: get coins
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id 
 *             properties:
 *               id:
 *                 type: string
 * 
 */


/**  
 * 
 * 
 * @swagger
 *  /activate/:link:
 *   get:
 *     summary: get coins
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id 
 *             properties:
 *               id:
 *                 type: string
 * 
 */


/**  
 * 
 * 
 * @swagger
 *  /refresh:
 *   get:
 *     summary: get coins
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id 
 *             properties:
 *               id:
 *                 type: string
 * 
 */



/**  
 * 
 * 
 * @swagger
 *  /users:
 *   get:
 *     summary: get coins
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id 
 *             properties:
 *               id:
 *                 type: string
 * 
 */





