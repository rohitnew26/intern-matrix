 
import { useState } from 'react';
import VerifyCertificateForm from '../../components/forms/VerifyCertificateForm';
import CertificateCard from '../../components/certificates/CertificateCard';

const VerifyCertificate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleVerify = async (serialNumber, dob) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // 🔹 MOCK VERIFICATION (replace with real API later)
      await new Promise((res) => setTimeout(res, 1200));

      if (serialNumber === 'IM-2024-001') {
        setResult({
          success: true,
          data: {
            name: 'John Doe',
            domain: 'Full Stack Development',
            duration: '8 Weeks',
            dateOfIssue: '15/09/2024',
            certificateId: serialNumber,
          },
        });
      } else {
        throw new Error('Invalid certificate details');
      }

      setShowResult(true);
    } catch (err) {
      setError(err.message);
      setShowResult(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setShowResult(false);
    setError(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Certificate Verification
          </h1>
          <p className="text-lg text-gray-600">
            Verify the authenticity of certificates issued by AppDost.
          </p>
        </div>

        {/* FORM */}
        {!showResult && (
          <VerifyCertificateForm
            onVerify={handleVerify}
            loading={loading}
          />
        )}

        {/* ERROR */}
        {error && showResult && (
          <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <h3 className="text-red-800 font-semibold">
              Verification Failed
            </h3>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
        )}

        {/* SUCCESS */}
        {result && showResult && (
          <CertificateCard
            certificate={result.data}
            verified={result.success}
          />
        )}

        {/* RESET */}
        {showResult && (
          <div className="text-center mt-8">
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md"
            >
              Verify Another Certificate
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default VerifyCertificate;
