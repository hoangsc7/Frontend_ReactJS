import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import { emitter } from "../../utils/emitter";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
    };
  }

  async componentDidMount() {
    await this.getAllUserFromReact();
  }

  getAllUserFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };

  handleDeleteUser = async (user) => {
    let isConfirmed = window.confirm(
      "Bạn có chắc chắn muốn xóa người dùng này không?"
    );
    if (isConfirmed) {
      console.log("click delete:", user);
      try {
        let res = await deleteUserService(user.id);
        if (res && res.errCode === 0) {
          await this.getAllUserFromReact();
          alert("Xóa người dùng thành công!");
        } else {
          alert(res.errMessage);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("User deletion cancelled");
    }
  };
  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };
  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUserFromReact();
        this.setState({
          isOpenModalUser: false,
        });
        emitter.emit("event_clear_modal_data", { id: "your id" });
      }
      // console.log("response create user: ", response);
    } catch (e) {
      console.log(e);
    }
    // console.log("check data:", data);
  };
  /**Life cycle
   *  Run component:
   * 1. Run construct ->init state :khởi tạo đối tượng
   * 2. Did mount (set state) :gán giá trị
   * 3. Render :render giá trị
   */
  render() {
    // console.log("checkrender:", this.state);
    let arrUsers = this.state.arrUsers;
    return (
      <div className="user-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
          createNewUser={this.createNewUser}
        ></ModalUser>
        <div className="title text-center">Manage users</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus mx-1"></i>Add new user
          </button>
        </div>
        <div className="user-table mt-4 mx-3">
          <table id="customers">
            <thead>
              <tr>
                <th>Email</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button className="btn-edit">
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => {
                            this.handleDeleteUser(item);
                          }}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
