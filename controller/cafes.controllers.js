import { handleErrors } from "../dataBase/error.js";
import cafes from "../cafes.js";


const handleErrorResponse = (res, errorCode)=>{
    const {status,message} = handleErrors(errorCode);
    res.status.json({ok:false,error:message})
};

const getRaiz = async(req,res)=>{
    try {
        res.json({ok:true, result:"todo esta ok en la raiz"})
    } catch (error) {
        console.log(error)
        handleErrorResponse(res,error.code);
    }
};

const use404 = async(req,res)=>{
    try {
        res.status(404)
        .send({ message: "La ruta que intenta consultar no existe" })
    } catch (error) {
        console.log(error)
        handleErrorResponse(res,error.code);
    }
};

const getAllCafes =  async (req,res)=>{
    try {
        res.status(200).send(cafes)
    } catch (error) {
        console.log(error)
        handleErrorResponse(res,error.code);
    }
};

const getCafesId = async (req,res)=>{
    const{id}  = req.params
    try {
        const { id } = req.params
    const cafe = cafes.find(c => c.id == id)
    if (cafe) res.status(200).send(cafe)
    else res.status(404).send({ message: "No se encontró ningún cafe con ese id" })
    } catch (error) {
        console.log(error)
        handleErrorResponse(res,error.code)
    }
};

const addCafes = async (req, res) => {
    const cafe = req.body
    const { id } = cafe
    try {
        const existeUncafeConEseId = cafes.some(c => c.id == id)
    if (existeUncafeConEseId) res.status(400).send({ message: "Ya existe un cafe con ese id" })
    else {
        cafes.push(cafe)
        res.status(201).send(cafes)
    }
    }catch (error) {
        console.log(error)
        handleErrorResponse(res,error.code)
    };
};

const updateCafes = async(req,res) =>{
    const cafe = req.body;
    const { id } = req.params;
    try {
        if (id != cafe.id)
        return res
            .status(400)
            .send({
                message: "El id del parámetro no coincide con el id del café recibido",
            });

    const cafeIndexFound = cafes.findIndex((p) => p.id == id);
    if (cafeIndexFound >= 0) {
        cafes[cafeIndexFound] = cafe;
        res.send(cafes);
    } else {
        res
            .status(404)
            .send({ message: "No se encontró ningún café con ese id" });
    }
    } catch (error) {
        console.log(error)
        handleErrorResponse(res,error.code)
    }
};

const deletecafes = async(req,res)=>{
    const jwt = req.header("Authorization")
    try {
        if (jwt) {
            const { id } = req.params
            const cafeIndexFound = cafes.findIndex(c => c.id == id)
        
            if (cafeIndexFound >= 0) {
                cafes.splice(cafeIndexFound, 1)
                console.log(cafeIndexFound, cafes)
                res.send(cafes)
            } else {
                res.status(404).send({ message: "No se encontró ningún cafe con ese id" })
            }
        
        } else res.status(400).send({ message: "No recibió ningún token en las cabeceras" })
    } catch (error) {
        console.log(error)
        handleErrorResponse(res,error.code)
    };
};

export  const cafesController={
    getRaiz,
    getAllCafes,
    getCafesId,
    addCafes,
    updateCafes,
    deletecafes,
    use404


};
