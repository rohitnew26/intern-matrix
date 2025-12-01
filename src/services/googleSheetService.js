// Google Sheet Service
import apiClient from './apiClient';
import { VERIFICATION_STATUS } from '../utils/constants';

export const verifyCertificate = async (serialNumber, dob) => {
  try {
    const scriptUrl = import.meta.env.VITE_GOOGLE_SHEETS_API_URL;
    
    if (!scriptUrl) {
      throw new Error('Google Sheets API URL not configured');
    }

    console.log('Sending request to:', scriptUrl);
    console.log('Parameters:', { srno: serialNumber.trim().toUpperCase(), dob: dob });

    const response = await apiClient.get(scriptUrl, {
      params: {
        srno: serialNumber.trim().toUpperCase(),
        dob: dob
      }
    });

    console.log('Response received:', response.data);
    
    const data = response.data;
    
    if (data.verified) {
      return {
        status: VERIFICATION_STATUS.VERIFIED,
        success: true,
        data: {
          name: data.name,
          position: data.position,
          serialNumber: serialNumber,
          issueDate: data.issueDate,
          status: data.status || 'Active'
        },
        message: 'Certificate verified successfully!'
      };
    } else {
      return {
        status: VERIFICATION_STATUS.NOT_FOUND,
        success: false,
        message: data.message || 'Certificate not found or invalid details provided.',
        debug: data.debug
      };
    }
  } catch (error) {
    console.error('Certificate verification error:', error);
    console.error('Error details:', error.response?.data);
    return {
      status: VERIFICATION_STATUS.ERROR,
      success: false,
      message: error.response?.data?.message || error.message || 'An error occurred while verifying the certificate.'
    };
  }
};
