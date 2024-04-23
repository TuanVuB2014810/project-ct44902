const SachService = require("../services/sach.services");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    if (!req.body?.TENSACH) {
        return next(new ApiError(400, "Tên không được để trống"));
    }
    try {
        const sachService = new SachService(MongoDB.client);
        const document = await sachService.create(req.body);
        
        return res.status(200).send({ message: "Thêm sách thành công", createdSach: document });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, "Đã xảy ra lỗi khi tạo sách"));
    }
};

exports.findAll = async (req, res, next) => {
    let documents =[];
    
    try {
        const sachService = new SachService(MongoDB.client);
        const {name} =req.query;
        console.log(name);
        if(name){
            documents = await sachService.findByName(name);
        }else{
            documents = await sachService.find({});
        }
    } catch (error) {
        return next(new ApiError(500, "Đã xảy ra lỗi khi tìm kiếm sách"));
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const sachService = new SachService(MongoDB.client);
        const document = await sachService.findById(req.params.id);
        if(!document){
            return next(new ApiError(400, "Không tìm thấy sách"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, "Đã xảy ra lỗi khi tạo sách"));
    }
};

exports.update = async (req, res, next) => {
    if(Object.keys(req.body).length === 0){
        return next(new ApiError(400,"Dữ liệu cập nhật không được trống"));
    }
    try {
        const sachService = new SachService(MongoDB.client);
        const document = await sachService.update(req.params.id,req.body);
        if(!document){
            return next(new ApiError(400, "Sách không được tìm thấy"));
        }
        return res.status(200).send({ message: "Cập nhật sách thành công", updatedSach: document });

    } catch (error) {
        return next(new ApiError(500, "Đã xảy ra lỗi khi tạo sách"));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const sachService = new SachService(MongoDB.client);
        const document = await sachService.delete(req.params.id);
        if(!document){
            return next(new ApiError(400, "Sách không được tìm thấy"));
        }
        return res.send({ message: "Xóa Sách thành công" });

    } catch (error) {
        return next(new ApiError(500, `Không thể xóa sách với id=${req.params.id}`));
    }
};

exports.findAllFavorite = async (_req, res, next) => {
    try {
        const sachService = new SachService(MongoDB.client);
        const documents = await sachService.findFavorite();
        return res.send(documents);

    } catch (error) {
        return next(new ApiError(500, "Đã xảy ra lỗi khi tạo sách"));
    }
};

exports.deleteAll = async (_req, res, next) => {
    try {
        const sachService = new SachService(MongoDB.client);
        const documents = await sachService.deleteAll();
        return res.send({
            message:`${documents} sách đã được xóa thành công`,
        });

    } catch (error) {
        return next(new ApiError(500, "Đã xảy ra lỗi khi tạo sách"));
    }
};
