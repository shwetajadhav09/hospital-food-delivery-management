import React, { useState, useEffect } from 'react';
import { patientService } from '../services/api';

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    contactInfo: '',
    emergencyContact: '',
    roomNumber: '',
    bedNumber: '',
    floorNumber: '',
    diseases: '',
    allergies: '',
    additionalDetails: ''
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch('/api/patients');
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare form data for submission
    const newPatient = {
      name: formData.name,
      age: formData.age,
      gender: formData.gender,
      contactInfo: formData.contactInfo,
      emergencyContact: formData.emergencyContact,
      roomNumber: formData.roomNumber,
      bedNumber: formData.bedNumber,
      floorNumber: formData.floorNumber,
      diseases: formData.diseases,
      allergies: formData.allergies,
      additionalDetails: formData.additionalDetails
    };
  
    try {
      // Send data to the backend to add the new patient
      const response = await fetch('/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPatient),
      });
  
      if (response.ok) {
        // Fetch updated patient list after successfully adding new patient
        fetchPatients();
  
        // Close the form modal
        setShowForm(false);
  
        // Clear form data
        setFormData({
          name: '',
          age: '',
          gender: '',
          contactInfo: '',
          emergencyContact: '',
          roomNumber: '',
          bedNumber: '',
          floorNumber: '',
          diseases: '',
          allergies: '',
          additionalDetails: ''
        });
      } else {
        console.error('Error adding patient');
      }
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/patients/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchPatients();
      }
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4 flex-wrap">
        <h2 className="text-2xl font-semibold w-full sm:w-auto">Patients</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 sm:mt-0"
        >
          Add Patient
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Age</th>
              <th className="px-4 py-2 text-left">Gender</th>
              <th className="px-4 py-2 text-left">Contact</th>
              <th className="px-4 py-2 text-left">Room no</th>
              <th className="px-4 py-2 text-left">Disease</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{patient.name}</td>
                <td className="px-4 py-2">{patient.age}</td>
                <td className="px-4 py-2">{patient.gender}</td>
                <td className="px-4 py-2">{patient.contactInfo}</td>
                <td className="px-4 py-2">{patient.additionalDetails}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(patient._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full sm:w-96">
            <h3 className="text-xl font-semibold mb-4">Add New Patient</h3>
            <form onSubmit={handleSubmit} className='resize-y overflow-y-auto h-96'>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-2 border rounded"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  placeholder="Age"
                  className="w-full p-2 border rounded"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <select
                  className="w-full p-2 border rounded"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Contact Information"
                  className="w-full p-2 border rounded"
                  value={formData.contactInfo}
                  onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Emergency Contact"
                  className="w-full p-2 border rounded"
                  value={formData.emergencyContact}
                  onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  placeholder="Room Number"
                  className="w-full p-2 border rounded"
                  value={formData.roomNumber}
                  onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  placeholder="Bed Number"
                  className="w-full p-2 border rounded"
                  value={formData.bedNumber}
                  onChange={(e) => setFormData({ ...formData, bedNumber: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  placeholder="Floor Number"
                  className="w-full p-2 border rounded"
                  value={formData.floorNumber}
                  onChange={(e) => setFormData({ ...formData, floorNumber: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="Diseases"
                  className="w-full p-2 border rounded"
                  value={formData.diseases}
                  onChange={(e) => setFormData({ ...formData, diseases: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="Allergies"
                  className="w-full p-2 border rounded"
                  value={formData.allergies}
                  onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="Additional Details"
                  className="w-full p-2 border rounded"
                  value={formData.additionalDetails}
                  onChange={(e) => setFormData({ ...formData, additionalDetails: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
