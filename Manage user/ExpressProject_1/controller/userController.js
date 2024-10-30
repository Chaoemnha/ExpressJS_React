const User = require('../model/user');

// Hiển thị danh sách người dùng
exports.getUserList = async (req, res) => {
    try {
        const user = new User();
        const users = await user.getAll();
        // res.render('user/list', { users });
        res.json(users)
    } catch (err) {
        console.error(err);
        // res.status(500).send('Đã xảy ra lỗi');
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
};
// Hiển thị trang thêm người dùng
exports.showAddUserForm = (req, res) => {
    res.render('user/add');
};

// Hiển thị trang sửa người dùng
exports.showEditUserForm = (req, res) => {
    res.render('user/edit');
};


// Thêm người dùng mới
exports.addUser = async (req, res) => {
  try {
    const { name, age } = req.body;
    const user = new User();
    await user.new({ name, age });

    res.json({ message: 'User added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Đã xảy ra lỗi' });
  }
};

// Sửa thông tin người dùng
exports.editUser = async (req, res) => {
  try {
    const { _id, name, age } = req.body;
    const user = new User();
    const result = await user.edit(_id, { name, age });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Đã xảy ra lỗi' });
  }
};


// Xóa người dùng
exports.deleteUser = async (req, res) => {
    try {
      const userId = req.params._id;
      const user = new User();
      await user.delete(userId);
  
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
  };
  
