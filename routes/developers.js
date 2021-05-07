const express = require('express');
const router = express.Router();
const { readFile } = require('fs').promises;
const cors = require("cors");
const morgan = require("morgan")

const developers = [
    { id: 1, name: 'Morgan' },
    { id: 2, name: 'Drew' },
    { id: 3, name: 'Keanu' },
    { id: 4, name: 'Zach' }
];

/**
 *  @swagger
 *  components:
 *      schemas:
 *          Developer:
 *              type: object
 *              required:
 *                  - name
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The auto-incremented id of Developer.
 *                  name:
 *                      type: string
 *                      description: The name of Developer.
 *                  example:
 *                      id: 6
 *                      name: Brad
 */

router.get('/', async (request, response) => {
    response.send( await readFile('./home.html', 'utf8'));
});

/**
 * @swagger
 * /developers:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder developers.
 *     description: Retrieve a list of developers from JSONPlaceholder. Can be used to populate a list of fake developers when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of developers.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The developer ID.
 *                         example: 0
 *                       name:
 *                         type: string
 *                         description: The developer's name.
 *                         example: Leanne Graham
 */

router.get('/developers', (request, response) => {
    let names = developers.map(dev => dev.name);
    response.send(names);

});

router.get('/developers/:id', (req, res) => {
    const developer = developers.find(dev => dev.id === parseInt(req.params.id));
    if(!developer) return res.status(404).send('Developer Not Found');
    res.send(developer.name);
});

router.post('/developers', (req, res) => {
    if(!req.body.name) return res.status(400).send('Name is required');
    
    const developer = {
        id: developers.length + 1,
        name: req.body.name
    };
    developers.push(developer);
    res.send(developer);
});

router.put('/developers/:id', (req, res) => {
    const developer = developers.find(dev => dev.id === parseInt(req.params.id));
    if(!developer) return res.status(404).send('Developer Not Found');

    if(!req.body.name) return res.status(400).send('Name is required');

    developer.name = req.body.name;
    res.send(developer);
});

router.delete('/developers/:id', (req, res) => {
    const developer = developers.find(c => c.id === parseInt(req.params.id));
    if(!developer) return res.status(404).send('Developer Not Found');

    const index = developers.indexOf(developer);
    developers.splice(index, 1);

    res.send(developer);
;})

module.exports = router;