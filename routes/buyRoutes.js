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

module.exports = router;
