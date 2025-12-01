// CertificateCard component
import { formatDate } from '../../utils/helpers';

const CertificateCard = ({ certificate, verified = true }) => {
  if (!certificate) return null;

  const { name, position, serialNumber, issueDate, status } = certificate;

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 animate-fadeIn">
      {verified ? (
        <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-500 rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-green-600 text-white py-4 px-6">
            <div className="flex items-center justify-center space-x-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <h3 className="text-2xl font-bold">Certificate Verified!</h3>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="text-center border-b border-green-300 pb-4">
              <p className="text-sm font-medium text-green-700 uppercase tracking-wide mb-2">Certificate Holder</p>
              <h4 className="text-3xl font-bold text-gray-800">{name}</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Position/Course</p>
                <p className="text-lg font-semibold text-gray-800">{position}</p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Certificate ID</p>
                <p className="text-lg font-semibold text-gray-800 font-mono">{serialNumber}</p>
              </div>

              {issueDate && (
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Issue Date</p>
                  <p className="text-lg font-semibold text-gray-800">{formatDate(issueDate)}</p>
                </div>
              )}

              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Status</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                  {status || 'Active'}
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mt-6">
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-700 mb-2">Issued by</p>
                <h5 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  AppDost Complete IT Solution
                </h5>
                <p className="text-sm text-gray-600 mt-2">InternMatrix Learning & Internship Platform</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-500 rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-red-600 text-white py-4 px-6">
            <div className="flex items-center justify-center space-x-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <h3 className="text-2xl font-bold">Verification Failed</h3>
            </div>
          </div>
          <div className="p-8 text-center">
            <p className="text-gray-700 text-lg">Certificate not found or invalid details provided.</p>
            <p className="text-gray-600 text-sm mt-4">Please check your certificate serial number and date of birth.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateCard;
