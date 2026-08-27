const ensureAuthentication = require("../Middlewares/Auth.js");

const router = require("express").Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     description: Returns a list of products. This endpoint requires a valid JWT token.
 *     tags:
 *       - Products
 *
 *     security:
 *       - JWTAuth: []
 *
 *     responses:
 *       200:
 *         description: Products fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *             example:
 *               - name: "T.V"
 *                 price: "50000"
 *               - name: "Fridge"
 *                 price: "20000"
 *
 *       403:
 *         description: Unauthorized or invalid/expired JWT token
 *         content:
 *           application/json:
 *             examples:
 *               tokenMissing:
 *                 summary: JWT token is missing
 *                 value:
 *                   message: "Unauthorized,JWT token is require !"
 *                   success: false
 *
 *               tokenInvalid:
 *                 summary: JWT token is invalid or expired
 *                 value:
 *                   message: "Unauthorized,JWT token is wrong or expired !"
 *                   success: false
 */

router.get("/", ensureAuthentication, (req, res) => {
  res.status(200).json([
    {
      name: "T.V",
      price: "50000",
    },
    {
      name: "Fridge",
      price: "20000",
    },
  ]);
});

module.exports = router;
