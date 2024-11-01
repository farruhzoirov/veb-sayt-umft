const User = require("../../models/user.model");
const bcrypt = require("bcryptjs");


class AddAdminService {
    async addAdmin(req, res) {
        try {
            let isAdmin = await User.findOne({role: 'admin' });
            if (isAdmin) {
                isAdmin.password = await bcrypt.hash('umft2024', 10);
                let _id = isAdmin._id;
                await User.findByIdAndUpdate(_id, isAdmin, {
                    new: true,
                });
                res.status(200).json({
                    ok: true,
                    message: "Admin updated successfully."
                });
            } else {
                const hashPass = await bcrypt.hash('umft2024', 10)
                let admin =  new User({ login: 'admin2024@gmail.com', password: hashPass, role: 'admin', name: 'Admin' , phone: "+998974072204"})
                await admin.save();
                res.status(201).json({
                    ok: true,
                    message: "Admin created successfully."
                });
            }
        } catch (e) {
            console.log("Add admin", e);
            res.status(500).send({
                ok: false,
                message: "Internal server error" }
            );
        }
    }
}

module.exports = AddAdminService;