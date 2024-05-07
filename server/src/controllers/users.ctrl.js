import {pool} from "../db.js";

export const getUsers = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM user");
        res.json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Something went wrong"});
    }
}

export const addUser = async (req, res) => {

    const {name, lastname, email, phone, password} = req.body
    
    try {
        await pool.query(`
    
        INSERT INTO user (name, lastname, email, phone, password)
            VALUES
        (?, ?, ?, ?, ?)`, [name, lastname, email, phone, password]);

        res.status(200).json({message: "user added"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Something went wrong"});
    }
}

export const updateUser = async (req, res) => {

    const {id} = req.params;
    const {name, lastname, email, phone, password} = req.body;
    
    try {
        const [result] = await pool.query(`
    
        UPDATE user SET 
            name = IFNULL(?, name), 
            lastname = IFNULL(?, lastname), 
            email = IFNULL(?, email), 
            phone = IFNULL(?, phone), 
            password = IFNULL(?, password) 
        WHERE id_user = ?`, [name, lastname, email, phone, password, id])

        console.log(result);
        
        if(result.affectedRows <= 0){
            return res.status(404).json({message: "user not found"});
        } else {
            res.status(200).json({message: "user updated"});
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Something went wrong"});
    }
}

export const deleteUser = async (req, res) => {
    
    const {id} = req.params;

    try {
    
        const [result] = await pool.query(`
        DELETE FROM user WHERE id_user = ${id}
        `)
        if(result.affectedRows <= 0){
            return res.status(404).json({message: "user not found"})
        } else {
            res.status(200).json({message: "user deleted"});
        }
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Something went wrong"})
    }
}