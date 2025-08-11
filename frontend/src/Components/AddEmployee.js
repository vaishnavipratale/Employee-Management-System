import { useEffect, useState } from 'react';
import { CreateEmployee, UpdateEmployeeById } from '../api';
import { notify } from '../utils';

function AddEmployee({ fetchEmployees, showModal, setShowModal, employeeObj }) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    salary: '',
    profileImage: null,
  });

  useEffect(() => {
    if (employeeObj) {
      setFormState({
        name: employeeObj.name || '',
        email: employeeObj.email || '',
        phone: employeeObj.phone || '',
        department: employeeObj.department || '',
        salary: employeeObj.salary || '',
        profileImage: null,
      });
    } else {
      setFormState({
        name: '',
        email: '',
        phone: '',
        department: '',
        salary: '',
        profileImage: null,
      });
    }
  }, [employeeObj, showModal]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      setFormState((prev) => ({ ...prev, profileImage: files && files[0] ? files[0] : null }));
    } else {
      setFormState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetAndClose = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formState };
      // Exclude null file to avoid overwriting existing on update unless provided
      if (!payload.profileImage) delete payload.profileImage;

      let response;
      if (employeeObj && employeeObj._id) {
        response = await UpdateEmployeeById(payload, employeeObj._id);
      } else {
        response = await CreateEmployee(payload);
      }

      const { success, message } = response || {};
      if (success) {
        notify(message || 'Success', 'success');
        await fetchEmployees();
        resetAndClose();
      } else {
        notify(message || 'Operation failed', 'error');
      }
    } catch (err) {
      notify('Unexpected error occurred', 'error');
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  if (!showModal) return null;

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{employeeObj ? 'Update Employee' : 'Add Employee'}</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={resetAndClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formState.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formState.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    value={formState.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Department</label>
                  <input
                    type="text"
                    name="department"
                    className="form-control"
                    value={formState.department}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Salary</label>
                  <input
                    type="number"
                    name="salary"
                    className="form-control"
                    value={formState.salary}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Profile Image</label>
                  <input
                    type="file"
                    name="profileImage"
                    className="form-control"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={resetAndClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {employeeObj ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;


