// VerifyCertificateForm component
import { useState } from 'react';
import { isValidDate, isValidSerialNumber } from '../../utils/helpers';

const VerifyCertificateForm = ({ onVerify, loading }) => {
  const [formData, setFormData] = useState({ serialNumber: '', dob: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!isValidSerialNumber(formData.serialNumber)) {
      newErrors.serialNumber = 'Please enter a valid certificate serial number';
    }
    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    } else if (!isValidDate(formData.dob)) {
      newErrors.dob = 'Please enter a valid date';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onVerify(formData.serialNumber, formData.dob);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-8 space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Verify Certificate</h2>
          <p className="text-gray-600">Enter your certificate details to verify authenticity</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="serialNumber" className="block text-sm font-semibold text-gray-700">
            Certificate Serial Number
          </label>
          <input
            type="text"
            id="serialNumber"
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleChange}
            placeholder="e.g., AD2025-001"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.serialNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
            disabled={loading}
          />
          {errors.serialNumber && <p className="text-red-500 text-sm mt-1">{errors.serialNumber}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="dob" className="block text-sm font-semibold text-gray-700">
            Date of Birth (MM/DD/YYYY)
          </label>
          <input
            type="text"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            placeholder="e.g., 11/09/2005"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.dob ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
            disabled={loading}
          />
          {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:transform active:scale-95'}`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Verifying...
            </span>
          ) : 'Verify Certificate'}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Make sure to enter the exact serial number as shown on your certificate
        </p>
      </div>
    </form>
  );
};

export default VerifyCertificateForm;
