import React, { useState, useEffect } from 'react';
import './ProjectForm.css'; // Import the CSS file

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    customerId: '', // Renamed to store customer_id
    startDate: '',
    expectedDate: '',
    budget: '',
    status: ''
  });

  const [customers, setCustomers] = useState([]); // State to hold customer data

  // Fetch customer data from the API
  useEffect(() => {
    fetch('http://localhost:3000/get_allCustomers')
      .then((response) => response.json())
      .then((data) => {
        console.log('Customers fetched:', data);
        if (data.Status) {
          setCustomers(data.Result); // Store the customers if API call is successful
        }
      })
      .catch((error) => {
        console.error('Error fetching customers:', error);
      });
  }, []);

  // Handle change for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);  // Debugging step

    // Send a POST request with the form data
    fetch('http://localhost:3000/projects/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Response from server:', data);  // Debugging step
      // Optionally, reset the form or notify the user of success
      if (data.Status === 'Success') {
        setFormData({
          projectName: '',
          customerId: '',
          startDate: '',
          expectedDate: '',
          budget: '',
          status: '',
        });
      } else {
        console.error('Failed to submit:', data);
      }
    })
    .catch((error) => {
      console.error('Error during submission:', error);
    });
  };

  return (
    <div className="form-container">
      <h2>Project Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="projectName">Project Name:</label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="customerId">Customer Name:</label>
          <select
            id="customerId"  
            name="customerId" 
            value={formData.customerId} 
            onChange={handleChange}
            required
          >
            <option value="">Select Customer</option>
            {customers.map((customer) => (
              <option key={customer.customer_id} value={customer.customer_id}>
                {customer.full_name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="expectedDate">Expected Date:</label>
          <input
            type="date"
            id="expectedDate"
            name="expectedDate"
            value={formData.expectedDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="budget">Budget:</label>
          <input
            type="number"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default ProjectForm;
