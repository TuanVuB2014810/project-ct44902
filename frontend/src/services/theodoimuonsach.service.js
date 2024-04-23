import createApiClient from "./api.service";
class ContactService {
    constructor(baseUrl = "/admin/theodoimuonsach") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        try {
            const response = await this.api.get("/");
            // console.log(response.data); // Log dữ liệu trả về từ API
            return response.data;
        } catch (error) {
            console.error("Error while fetching data:", error);
            throw error; // Re-throw lỗi để phía gọi có thể xử lý
        }
    }
    
    async create(data) {
        try {
            const response = await this.api.post("/", data);
            console.log(response.data); // Log dữ liệu trả về từ API
            return response.data;
        } catch (error) {
            console.error("Error while fetching data:", error);
            throw error; // Re-throw lỗi để phía gọi có thể xử lý
        }
       
    }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
    async get(id) {
        try {
            const response= await this.api.get(`/${id}`);
            console.log(response.data);
            // console.log("get id");
            return response.data;

        } catch (error) {
            console.error("Error while fetching data:", error);
            throw error;
        }
       
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    
    async duyet(id) {
        try {
            const response = await this.api.get(`/duyet/${id}`);
            console.log("Du lieu thong tin duyet")

            console.log(response.data);
            // console.log("get id");
            return response.data;

        } catch (error) {
            console.error("Error while fetching data:", error);
            throw error;
        }

    }
    async tra(id) {
        try {
            const response = await this.api.get(`/traSach/${id}`);
            console.log("Du lieu thong tin tra")

            console.log(response.data);
            // console.log("get id");
            return response.data;

        } catch (error) {
            console.error("Error while fetching data:", error);
            throw error;
        }

    }
    async findByPublisher(publisherId) {
        try {
            const response = await this.api.get(`/findByPublisher/${publisherId}`);
            return response.data;
        } catch (error) {
            console.error("Error while fetching data:", error);
            throw error;
        }
    }
    
}
export default new ContactService();