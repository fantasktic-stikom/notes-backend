const models = require('../models/index')
const validation = require('../utils/validation/index')
const bcrypt = require('bcrypt')

class AuthController{
    constructor(){}

    async register(req, res) {
        try {
            const {
                name,
                email,
                password
            } = req.body
            const request = req.body

            const validate = validation.auth.registerSchema.validate(request, {abortEarly: false})

            if (validate.error) {
                return res.status(422).json({
                    'success': false,
                    'message': 'Validate error',
                    'error': validate.error.details
                })
            }    

            const validateEmail = await models.users.findOne({ where: { email: email } });
            if (validateEmail) {
                return res.status(422).json({
                    'success': false,
                    'message': 'Validate error',
                    'error': [{'message':'Email has already taken'}]
                })
            }
        
            const encryptedPassword = await bcrypt.hash(password, 10)
            const user = await models.users.create({
                name,
                email
            })
            user.password = encryptedPassword
            user.save()
        
            if(user) {
                return res.status(201).json({
                    'success': true,
                    'messages': 'User created successfully'
                });
            }

        } catch (error) {
            res.status(400).json({
                'success': false,
                'message': error.message
            });
        }
    }

    async login(req, res) {

    }

}

module.exports = new AuthController()