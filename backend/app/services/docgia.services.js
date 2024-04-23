const { ObjectId } = require("mongodb");

class ContactService {
    constructor(client) {
        this.DOCGIA = client.db().collection("docgia");
    }

    extractContactData(payload) {
        const DOCGIA = {
            HOLOT: payload.HOLOT,
            TEN: payload.TEN,
            NGAYSINH: payload.NGAYSINH,
            PHAI: payload.PHAI,
            DIACHI: payload.DIACHI,
            DIENTHOAI:payload.DIENTHOAI

        };
        Object.keys(DOCGIA).forEach(
            (key) => DOCGIA[key] === undefined && delete DOCGIA[key]
        );
        return DOCGIA;
    }

   
    async create(payload) {
        const user = this.extractContactData(payload);
        const result = await this.DOCGIA.insertOne(user); 
        return result.insertedId; 
    }
    async find(filter){
        const cursor =await this.DOCGIA.find(filter);
        return await cursor.toArray();
    }

    async findByName(name){
        console.log(name);
        const result= await this.DOCGIA.find({
            TEN: {$regex: new RegExp(name,'i')},
        })
        console.log("Found result:", result.toArray());
        return await result.toArray();
    }
    async authenticate(username, password) {
        try {
            console.log(`user kt:::${username},:::${password}`);
            const user = await this.DOCGIA.findOne({ TEN: username, DIENTHOAI:password });
            if (!user) {
                return null; // Không tìm thấy người dùng
            }
            console.log(user);

            return user; // Đăng nhập thành công, trả về thông tin người dùng
        } catch (error) {
            throw new ApiError(500, "Lỗi trong quá trình xác thực người dùng");
        }
    }
    async findByUsername(username) {
        try {
            console.log(`${username}`);
            const user = await this.DOCGIA.findOne({ TEN: username });
            console.log(user);
            if (!user) {
                return null; // Không tìm thấy người dùng
            }
            return user; // Đăng nhập thành công, trả về thông tin người dùng
        } catch (error) {
            throw new ApiError(500, "Lỗi trong quá trình xác thực người dùng");
        }
    }
    async findById(id){
        return await this.DOCGIA.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        })
    }
    async update(id,payload){
        const filter ={
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update =  this.extractContactData(payload);
        const result = await this.DOCGIA.findOneAndUpdate(
            filter,
            {$set: update},
            {returnDocument:"after"}
        );
        return result;
    }

    async delete(id){
        const result = await this.DOCGIA.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }
   
}

module.exports = ContactService;
