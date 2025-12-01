// VerifyCertificate page
import { useState } from 'react';
import VerifyCertificateForm from '../../components/forms/VerifyCertificateForm';
import CertificateCard from '../../components/certificates/CertificateCard';
import { useVerifyCertificate } from '../../hooks/useGoogleSheet';

const VerifyCertificate = () => {
  const { verify, loading, error, result, reset } = useVerifyCertificate();
  const [showResult, setShowResult] = useState(false);

  const handleVerify = async (serialNumber, dob) => {
    const response = await verify(serialNumber, dob);
    setShowResult(true);
  };

  const handleReset = () => {
    reset();
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Certificate Verification</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Verify the authenticity of certificates issued by AppDost through the InternMatrix platform.
          </p>
        </div>

        {!showResult && (
          <div className="mb-8">
            <VerifyCertificateForm onVerify={handleVerify} loading={loading} />
          </div>
        )}

        {error && showResult && (
          <div className="mb-8">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <div>
                  <h3 className="text-red-800 font-semibold">Verification Failed</h3>
                  <p className="text-red-700 text-sm mt-1">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {result && showResult && <CertificateCard certificate={result.data} verified={result.success} />}

        {showResult && (
          <div className="text-center mt-8">
            <button
              onClick={handleReset}
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 active:transform active:scale-95 shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Verify Another Certificate
            </button>
          </div>
        )}

        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">How Verification Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Enter Details</h3>
              <p className="text-sm text-gray-600">Input your certificate serial number and date of birth</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Verify</h3>
              <p className="text-sm text-gray-600">Our system checks against AppDost's certificate database</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Get Results</h3>
              <p className="text-sm text-gray-600">Receive instant verification with certificate details</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCertificate;
