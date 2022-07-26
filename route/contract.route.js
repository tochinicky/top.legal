const express = require('express');
const{
    createContract,
    getContract,
    getContractIDs
} = require('../controller/contract.controller');
const morgan = require('morgan');
const contractRoute = express.Router();
contractRoute.use(morgan('combined'));
const auth = require('.././middleware/auth')



/**
 * @swagger
 * components:
 *   schemas:
 *     Contract:
 *       type: object
 *       required:
 *         - userID
 *         - contractName
 *         - templateID
 *       properties:
 *         userID:
 *           type: string
 *           description: user id
 *         contractName:
 *           type: string
 *           description: name of contract
 *         templateID:
 *           type: string
 *           description: template id
 *       example:
 *         userID: 2025a25e-d3c8-4ec9-8d65-c1fdc67c36ca
 *         contractName: The New Turing Omnibus
 *         templateID: templateID1234
 */

//  /**
//   * @swagger
//   * tags:
//   *   name: Contracts
//   *   description: The books managing API
//   */

 /**
 * @swagger
 * /contract/getContractIDs:
 *   get:
 *     summary: Returns the list of all the contracts
 *     security: [{ jwt: []}]
 *     tags: [Contract]
 *     responses:
 *       200:
 *         description: The list of the contracts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contract'
 */
contractRoute.route('/getContractIDs').all(auth).get(getContractIDs);
/**
 * @swagger
 * /contract/getContract:
 *   get:
 *     summary: Get the contract by contractid
 *     security: [{ jwt: []}]
 *     tags: [Contract]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The contract id
 *     responses:
 *       200:
 *         description: The contract description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contract'
 *       404:
 *         description: The contract was not found
 */
contractRoute.route('/getContract').all(auth).get(getContract);
/**
 * @swagger
 * /contract/createContract:
 *   post:
 *     summary: Create a new contract
 *     security: [{ jwt: []}]
 *     tags: [Contract]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contract'
 *     responses:
 *       200:
 *         description: The contract was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contract'
 *       500:
 *         description: Some server error
 */
contractRoute.route('/createContract').all(auth)
.post(createContract);



module.exports = contractRoute;