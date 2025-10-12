import { useState } from 'react';
import { CheckCircle, XCircle, Upload, Loader2, AlertCircle } from 'lucide-react';
import QRCode from 'react-qr-code';

export default function PaymentVerificationForm() {
  const [step, setStep] = useState(1);
  const [teamId, setTeamId] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [couponStatus, setCouponStatus] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [titleVisible, setTitleVisible] = useState(true);
  const [hasIEEEACM, setHasIEEEACM] = useState('');
  
  const [formData, setFormData] = useState({
    teamName: '',
    teamLeaderName: '',
    teamSize: '',
    teammate1: '',
    teammate2: '',
    UTR_ID: ''
  });

  const [submissionResult, setSubmissionResult] = useState(null);

  const API_BASE = 'https://omnitrix-backend-epg5.onrender.com/api/payment';

  // UPI Details
  const upiId = "9398742067@axl";
  const payeeName = "Omnitrix Hackathon";
  const currency = "INR";
  const paymentAmount = hasIEEEACM === 'yes' ? 500 : 600;  
  // Generate dynamic UPI link
  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${paymentAmount}&cu=${currency}`;

  const handleVerifyTeam = async () => {
    if (!teamId.trim()) {
      setVerificationStatus({ success: false, message: 'Please enter a Team ID' });
      return;
    }

    setIsVerifying(true);
    setVerificationStatus(null);

    try {
      const response = await fetch(`${API_BASE}/verify-shortlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamId })
      });

      const data = await response.json();

      if (data.success) {
        setVerificationStatus({ success: true, message: data.message });
        setTimeout(() => setStep(2), 1500);
      } else {
        setVerificationStatus({ success: false, message: data.message });
      }
    } catch (error) {
      setVerificationStatus({ success: false, message: 'Error connecting to server' });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleVerifyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponStatus({ success: false, message: 'Please enter a Coupon Code' });
      return;
    }

    setIsVerifying(true);
    setCouponStatus(null);

    try {
      const response = await fetch(`${API_BASE}/verify-coupon`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamId, code: couponCode })
      });

      const data = await response.json();

      if (data.success) {
        setCouponStatus({ success: true, message: data.message });
        setTimeout(() => setStep(3), 1500);
      } else {
        setCouponStatus({ success: false, message: data.message });
      }
    } catch (error) {
      setCouponStatus({ success: false, message: 'Error verifying coupon' });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmitPayment = async () => {
    if (!formData.teamName || !formData.teamLeaderName || !formData.teamSize || !formData.teammate1 || !formData.UTR_ID) {
      alert('Please fill all required fields');
      return;
    }

    if (!selectedFile) {
      alert('Please upload a payment screenshot');
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('teamId', teamId);
      formDataToSend.append('teamName', formData.teamName);
      formDataToSend.append('teamLeaderName', formData.teamLeaderName);
      formDataToSend.append('teamSize', formData.teamSize);
      formDataToSend.append('teammate1', formData.teammate1);
      formDataToSend.append('teammate2', formData.teammate2);
      formDataToSend.append('UTR_ID', formData.UTR_ID);
      formDataToSend.append('paymentScreenshot', selectedFile);

      const response = await fetch(`${API_BASE}/submit-payment`, {
        method: 'POST',
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        setSubmissionResult({
          success: true,
          newTeamId: data.newTeamId,
          paymentScreenshot: data.paymentScreenshot
        });
        setStep(4);
      } else {
        alert(data.error || 'Submission failed');
      }
    } catch (error) {
      alert('Error submitting payment: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackClick = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-white p-4 sm:p-8">
      {isSubmitting && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-transparent border-2 border-green-400/60 rounded-xl p-8 shadow-2xl shadow-green-400/20">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="w-16 h-16 text-green-400 animate-spin" />
              <p className="text-green-400 font-semibold text-lg">Processing Payment...</p>
              <p className="text-green-300/60 text-sm">Please wait...</p>
            </div>
          </div>
        </div>
      )}

      {step > 1 && (
        <div className="mb-8">
          <button
            onClick={handleBackClick}
            className="flex items-center space-x-2 bg-transparent border-2 border-green-400/30 text-green-400 hover:border-green-400/60 hover:text-green-300 transition-all duration-300 px-4 py-2 rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back</span>
          </button>
        </div>
      )}

      <div className={`text-center mb-8 transition-all duration-1000 ${
        titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
      }`}>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Payment Verification</h1>
        <p className="text-green-400/80 text-lg">Complete verification to proceed with payment</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                  step >= s ? 'bg-green-400/20 border-2 border-green-400 text-green-400' : 'bg-transparent border-2 border-green-400/30 text-gray-400'
                }`}>
                  {s}
                </div>
                {s < 4 && (
                  <div className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${step > s ? 'bg-green-400' : 'bg-green-400/30'}`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs sm:text-sm">
            <span className={step >= 1 ? 'text-green-400 font-medium' : 'text-gray-500'}>Verify Team</span>
            <span className={step >= 2 ? 'text-green-400 font-medium' : 'text-gray-500'}>Membership</span>
            <span className={step >= 3 ? 'text-green-400 font-medium' : 'text-gray-500'}>Payment</span>
            <span className={step >= 4 ? 'text-green-400 font-medium' : 'text-gray-500'}>Complete</span>
          </div>
        </div>

        <div className="bg-transparent border-2 border-green-400/30 rounded-xl p-6 sm:p-8 hover:border-green-400/60 hover:shadow-lg hover:shadow-green-400/20 transition-all duration-300">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Step 1: Verify Team ID</h2>
                <p className="text-gray-400 text-sm mb-6">Enter your team ID to verify if you're shortlisted</p>
              </div>
              
              <div className="space-y-2">
                <label className="block text-white font-semibold text-lg">
                  Team ID <span className="text-green-400">*</span>
                </label>
                <input
                  type="text"
                  value={teamId}
                  onChange={(e) => setTeamId(e.target.value)}
                  placeholder="e.g., TEAM001"
                  className="w-full bg-transparent border-2 border-green-400/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-400/60 transition-all duration-300"
                />
              </div>

              {verificationStatus && (
                <div className={`flex items-center gap-3 p-4 rounded-lg border-2 ${
                  verificationStatus.success 
                    ? 'bg-green-400/10 border-green-400/60 text-green-400' 
                    : 'bg-red-400/10 border-red-400/60 text-red-400'
                }`}>
                  {verificationStatus.success ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                  <span className="font-medium">{verificationStatus.message}</span>
                </div>
              )}

              <button
                onClick={handleVerifyTeam}
                disabled={isVerifying}
                className={`w-full border-2 font-bold py-4 px-8 rounded-lg transition-all duration-300 transform shadow-lg ${
                  isVerifying
                    ? 'opacity-50 cursor-not-allowed bg-transparent border-gray-500/30 text-gray-500' 
                    : 'bg-transparent border-green-400/60 text-green-400 hover:bg-green-400/10 hover:border-green-400 hover:text-green-300 hover:shadow-green-400/30'
                }`}
              >
                {isVerifying ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  'Verify Team ID'
                )}
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Step 2: IEEE/ACM Membership</h2>
                <p className="text-gray-400 text-sm mb-6">Verify your membership status to proceed</p>
              </div>

              {/* IEEE/ACM Membership Question */}
              <div className="bg-green-400/5 border-2 border-green-400/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-400 mb-4">
                  IEEE/ACM Membership
                </h3>
                <p className="text-gray-300 mb-4">Does at least one member in your team have IEEE or ACM membership?</p>
                
                <div className="flex space-x-4 mb-4">
                  <button
                    type="button"
                    onClick={() => {
                      setHasIEEEACM('yes');
                      setCouponCode('');
                      setCouponStatus(null);
                    }}
                    className={`flex-1 py-3 px-6 rounded-lg font-bold transition-all duration-300 ${
                      hasIEEEACM === 'yes'
                        ? 'bg-green-400/20 border-2 border-green-400 text-green-400'
                        : 'bg-transparent border-2 border-green-400/30 text-gray-400 hover:border-green-400/60 hover:text-green-400'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setHasIEEEACM('no');
                      setCouponCode('');
                      setCouponStatus(null);
                    }}
                    className={`flex-1 py-3 px-6 rounded-lg font-bold transition-all duration-300 ${
                      hasIEEEACM === 'no'
                        ? 'bg-green-400/20 border-2 border-green-400 text-green-400'
                        : 'bg-transparent border-2 border-green-400/30 text-gray-400 hover:border-green-400/60 hover:text-green-400'
                    }`}
                  >
                    No
                  </button>
                </div>

                {hasIEEEACM === 'yes' && (
                  <div className="space-y-4 mt-6 pt-6 border-t border-green-400/20">
                    <p className="text-green-400 font-semibold mb-3">Great! Enter your coupon code to verify membership</p>
                    
                    <div className="space-y-2">
                      <label className="block text-white font-semibold text-lg">
                        Coupon Code <span className="text-green-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter your coupon code"
                        className="w-full bg-transparent border-2 border-green-400/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-400/60 transition-all duration-300"
                      />
                    </div>

                    {couponStatus && (
                      <div className={`flex items-center gap-3 p-4 rounded-lg border-2 ${
                        couponStatus.success 
                          ? 'bg-green-400/10 border-green-400/60 text-green-400' 
                          : 'bg-red-400/10 border-red-400/60 text-red-400'
                      }`}>
                        {couponStatus.success ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                        <span className="font-medium">{couponStatus.message}</span>
                      </div>
                    )}

                    <button
                      onClick={handleVerifyCoupon}
                      disabled={isVerifying}
                      className={`w-full border-2 font-bold py-4 px-8 rounded-lg transition-all duration-300 transform shadow-lg ${
                        isVerifying
                          ? 'opacity-50 cursor-not-allowed bg-transparent border-gray-500/30 text-gray-500' 
                          : 'bg-transparent border-green-400/60 text-green-400 hover:bg-green-400/10 hover:border-green-400 hover:text-green-300 hover:shadow-green-400/30'
                      }`}
                    >
                      {isVerifying ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Verifying...
                        </span>
                      ) : (
                        'Verify Coupon'
                      )}
                    </button>
                  </div>
                )}

                {hasIEEEACM === 'no' && (
                  <div className="space-y-4 mt-6 pt-6 border-t border-green-400/20">
                    <div className="bg-green-400/5 border border-green-400/20 rounded-lg p-4">
                      <p className="text-gray-300 text-sm mb-3">
                        No problem! You can proceed without a membership discount.
                      </p>
                    </div>
                    
                    <button
                      onClick={() => setStep(3)}
                      className="w-full border-2 font-bold py-4 px-8 rounded-lg transition-all duration-300 transform shadow-lg bg-transparent border-green-400/60 text-green-400 hover:bg-green-400/10 hover:border-green-400 hover:text-green-300 hover:shadow-green-400/30"
                    >
                      Continue to Payment
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Step 3: Submit Payment Details</h2>
                <p className="text-gray-400 text-sm mb-6">Fill in your team details and upload payment proof</p>
              </div>

              <div className="space-y-2">
                <label className="block text-white font-semibold text-lg">
                  Team Name <span className="text-green-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.teamName}
                  onChange={(e) => setFormData({...formData, teamName: e.target.value})}
                  className="w-full bg-transparent border-2 border-green-400/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-400/60 transition-all duration-300"
                  placeholder="Enter team name"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-white font-semibold text-lg">
                  Team Leader Name <span className="text-green-400">*</span>
                </label>
                <div className="flex items-start space-x-2 mb-2 bg-blue-400/10 border border-blue-400/30 rounded-lg p-3">
                  <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-blue-300 text-sm">
                    Enter name exactly as it should appear on certificates
                  </p>
                </div>
                <input
                  type="text"
                  value={formData.teamLeaderName}
                  onChange={(e) => setFormData({...formData, teamLeaderName: e.target.value})}
                  className="w-full bg-transparent border-2 border-green-400/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-400/60 transition-all duration-300"
                  placeholder="Full name for certificate"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-white font-semibold text-lg">
                  Team Size <span className="text-green-400">*</span>
                </label>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, teamSize: '2'})}
                    className={`flex-1 py-3 px-6 rounded-lg font-bold transition-all duration-300 ${
                      formData.teamSize === '2'
                        ? 'bg-green-400/20 border-2 border-green-400 text-green-400'
                        : 'bg-transparent border-2 border-green-400/30 text-gray-400 hover:border-green-400/60 hover:text-green-400'
                    }`}
                  >
                    2 Members
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, teamSize: '3'})}
                    className={`flex-1 py-3 px-6 rounded-lg font-bold transition-all duration-300 ${
                      formData.teamSize === '3'
                        ? 'bg-green-400/20 border-2 border-green-400 text-green-400'
                        : 'bg-transparent border-2 border-green-400/30 text-gray-400 hover:border-green-400/60 hover:text-green-400'
                    }`}
                  >
                    3 Members
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-white font-semibold text-lg">
                  Teammate 1 <span className="text-green-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.teammate1}
                  onChange={(e) => setFormData({...formData, teammate1: e.target.value})}
                  className="w-full bg-transparent border-2 border-green-400/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-400/60 transition-all duration-300"
                  placeholder="Full name"
                />
              </div>

              {formData.teamSize === '3' && (
                <div className="space-y-2">
                  <label className="block text-white font-semibold text-lg">
                    Teammate 2 (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.teammate2}
                    onChange={(e) => setFormData({...formData, teammate2: e.target.value})}
                    className="w-full bg-transparent border-2 border-green-400/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-400/60 transition-all duration-300"
                    placeholder="Full name"
                  />
                </div>
              )}

              {/* QR Code Payment Section */}
              <div className="bg-green-400/5 border-2 border-green-400/30 rounded-xl p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-green-400 mb-6 text-center">
                  Scan QR Code to Pay
                </h3>
                <div className="flex justify-center mb-6">
                  <div className="relative w-full max-w-sm">
                    <div className="aspect-square w-full bg-white rounded-2xl overflow-hidden shadow-2xl shadow-green-400/20 border-4 border-green-400/40 p-4 flex items-center justify-center">
                      <QRCode 
                        value={upiLink}
                        size={256}
                        level="H"
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-center space-y-3">
                  <p className="text-gray-300 text-base sm:text-lg">
                    Scan this QR code with any UPI app to complete your payment
                  </p>
                  <div className="bg-green-400/10 border border-green-400/30 rounded-lg py-3 px-4">
                    <p className="text-green-400 font-bold text-xl sm:text-2xl">
                      Amount: ₹{paymentAmount}
                    </p>
                  </div>
                 
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-white font-semibold text-lg">
                  UTR ID / Transaction ID <span className="text-green-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.UTR_ID}
                  onChange={(e) => setFormData({...formData, UTR_ID: e.target.value})}
                  className="w-full bg-transparent border-2 border-green-400/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-400/60 transition-all duration-300"
                  placeholder="Enter transaction ID"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-white font-semibold text-lg">
                  Payment Screenshot <span className="text-green-400">*</span>
                </label>
                <label className="w-full bg-transparent border-2 border-green-400/30 hover:border-green-400/60 rounded-lg px-4 py-3 transition-all duration-300 cursor-pointer flex items-center justify-between">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <span className={previewUrl ? 'text-green-400' : 'text-gray-400'}>
                    {previewUrl ? selectedFile.name : 'Choose payment screenshot'}
                  </span>
                  <Upload className={`w-5 h-5 ${previewUrl ? 'text-green-400' : 'text-gray-400'}`} />
                </label>
                
                {previewUrl && (
                  <div className="space-y-2">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="max-h-48 mx-auto rounded-lg border-2 border-green-400/40"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl(null);
                      }}
                      className="text-green-400 hover:text-green-300 text-sm underline block mx-auto"
                    >
                      Remove screenshot
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={handleSubmitPayment}
                disabled={isSubmitting}
                className={`w-full border-2 font-bold py-4 px-8 rounded-lg transition-all duration-300 transform shadow-lg ${
                  isSubmitting
                    ? 'opacity-50 cursor-not-allowed bg-transparent border-gray-500/30 text-gray-500' 
                    : 'bg-transparent border-green-400/60 text-green-400 hover:bg-green-400/10 hover:border-green-400 hover:text-green-300 hover:shadow-green-400/30'
                }`}
              >
                {isSubmitting ? 'Submitting Payment...' : 'Submit Payment'}
              </button>
            </div>
          )}
{step === 4 && submissionResult && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center bg-green-400/20 border-2 border-green-400">
                <CheckCircle className="w-12 h-12 text-green-400" />
              </div>
              
              <h2 className="text-3xl font-bold text-white">Payment Submitted Successfully!</h2>
              
              <div className="bg-green-400/10 border-2 border-green-400/60 rounded-lg p-6">
                <p className="text-lg font-semibold text-green-400 mb-3">Payment Under Verification</p>
                <p className="text-gray-300 text-base">
                  Your payment details have been received and are being reviewed by our team.
                </p>
              </div>
              
              <div className="text-left space-y-3 bg-green-400/5 border border-green-400/20 rounded-lg p-6">
                <p className="text-gray-300 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Team verification completed
                </p>
                <p className="text-gray-300 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  {hasIEEEACM === 'yes' ? 'IEEE/ACM membership verified' : 'Membership status confirmed'}
                </p>
                <p className="text-gray-300 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Payment details submitted
                </p>
                <p className="text-gray-300 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Screenshot uploaded successfully
                </p>
              </div>
              
              <div className="bg-blue-400/10 border border-blue-400/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-blue-300 text-sm text-left">
                    You will receive an email confirmation with your new Team ID once your payment has been verified. Please check your inbox within 24-48 hours.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-green-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-3 h-3 bg-green-300/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-green-500/40 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-green-400/25 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-400/30 rounded-full animate-ping"></div>
      </div>
    </div>
  );
}