import * as services from '../services/user.services.js'

export async function register(req, res, next){
    try {
        const {name, email, password} = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({error: "Campos obrigatórios"})
        }

        const user = await services.registerUser(name, email, password);

       return res.status(201).json({
        message: "Usuário cadastrado com sucesso",
        data: user
       })
    }catch (err) {
        next(err)
    }
}


export async function login(req, res, next) {
    try {
        const {email, password} = req.body

        const userToken = await services.userLogin(email, password)

        return res.status(200).json(userToken)
        
    }catch (err) {
        next(err)
    }
}

