const express = require('express')
const router = express.Router()
const buyController = require('../controllers/buyController');

/**
 * @swagger
 * components:
 *  schemas:
 *   Buying:
 *    type: object
 *    properties:
 *     id:
 *      type: integer
 *      description: Identificador de la compra
 *     buyer_name:
 *      type: string
 *      description: Nombre del cliente
 *     client_id:
 *      type: string
 *      description: Identificador del cliente (RUT)
 *     address:
 *      type: string
 *      description: Dirección del cliente
 *     sku:
 *      type: string
 *      description: Identificador del producto
 *     quantity:
 *      type: integer
 *      description: Unidades compradas 
 *     delivery_date:
 *      type: string
 *      format: date
 *      description: Fecha de entrega
 *     status:
 *      type: integer
 *      description: Estado de la compra
 *    required:
 *     - id
 *     - buyer_name
 *     - client_id
 *     - address
 *     - sku
 *     - quantity
 *     - delivery_date
 *     - status
 *    example:
 *     id: 1
 *     buyer_name: "John Doe"
 *     client_id: "12345678-9"
 *     address: "123 Main St., Springfield, IL"
 *     sku: "123456"
 *     quantity: 2
 *     delivery_date: "2025-04-01"
 *     status: 1
 */

/**
 * @swagger
 * /api/Buys:
 *  post:
 *    summary: Create a new buy
 *    tags: [Buying]
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Buying'
 *    responses:
 *     201:
 *      description: Buy registered successfully
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/Buying'
 *     400:
 *      description: Bad request
 *     500:
 *      description: Server error
 */
router.post('/', buyController.registerBuy);

/**
 * @swagger
 * /api/Buys:
 *  get:
 *    summary: Get all buys
 *    tags: [Buying]
 *    responses:
 *      200:
 *        description: Buys retrieved successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Buying'
 */
router.get('/', buyController.listBuys);

/**
 * @swagger
 * /api/Buys/{id}:
 *  put:
 *    summary: Update a buy by ID
 *    tags: [Buying]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Buy ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Buying'
 *    responses:
 *      200:
 *        description: Buy updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Buying'
 *      404:
 *        description: Buy not found
 */
router.put('/:id', buyController.updateBuy);

/**
 * @swagger
 * /api/Buys/{id}:
 *  delete:
 *    summary: Delete a buy by ID
 *    tags: [Buying]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Buy ID
 *    responses:
 *      200:
 *        description: Buy deleted successfully
 *      404:
 *        description: Buy not found
 */
router.delete('/:id', buyController.deleteBuy);

/**
 * @swagger
 * /api/Buys/listBuysBy:
 *  get:
 *    summary: Get all buys by a specific parameter
 *    tags: [Buying]
 *    parameters:
 *      - in: query
 *        name: client_id
 *        schema:
 *          type: string
 *        description: Client ID
 *      - in: query
 *        name: date
 *        schema:
 *          type: string
 *        description: Delivery date
 *      - in: query
 *        name: quantity
 *        schema:
 *          type: integer
 *        description: Quantity of products
 *      - in: query
 *        name: sku
 *        schema:
 *          type: string
 *        description: SKU of product
 *      - in: query
 *        name: status
 *        schema:
 *          type: integer
 *        description: Buy status
 *    responses:
 *      200:
 *        description: Buys found
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Buying'
 *      404:
 *        description: Buys not found
 */
router.get('/listBuysBy', buyController.listBuysBy);

/**
 * @swagger
 * /api/Buys/{id}:
 *  get:
 *    summary: Get a buy by ID
 *    tags: [Buying]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Buy ID
 *    responses:
 *      200:
 *        description: Buy found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Buying'
 *      404:
 *        description: Buy not found
 */
router.get('/:id', buyController.showBuy);

module.exports = router;
