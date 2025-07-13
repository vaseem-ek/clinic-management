import React from 'react';
import { X } from 'lucide-react';

function AppointmentModal({
  editingAppointment,
  showForm,
  setShowForm,
  selectedDate,
  formatDateKey,
  setSelectedDate,
  setFormData,
  formData,
  patients,
  doctors,
  handleSaveAppointment,
  handleDeleteAppointment,
}) {
  return (
    <>
    
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {editingAppointment ? 'Edit Appointment' : 'Add Appointment'}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 bg-amber-50 cursor-pointer rounded shadow-2xl p-2 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>

                
                {/* <input
                  type="date"

                  value={selectedDate ? formatDateKey(selectedDate) : ''}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                /> */}
                <h2 className='pl-2 border rounded-md border-slate-300 py-2'>{selectedDate ? formatDateKey(selectedDate) : ''}</h2>
              </div>

              {/* Patient */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient
                </label>
                <select
                  value={formData.patientId}
                  onChange={(e) =>
                    setFormData({ ...formData, patientId: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a patient</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Doctor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor
                </label>
                <select
                  value={formData.doctorId}
                  onChange={(e) =>
                    setFormData({ ...formData, doctorId: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>

              {editingAppointment && (
                <button
                  onClick={() =>
                    handleDeleteAppointment(editingAppointment.id, selectedDate)
                  }
                  className="px-4 py-2 border border-red-600 text-red-600 hover:text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              )}

              <button
                onClick={handleSaveAppointment}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingAppointment ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AppointmentModal;
