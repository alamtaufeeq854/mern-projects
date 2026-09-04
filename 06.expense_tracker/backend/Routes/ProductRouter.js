const ensureAuthentication = require("../Middlewares/Auth.js");

const router = require("express").Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get products
 *     description: Get products for authenticated user.
 *     tags: [Products]
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Products fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               - name: "T.V"
 *                 price: "50000"
 *
 *               - name: "Fridge"
 *                 price: "20000"
 *
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized"
 *               success: false
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
