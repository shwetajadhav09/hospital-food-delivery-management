const API_URL = "http://localhost:8000";

export const patientService = {
    getAll: async () => {
        const response = await fetch(`${API_URL}/api/patients`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.json();
    },

    create: async (patientData) => {
        const response = await fetch(`${API_URL}/api/patients`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(patientData)
        });
        return response.json();
    },

    delete: async (id) => {
        const response = await fetch(`${API_URL}/api/patients/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.json();
    }
};