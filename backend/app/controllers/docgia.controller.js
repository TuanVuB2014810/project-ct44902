const Docgia = require("../services/docgia.services");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

const passport = require('passport');

exports.login = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { 
          return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không chính xác.' });
      }
      // Đăng nhập thành công, trả về thông tin người dùng
      return res.status(200).json({ message: 'Đăng nhập thành công', user: user });
  })(req, res, next);
};

exports.create = async (req, res, next) => {
    if (!req.body?.TEN) {
        return next(new ApiError(400, "Tên không được để trống"));
    }
    try {
        const docgia = new Docgia(MongoDB.client);
        const document = await docgia.create(req.body);
        
        return res.status(200).send({ message: "Thêm sách thành công", createdContact: document });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, "An error occurred while creating "));
    }
};
exports.findAll = async (req, res, next) => {
    let documents =[];
    
    try {
        const nxbService = new Docgia(MongoDB.client);
        const {TEN} =req.query;
        if(TEN){
            documents = await nxbService.findByName(TEN);
        }else{
            documents = await nxbService.find({});
        }
    } catch (error) {
        return next(new ApiError(500, "Đã xảy ra lỗi khi tìm kiếm đọc giả"));
    }
    return res.send(documents);
};
exports.findOne = async (req, res, next) => {

    try {
        const docgia = new Docgia(MongoDB.client);
        const document = await docgia.findById(req.params.id);
        if(!document){
            return next(new ApiError(400, "Không tìm thấy sách"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, "An error occurred while creating the contact"));
    }
};

exports.update = async (req, res, next) => {
    if(Object.keys(req.body).length === 0){
        return next(new ApiError(400,"Dữ liệu cần cập nhật không thể để trống"));
    }
    try {
        const nxbService = new Docgia(MongoDB.client);
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
        const nxbService = new Docgia(MongoDB.client);
        const document = await nxbService.delete(req.params.id);
        if(!document){
            return next(new ApiError(400, "Không tìm thấy nhà xuất bản"));
        }
        return res.send({ message: "Nhà xuất bản đã được xóa thành công" });

    } catch (error) {
        return next(new ApiError(500, `Không thể xóa nhà xuất bản có id=${req.params.id}`));
    }
};

