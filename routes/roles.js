var express = require('express');
var router = express.Router();
const roleSchema = require('../schemas/role');
let { check_authentication, check_authorization } = require("../utils/check_auth");

/* GET users listing. */
router.get('/', async function (req, res, next) {
    let roles = await roleSchema.find({});
    res.send({
        success: true,
        data: roles
    });
});

router.post('/', check_authentication, check_authorization(['admin']), async function (req, res, next) {
    let body = req.body;
    let newRole = new roleSchema({
        name: body.name
    })
    await newRole.save();
    res.status(200).send({
        success: true,
        data: newRole
    });
});

router.put('/:id', check_authentication, check_authorization(['admin']), async function (req, res, next) {
    try {
        let id = req.params.id;
        let role = await roleSchema.findById(id);
        if (role) {
            let body = req.body;
            if (body.name) {
                role.name = body.name;
            }
            if (body.description) {
                role.description = body.description;
            }
            await role.save()
            res.status(200).send({
                success: true,
                data: role
            });
        } else {
            res.status(404).send({
                success: false,
                message: "ID không tồn tại"
            });
        }
    } catch (error) {
        res.status(404).send({
            success: false,
            message: error.message
        });
    }
});

router.delete('/:id', check_authentication, check_authorization(['admin']), async function (req, res, next) {
    try {
        let id = req.params.id;
        let role = await roleSchema.findByIdAndDelete(id);
        if (role) {
            res.status(200).send({
                success: true,
                data: role
            });
        } else {
            res.status(404).send({
                success: false,
                message: "ID không tồn tại"
            });
        }
    } catch (error) {
        res.status(404).send({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
