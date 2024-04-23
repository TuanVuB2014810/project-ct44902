const NXBService = require("../services/nxb.services");
const SachService = require("../services/sach.services");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    if (!req.body?.TENNXB) {
        return next(new ApiError(400, "Tên không thể để trống"));
    }
    try {
        const nxbService = new NXBService(MongoDB.client);
        const document = await nxbService.create(req.body);
        
        return res.status(200).send({ message: "Nhà xuất bản đã được tạo thành công", createdNXB: document });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, "Đã xảy ra lỗi khi tạo nhà xuất bản"));
    }
};

exports.findAll = async (req, res, next) => {
    let documents =[];
    
    try {
        const nxbService = new NXBService(MongoDB.client);
        const {TENNXB} =req.query;
        if(TENNXB){
            documents = await nxbService.findByName(TENNXB);
        }else{
            documents = await nxbService.find({});
        }
    } catch (error) {
        return next(new ApiError(500, "Đã xảy ra lỗi khi tìm kiếm nhà xuất bản"));
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const nxbService = new NXBService(MongoDB.client);
        const document = await nxbService.findById(req.params.id);
        if(!document){
            return next(new ApiError(400, "Không tìm thấy nhà xuất bản"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, "Đã xảy ra lỗi khi tìm kiếm nhà xuất bản"));
    }
};

exports.update = async (req, res, next) => {
    if(Object.keys(req.body).length === 0){
        return next(new ApiError(400,"Dữ liệu cần cập nhật không thể để trống"));
    }
    try {
        const nxbService = new NXBService(MongoDB.client);
        const document = await nxbService.update(req.params.id,req.body);
        if(!document){
            return next(new ApiError(400, "Không tìm thấy nhà xuất bản"));
        }
        return res.status(200).send({ message: "Nhà xuất bản đã được cập nhật thành công", updatedContact: document });

    } catch (error) {
        return next(new ApiError(500, "Đã xảy ra lỗi khi cập nhật nhà xuất bản"));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const nxbService = new NXBService(MongoDB.client);
        const document = await nxbService.delete(req.params.id);
        if(!document){
            return next(new ApiError(400, "Không tìm thấy nhà xuất bản"));
        }
        return res.send({ message: "Nhà xuất bản đã được xóa thành công" });

    } catch (error) {
        return next(new ApiError(500, `Không thể xóa nhà xuất bản có id=${req.params.id}`));
    }
};

exports.findFavorite = async (_req, res, next) => {
    try {
        const nxbService = new NXBService(MongoDB.client);
        const documents = await nxbService.findFavorite();
        return res.send(documents);

    } catch (error) {
        return next(new ApiError(500, "Đã xảy ra lỗi khi tìm kiếm nhà xuất bản"));

    }
};

exports.deleteAll = async (_req, res, next) => {
    try {
        const nxbService = new NXBService(MongoDB.client);
        const documents = await nxbService.deleteAll();
        return res.send({
            message:`${documents} nhà xuất bản đã được xóa thành công`,
        });

    } catch (error) {
        return next(new ApiError(500, "Đã xảy ra lỗi khi xóa các nhà xuất bản"));

    }
};
