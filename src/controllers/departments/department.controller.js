// Services
const FetchDepartmentsService = require('../../services/hemis/departments/fetch-departments.service');
const GetAllDepartmentsService = require('../../services/hemis/departments/get-departments.service');
const GetDepartmentService = require('../../services/hemis/departments/get-department.service');
const UpdateDepartmentsService = require('../../services/hemis/departments/update-department.service');


class DepartmentController {
    constructor() {
        this.getAllDepartmentsService = new GetAllDepartmentsService();
        this.fetchDepartmentsService = new FetchDepartmentsService();
        this.getDepartmentService = new GetDepartmentService();
        this.updateDepartmentsService = new UpdateDepartmentsService();

        // Bind
        this.fetchDepartments = this.fetchDepartments.bind(this);
        this.getAllDepartment = this.getAllDepartment.bind(this);
        this.getDepartment = this.getAllDepartment.bind(this);
        this.updateDepartment = this.updateDepartment.bind(this);
    }

    async fetchDepartments(req, res, next) {
        try {
            await this.fetchDepartmentsService.fetchDepartments(req, res);
            res.status(200).json({
                ok: true,
                message: "Departments were fetched or synced successfully",
            })
        } catch (err) {
            next(err)
        }
    }

    async getAllDepartment(req, res) {
        await this.getAllDepartmentsService.getDepartments(req, res);
    }

    async getDepartment(req, res) {
        await this.getDepartmentService.getDepartment(req, res);
    }

    async updateDepartment(req, res) {
        await this.updateDepartmentsService.updateDepartments(req, res);
    }
}

module.exports = DepartmentController