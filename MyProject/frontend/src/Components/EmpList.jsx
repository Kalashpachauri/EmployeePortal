import { useEffect, useState } from 'react'
import { DeleteEmpData, GetAllEmployeeList } from '../Services';
//import { FaEye, FaEdit } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import noData from "../Assets/blankdataImg.svg";
import DeleteModal from './DeleteModal';
import EmployeeFormModal from './EmployeeFormModal';
import EmployeeViewModal from './EmployeeViewModal';

export default function EmpList() {

    const [allEmployee, setAllEmployee] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showFormModal, setShowFormModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const [viewOpen, setViewOpen] = useState(false);

    useEffect(async () => {
        try {
            const result1 = await GetAllEmployeeList();
            setAllEmployee(result1.data);
        }
        catch (err) {
            console.log(err);
        }
    }, []);

    const handleDelete = (e, item) => {
        debugger
        //console.log(item.id, index);
        e.preventDefault();
        setSelectedEmployee(item);
        setShowDeleteModal(true);
    }

    const handleConfirmDelete = async () => {
        if (!selectedEmployee) return;

        setLoading(true);

        try {
            debugger
            const response = await DeleteEmpData(selectedEmployee.id);

            if (!response.status === 200) {
                //throw new Error("Failed to delete employee");
                alert("Failed to delete employee. Please try again.");
            }

            // Remove the employee from the list after successful deletion
            setAllEmployee(allEmployee.filter(emp => emp.id !== selectedEmployee.id));
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting employee:", error);
            //alert("Failed to delete employee. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddEmployee = (e) => {
        debugger
        e.preventDefault();
        setShowFormModal(true);
    }

    const handleEdit = (e, item) => {
        e.preventDefault();
        setSelectedEmployee(item);
        setIsEdit(true);
        setViewOpen(true);
    };

    const handleUpdate = (data) => {
        setAllEmployee(prev =>
            prev.map(user => user.id === data.id ? { ...user, ...data } : user)
        );
    }

    // const handleCreate = (data) => {
    //     setAllEmployee(prevUsers => [...prevUsers, { ...data }]);
    // }

    const handleView = (e, item) => {
        e.preventDefault();
        debugger
        setSelectedEmployee(item);
        setIsEdit(false);
        setViewOpen(true);
    };

    return (
        <>
            {/* {loading ?
                <div id={props.load ? "preloader" : "preloader-none"}></div>
                :
                null
            } */}
            <div className="container mt-5">

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-white h3">Employee List</h4>
                    <button
                        className="btn btn-success"
                        onClick={(e) => handleAddEmployee(e)}
                    >
                        <MdAdd className="m-0 p-0 me-1 h5" /> Add Employee
                    </button>
                </div>

                {allEmployee.length > 0 ?
                    <table className="table table-hover table-dark table-bordered rounded">
                        <thead>
                            <tr>
                                <th scope="col">SNo.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Position</th>
                                <th scope="col">View Data</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody className='table-group-divider'>
                            {allEmployee.map((item, index) => {
                                return (
                                    <tr className="" key={index + 1}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{String(item.firstName) + " " + String(item.lastName)}</td>
                                        <td>{item.department}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className='btn btn-primary m-0 p-1 h5'
                                                onClick={(e) => handleView(e, item)}
                                                disabled={loading}
                                            >
                                                More Details
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className='btn btn-warning m-0 p-1 h5'
                                                onClick={(e) => handleEdit(e, item)}
                                                disabled={loading}
                                            >
                                                Update
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className='btn btn-danger m-0 p-1 h5'
                                                disabled={loading}
                                                onClick={(e) => handleDelete(e, item)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                    :
                    <div className="mb-3 mt-3 text-center bg-white p-4 border rounded">
                        <div className="m-auto text-center">
                            <img
                                src={noData}
                                style={{
                                    width: "300px",
                                    margin: "0px auto",
                                }}
                            />
                        </div>

                        <h5>
                            <strong>No Record Found!</strong>
                        </h5>
                    </div>
                }
            </div>

            {selectedEmployee && (
                <DeleteModal
                    show={showDeleteModal}
                    handleClose={() => setShowDeleteModal(false)}
                    handleDelete={handleConfirmDelete}
                    employeeName={String(selectedEmployee.firstName) + " " + String(selectedEmployee.lastName)}
                />
            )}

            <EmployeeFormModal
                open={showFormModal}
                handleClose={() => setShowFormModal(false)}
            //handleSubmission={handleCreate}
            />

            {selectedEmployee && (
                <EmployeeViewModal
                    open={viewOpen}
                    handleClose={() => setViewOpen(false)}
                    employee={selectedEmployee}
                    isEdit={isEdit}
                    handleSubmission={handleUpdate}
                />
            )}


        </>
    )
}