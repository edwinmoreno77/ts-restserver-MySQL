import { Request, Response } from "express";
import User from "../models/user";


export const getUsers = async (req: Request, res: Response) => { 

    try {
        const user = await User.findAll();
        res.json({
            message: "getUsers",
            user
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Hable con el administrador"
        })
    }
}

export const getUser = async (req: Request, res: Response) => { 

    const { id } = req.params;
    const user = await User.findByPk(id);

    try {
        if (!user) { 
            return res.status(404).json({
                message: `No existe un usuario con el id ${id}`
            });
        }
        res.json({
            ok:true,
            user
        });
        
    } catch (error) {
        console.log(error);
          res.status(500).json({
            ok: false,
            message: "Hable con el administrador"
        })
    }

}

export const postUser = async (req: Request, res: Response) => { 

    const { body } = req;
    try {

        const existEmail = await User.findOne({
            where: {
                email: body.email
            }
        });

        if (existEmail) { 
            return res.status(400).json({
                ok: false,
                message: "Ya existe un usuario con el email " + body.email
            });
        }

        const user = User.build(body);
        await user.save();
        res.json({
            ok:true,
            user
            
        });
        
    } catch (error) {
        console.log(error)
          res.status(500).json({
            ok: false,
            message: "Hable con el administrador"
        })
    }
}

export const putUser = async (req: Request, res: Response) => { 
    const { id } = req.params;
    const { body } = req;

    try {
        const user = await User.findByPk(id);
        if (!user) { 
            return res.status(404).json({
                message: `No existe un usuario con el id ${id}`
            });
        }

        await user.update(body);
        res.json({
            ok:true,
            user
        });
        
    } catch (error) {
         console.log(error)
          res.status(500).json({
            ok: false,
            message: "Hable con el administrador"
        })
    }
  
}

export const deleteUser = async (req: Request, res: Response) => { 
    const { id } = req.params;

    try {

        const user = await User.findByPk(id);
        if (!user) { 
            return res.status(404).json({
                message: `No existe un usuario con el id ${id}`
            });
        }

        await user.update({state: false});
        res.json({
            ok:true,
            user
        });
        
    } catch (error) {
         console.log(error)
        res.status(500).json({
            ok: false,
            message: "Hable con el administrador"
        });
    }
    
}