const TheoDoiMuonSachService = require("../services/theoDoiMuonSach.services");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    try {
        const theoDoiMuonSachService = new TheoDoiMuonSachService(MongoDB.client);
        const document = await theoDoiMuonSachService.create(req.body);
        
        return res.status(200).send({ message: "Thêm thông tin mượn sách thành công", createdTheoDoiMuonSach: document });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, "Đã xảy ra lỗi khi thêm thông tin mượn sách"));
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    
    try {
        const theoDoiMuonSachService = new TheoDoiMuonSachService(MongoDB.client);
        const { madocgia } = req.query;
        console.log(madocgia);
        if (madocgia) {
            documents = await theoDoiMuonSachService.find({ MADOCGIA: madocgia });
        } else {
            documents = await theoDoiMuonSachService.find({});
        }
    } catch (error) {
        return next(new ApiError(500, "Đã xảy ra lỗi khi lấy thông tin mượn sách"));
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const theoDoiMuonSachService = new TheoDoiMuonSachService(MongoDB.client);
        const document = await theoDoiMuonSachService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(400, "Không tìm thấy thông tin mượn sách"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, "Đã xảy ra lỗi khi lấy thông tin mượn sách"));
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400,"Dữ liệu cập nhật không được trống"));
    }
    try {
        const theoDoiMuonSachService = new TheoDoiMuonSachService(MongoDB.client);
        const document = await theoDoiMuonSachService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(400, "Không tìm thấy thông tin mượn sách"));
        }
        return res.status(200).send({ message: "Cập nhật thông tin mượn sách thành công", updatedTheoDoiMuonSach: document });

    } catch (error) {
        return next(new ApiError(500, "Đã xảy ra lỗi khi cập nhật thông tin mượn sách"));
    }
};

exports.duyet = async (req, res, next) => {
    try {
        const theoDoiMuonSachService = new TheoDoiMuonSachService(MongoDB.client);
        const document = await theoDoiMuonSachService.duyet(req.params.id);
        if (!document) {
            return next(new ApiError(400, "Không tìm thấy lịch sử mượn"));
        }
        return res.status(200).send({ message: "Duyệt thành công", updatedTheoDoiMuonSach: document });
    } catch (error) {
        return next(new ApiError(500, "Đã xảy ra lỗi khi duyệt thông tin mượn sách"));
    }
};

exports.tra = async (req, res, next) => {
   
    try {
        const contactService = new TheoDoiMuonSachService(MongoDB.client);
        const document = await contactService.tra(req.params.id);
        if(!document){
            return next(new ApiError(400, "Không tìm thấy lịch sử mượn"));
        }
        return res.status(200).send({ message: "Trả thành công", updatedContact: document });

    } catch (error) {
        return next(new ApiError(500, "An error occurred while creating the contact"));
    }
   
};
