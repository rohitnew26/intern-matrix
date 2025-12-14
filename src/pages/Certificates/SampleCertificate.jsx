// import React, { useState, useRef, useEffect } from "react";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// const InternshipCertificate = () => {
//   const certificateRef = useRef(null);
//   const containerRef = useRef(null);

//   const [zoom, setZoom] = useState(0.4);
//   const [imagesLoaded, setImagesLoaded] = useState(false);

// const MIN_ZOOM = 0.1;
// const MAX_ZOOM = 1.8;
// const ZOOM_STEP = 0.04;

//   const certificateData = {
//     name: "Rohit Raj",
//     domain: "Full Stack Development",
//     duration: "5 weeks",
//     dateFrom: "01/06/2024",
//     dateTo: "31/08/2024",
//     score: "96",
//     dateOfIssue: "15/09/2024",
//     certificateId: "IM2025123456",
//   };

//   const assets = {
//     companyLogo:
//       "https://res.cloudinary.com/deegn1hwt/image/upload/v1765623468/vxp0tuwevdwxjhnaaeeu.png",
//     aicteLogo:
//       "https://res.cloudinary.com/deegn1hwt/image/upload/v1765622673/jtjp7o0cnmckpn71anmi.jpg",
//     signature:
//       "https://res.cloudinary.com/deegn1hwt/image/upload/v1765623590/rqldqdqet6lbn4jklgo3.png",
//     isoLogo:
//       "https://res.cloudinary.com/deegn1hwt/image/upload/v1765623656/iayzjf2m9epwnvrr9hhg.jpg",
//     msmeLog:
//       "https://res.cloudinary.com/deegn1hwt/image/upload/v1765622741/nmnbkeyvsoxajc2mu2wx.png",
//     microsoftLogo:
//       "https://res.cloudinary.com/deegn1hwt/image/upload/v1765622628/dnyemxrvvjkepw9du0nh.png",
//     mocaLogo:
//       "https://res.cloudinary.com/deegn1hwt/image/upload/v1765622643/hi3ifdloxp55wxutxwvz.png",
//   };

//   /* ================= PRELOAD IMAGES ================= */
//   useEffect(() => {
//     const images = Object.values(assets).concat(
//       `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://www.internmatrix.com/verify/${certificateData.certificateId}`
//     );

//     let loaded = 0;
//     images.forEach((src) => {
//       const img = new Image();
//       img.crossOrigin = "anonymous";
//       img.src = src;
//       img.onload = img.onerror = () => {
//         loaded++;
//         if (loaded === images.length) setImagesLoaded(true);
//       };
//     });
//   }, []);

//   /* ================= MOBILE AUTO FIT ================= */
//   useEffect(() => {
//     const handleResize = () => {
//       if (!containerRef.current) return;
//       const screenWidth = containerRef.current.offsetWidth;
//       const certWidth = 2000;
//       if (window.innerWidth < 768) {
//         setZoom(screenWidth / certWidth);
//       }
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   /* ================= MOUSE WHEEL ZOOM ================= */
//   const handleWheel = (e) => {
//     e.preventDefault();
//     setZoom((prev) => {
//       const next = e.deltaY < 0 ? prev + ZOOM_STEP : prev - ZOOM_STEP;
//       return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, next));
//     });
//   };

//   /* ================= PDF DOWNLOAD ================= */
//   const downloadPDF = async () => {
//     if (!imagesLoaded) return alert("Images still loading");

//     const clone = certificateRef.current.cloneNode(true);
//     clone.style.position = "fixed";
//     clone.style.left = "-9999px";
//     document.body.appendChild(clone);

//     const canvas = await html2canvas(clone, { scale: 2, useCORS: true });
//     const pdf = new jsPDF("landscape", "px", [canvas.width, canvas.height]);
//     pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0);
//     pdf.save(`${certificateData.name}-Certificate.pdf`);

//     document.body.removeChild(clone);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
//       <p className="text-sm text-gray-600 mb-3">
//         🖱️ Scroll mouse on certificate to zoom
//       </p>

//       <button
//         onClick={downloadPDF}
//         disabled={!imagesLoaded}
//         className={`mb-4 px-6 py-2 rounded font-semibold ${
//           imagesLoaded ? "bg-green-600 text-white" : "bg-gray-400"
//         }`}
//       >
//         {imagesLoaded ? "Download PDF" : "Loading Images..."}
//       </button>

//       {!imagesLoaded ? (
//         <div className="h-96 flex items-center justify-center">
//           <div className="w-24 h-24 border-8 border-blue-600 border-dashed rounded-full animate-spin" />
//         </div>
//       ) : (
//         <div
//           ref={containerRef}
//           className="w-full h-[80vh] overflow-auto flex justify-center"
//         >
//           <div
//             onWheel={handleWheel}
//             style={{
//               transform: `scale(${zoom})`,
//               transformOrigin: "top center",
//               transition: "transform 0.08s ease-out",
//             }}
//           >
//             {/* ================= CERTIFICATE ================= */}
//             <div
//               ref={certificateRef}
//               className="relative bg-white shadow-2xl"
//               style={{
//                 width: "2000px",
//                 height: "1414px",
//                 border: "16px solid #1e3a8a",
//                 borderImage:
//                   "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1e3a8a 100%) 1",
//               }}
//             >
//               {/* ================= WATERMARK ================= */}
//               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                 <img
//                   src={assets.companyLogo}
//                   alt="Intern Matrix Watermark"
//                   className="w-[900px] opacity-[0.06]"
//                 />
//               </div>

//               {/* ================= CORNERS ================= */}
//               <div className="absolute top-0 left-0 w-24 h-24 border-t-8 border-l-8 border-yellow-500" />
//               <div className="absolute top-0 right-0 w-24 h-24 border-t-8 border-r-8 border-yellow-500" />
//               <div className="absolute bottom-0 left-0 w-24 h-24 border-b-8 border-l-8 border-yellow-500" />
//               <div className="absolute bottom-0 right-0 w-24 h-24 border-b-8 border-r-8 border-yellow-500" />

//               {/* ================= CONTENT ================= */}
//               <div className="relative z-10 h-full px-20 py-24 flex flex-col">
//                 {/* ================= HEADER ================= */}
//                 <div className="flex items-center justify-between">
//                   <div className="text-center">
//                     <img src={assets.companyLogo} className="w-44 mx-auto" />
//                     <p className="text-3xl font-bold text-blue-900 mt-3">
//                       Intern Matrix
//                     </p>
//                   </div>

//                   <div className="text-center flex-1">
//                     <h1 className="text-8xl font-extrabold font-serif text-blue-900 tracking-widest drop-shadow-[3px_3px_0px_#c7d2fe]">
//                       CERTIFICATE
//                     </h1>

//                     <p className="text-7xl italic text-blue-800 font-serif mt-6">
//                       Of Internship
//                     </p>
//                     <p className="text-5xl mt-8 text-gray-700">
//                       This is to certify that
//                     </p>
//                   </div>

//                   <div className="text-center">
//                     <img src={assets.aicteLogo} className="w-44 mx-auto" />
//                     <p className="text-2xl font-bold text-blue-900 mt-3">
//                       AICTE APPROVED
//                     </p>
//                   </div>
//                 </div>

//                 {/* ================= BODY ================= */}
//                 <div className="flex-1 flex flex-col justify-center text-center space-y-10">
//                   <div className="text-6xl font-bold text-blue-900 border-b-4 border-blue-900 inline-block mt-4 px-20 pb-3 mx-auto">
//                     {certificateData.name}
//                   </div>

//                   <p className="text-5xl text-gray-700 max-w-6xl mx-auto leading-relaxed">
//                     Has successfully completed the{" "}
//                     <span className="font-semibold text-blue-900">
//                       {certificateData.duration}
//                     </span>{" "}
//                     Internship program in{" "}
//                     <span className="font-semibold text-blue-900">
//                       {certificateData.domain}
//                     </span>{" "}
//                     <br />
//                     at{" "}
//                     <span className="font-semibold text-blue-900 text-6xl">
//                       Intern Matrix
//                     </span>
//                     <br />
//                     <span className="text-4xl">
//                       (ISO 9001 : 2015 Certified Organisation)
//                     </span>
//                   </p>

//                   <p className="text-4xl">
//                     From{" "}
//                     <span className="font-semibold border-b-2 px-6">
//                       {certificateData.dateFrom}
//                     </span>{" "}
//                     to{" "}
//                     <span className="font-semibold border-b-2 px-6">
//                       {certificateData.dateTo}
//                     </span>{" "}
//                     with a consolidated score of{" "}
//                     <span className="font-bold text-blue-900 text-5xl">
//                       {certificateData.score}%
//                     </span>
//                   </p>
//                 </div>

//                 {/* ================= FOOTER ================= */}
//                 <div className="flex flex-col mt-8">
//                   <div className="grid grid-cols-3 gap-8 items-end">
//                     <div className="text-left pl-8">
//                       <div className="space-y-3">
//                         <div className="flex flex-col items-start">
//                           <img
//                             src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://www.internmatrix.com/verify/${certificateData.certificateId}`}
//                             alt="QR Code Verification"
//                             className="w-40 h-40 border-2 border-yellow-400 p-2 bg-white"
//                           />
//                         </div>
//                         <div className="pt-4">
//                           <p className="text-3xl text-gray-700">
//                             Certificate ID
//                           </p>
//                           <p className="text-3xl font-bold text-blue-900">
//                             {certificateData.certificateId}
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex flex-col items-center">
//                       <div className="flex gap-7 items-center justify-center">
//                         <img src={assets.isoLogo} className="h-24" alt="ISO" />
//                         <img src={assets.msmeLog} className="h-24" alt="MSME" />
//                         <img
//                           src={assets.microsoftLogo}
//                           className="h-24"
//                           alt="Microsoft"
//                         />
//                         <img
//                           src={assets.mocaLogo}
//                           className="h-24"
//                           alt="MOCA"
//                         />
//                       </div>
//                     </div>

//                     <div className="text-center pr-8">
//                       <img
//                         src={assets.signature}
//                         className="w-52 mx-auto mb-2"
//                         alt="Signature"
//                       />
//                       <div className="border-t-4 border-blue-900 pt-3 inline-block px-8">
//                         <p className="text-3xl font-semibold text-blue-900">
//                           Director
//                         </p>
//                         <p className="text-3xl font-semibold text-gray-700 mt-1">
//                           Intern Matrix
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-20 bg-gradient-to-r from-slate-800 via-blue-900 to-slate-800 text-white flex justify-between items-center px-12 py-5 rounded-lg shadow-lg">
//                     <div className="flex items-center gap-3">
//                       <svg
//                         className="w-6 h-6"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                       <p className="text-2xl">
//                         This is a digitally verifiable certificate
//                       </p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-xl text-blue-200">
//                         Verify authenticity at
//                       </p>
//                       <p className="text-2xl font-semibold">
//                         www.internmatrix.com/verify
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             {/* ================= END CERTIFICATE ================= */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InternshipCertificate;

import React, { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const InternshipCertificate = () => {
  const certificateRef = useRef(null);
  const containerRef = useRef(null);

  const [zoom, setZoom] = useState(0.4);
  const [imagesLoaded, setImagesLoaded] = useState(false);

const MIN_ZOOM = 0.1;
const MAX_ZOOM = 1.8;
const ZOOM_STEP = 0.04;

  const certificateData = {
    name: "Rohit Raj",
    domain: "Full Stack Development",
    duration: "5 weeks",
    dateFrom: "01/06/2024",
    dateTo: "31/08/2024",
    score: "96",
    dateOfIssue: "15/09/2024",
    certificateId: "IM2025123456",
  };

  const assets = {
    companyLogo:
      "https://res.cloudinary.com/deegn1hwt/image/upload/v1765623468/vxp0tuwevdwxjhnaaeeu.png",
    aicteLogo:
      "https://res.cloudinary.com/deegn1hwt/image/upload/v1765622673/jtjp7o0cnmckpn71anmi.jpg",
    signature:
      "https://res.cloudinary.com/deegn1hwt/image/upload/v1765623590/rqldqdqet6lbn4jklgo3.png",
    isoLogo:
      "https://res.cloudinary.com/deegn1hwt/image/upload/v1765623656/iayzjf2m9epwnvrr9hhg.jpg",
    msmeLog:
      "https://res.cloudinary.com/deegn1hwt/image/upload/v1765622741/nmnbkeyvsoxajc2mu2wx.png",
    microsoftLogo:
      "https://res.cloudinary.com/deegn1hwt/image/upload/v1765622628/dnyemxrvvjkepw9du0nh.png",
    mocaLogo:
      "https://res.cloudinary.com/deegn1hwt/image/upload/v1765622643/hi3ifdloxp55wxutxwvz.png",
  };

  /* ================= PRELOAD IMAGES ================= */
  useEffect(() => {
    const images = Object.values(assets).concat(
      `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://www.internmatrix.com/verify/${certificateData.certificateId}`
    );

    let loaded = 0;
    images.forEach((src) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded === images.length) setImagesLoaded(true);
      };
    });
  }, []);

  /* ================= MOBILE AUTO FIT ================= */
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const screenWidth = containerRef.current.offsetWidth;
      const certWidth = 2000;
      if (window.innerWidth < 768) {
        setZoom(screenWidth / certWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ================= MOUSE WHEEL ZOOM ================= */
  const handleWheel = (e) => {
    e.preventDefault();
    setZoom((prev) => {
      const next = e.deltaY < 0 ? prev + ZOOM_STEP : prev - ZOOM_STEP;
      return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, next));
    });
  };

  /* ================= PDF DOWNLOAD ================= */
  const downloadPDF = async () => {
    if (!imagesLoaded) return alert("Images still loading");

    const clone = certificateRef.current.cloneNode(true);
    clone.style.position = "fixed";
    clone.style.left = "-9999px";
    document.body.appendChild(clone);

    const canvas = await html2canvas(clone, { scale: 2, useCORS: true });
    const pdf = new jsPDF("landscape", "px", [canvas.width, canvas.height]);
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0);
    pdf.save(`${certificateData.name}-Certificate.pdf`);

    document.body.removeChild(clone);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <p className="text-sm text-gray-600 mb-3">
        🖱️ Scroll mouse on certificate to zoom
      </p>

      <button
        onClick={downloadPDF}
        disabled={!imagesLoaded}
        className={`mb-4 px-6 py-2 rounded font-semibold ${
          imagesLoaded ? "bg-green-600 text-white" : "bg-gray-400"
        }`}
      >
        {imagesLoaded ? "Download PDF" : "Loading Images..."}
      </button>

      {!imagesLoaded ? (
        <div className="h-96 flex items-center justify-center">
          <div className="w-24 h-24 border-8 border-blue-600 border-dashed rounded-full animate-spin" />
        </div>
      ) : (
        <div
          ref={containerRef}
          className="w-full h-[80vh] overflow-auto flex justify-center"
        >
          <div
            onWheel={handleWheel}
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "top center",
              transition: "transform 0.08s ease-out",
            }}
          >
            {/* ================= CERTIFICATE ================= */}
            <div
              ref={certificateRef}
              className="relative bg-white shadow-2xl"
              style={{
                width: "2000px",
                height: "1414px",
                border: "16px solid #1e3a8a",
              }}
            >
              {/* ================= WATERMARK ================= */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <img
                  src={assets.companyLogo}
                  alt="Intern Matrix Watermark"
                  className="w-[900px] opacity-[0.06]"
                />
              </div>

              {/* ================= CORNERS ================= */}
              <div className="absolute top-0 left-0 w-24 h-24 border-t-8 border-l-8 border-yellow-500" />
              <div className="absolute top-0 right-0 w-24 h-24 border-t-8 border-r-8 border-yellow-500" />
              <div className="absolute bottom-0 left-0 w-24 h-24 border-b-8 border-l-8 border-yellow-500" />
              <div className="absolute bottom-0 right-0 w-24 h-24 border-b-8 border-r-8 border-yellow-500" />

              {/* ================= CONTENT ================= */}
              <div className="relative z-10 h-full px-20 py-24 flex flex-col">
                {/* ================= HEADER ================= */}
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <img src={assets.companyLogo} className="w-44 mx-auto" />
                    <p className="text-3xl font-bold text-blue-900 mt-3">
                      Intern Matrix
                    </p>
                  </div>

                  <div className="text-center flex-1">
                    <h1 className="text-8xl font-extrabold font-serif text-blue-900 tracking-widest drop-shadow-[3px_3px_0px_#c7d2fe]">
                      CERTIFICATE
                    </h1>

                    <p className="text-7xl italic text-blue-800 font-serif mt-6">
                      Of Internship
                    </p>
                    <p className="text-5xl mt-8 text-gray-700">
                      This is to certify that
                    </p>
                  </div>

                  <div className="text-center">
                    <img src={assets.aicteLogo} className="w-44 mx-auto" />
                    <p className="text-2xl font-bold text-blue-900 mt-3">
                      AICTE APPROVED
                    </p>
                  </div>
                </div>

                {/* ================= BODY ================= */}
                <div className="flex-1 flex flex-col justify-center text-center space-y-10">
                  <div className="text-6xl font-bold text-blue-900 border-b-4 border-blue-900 inline-block mt-4 px-20 pb-3 mx-auto">
                    {certificateData.name}
                  </div>

                  <p className="text-5xl text-gray-700 max-w-6xl mx-auto leading-relaxed">
                    Has successfully completed the{" "}
                    <span className="font-semibold text-blue-900">
                      {certificateData.duration}
                    </span>{" "}
                    Internship program in{" "}
                    <span className="font-semibold text-blue-900">
                      {certificateData.domain}
                    </span>{" "}
                    <br />
                    at{" "}
                    <span className="font-semibold text-blue-900 text-6xl">
                      Intern Matrix
                    </span>
                    <br />
                    <span className="text-4xl">
                      (ISO 9001 : 2015 Certified Organisation)
                    </span>
                  </p>

                  <p className="text-4xl">
                    From{" "}
                    <span className="font-semibold border-b-2 px-6">
                      {certificateData.dateFrom}
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold border-b-2 px-6">
                      {certificateData.dateTo}
                    </span>{" "}
                    with a consolidated score of{" "}
                    <span className="font-bold text-blue-900 text-5xl">
                      {certificateData.score}%
                    </span>
                  </p>
                </div>

                {/* ================= FOOTER ================= */}
                <div className="flex flex-col mt-8">
                  <div className="grid grid-cols-3 gap-8 items-end">
                    <div className="text-left pl-8">
                      <div className="space-y-3">
                        <div className="flex flex-col items-start">
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://www.internmatrix.com/verify/${certificateData.certificateId}`}
                            alt="QR Code Verification"
                            className="w-40 h-40 border-2 border-yellow-400 p-2 bg-white"
                          />
                        </div>
                        <div className="pt-4">
                          <p className="text-3xl text-gray-700">
                            Certificate ID
                          </p>
                          <p className="text-3xl font-bold text-blue-900">
                            {certificateData.certificateId}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="flex gap-7 items-center justify-center">
                        <img src={assets.isoLogo} className="h-24" alt="ISO" />
                        <img src={assets.msmeLog} className="h-24" alt="MSME" />
                        <img
                          src={assets.microsoftLogo}
                          className="h-24"
                          alt="Microsoft"
                        />
                        <img
                          src={assets.mocaLogo}
                          className="h-24"
                          alt="MOCA"
                        />
                      </div>
                    </div>

                    <div className="text-center pr-8">
                      <img
                        src={assets.signature}
                        className="w-52 mx-auto mb-2"
                        alt="Signature"
                      />
                      <div className="border-t-4 border-blue-900 pt-3 inline-block px-8">
                        <p className="text-3xl font-semibold text-blue-900">
                          Director
                        </p>
                        <p className="text-3xl font-semibold text-gray-700 mt-1">
                          Intern Matrix
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-20 bg-gradient-to-r from-slate-800 via-blue-900 to-slate-800 text-white flex justify-between items-center px-12 py-5 rounded-lg shadow-lg">
                    <div className="flex items-center gap-3">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-2xl">
                        This is a digitally verifiable certificate
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl text-blue-200">
                        Verify authenticity at
                      </p>
                      <p className="text-2xl font-semibold">
                        www.internmatrix.com/verify
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ================= END CERTIFICATE ================= */}
          </div>
        </div>
      )}
    </div>
  );
};

export default InternshipCertificate; 