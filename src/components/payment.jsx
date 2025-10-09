import React, { useState, useEffect } from 'react';
import { Upload, Check, X } from 'lucide-react';
import omnitrix from '../assets/omnitrix.png';
import payment1 from '../assets/payment1.jpg';
import payment2 from '../assets/payment2.jpg';

const PaymentComponent = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState('success');
  const [messageContent, setMessageContent] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponChecking, setCouponChecking] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(600);
  const [screenshot, setScreenshot] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [hasIEEEACM, setHasIEEEACM] = useState('');
  
  const [formData, setFormData] = useState({
    teamId: '',
    teamLeaderName: '',
   /* teamSize: '',
    teamMember2Name: '',
    teamMember3Name: '',*/
    couponCode: '',
    transactionId: '',
    screenshot: null
  });

  useEffect(() => {
    const titleTimer = setTimeout(() => setTitleVisible(true), 300);
    return () => clearTimeout(titleTimer);
  }, []);

  //const teamSizes = ['2', '3'];

  const validateForm = () => {
    const errors = {};

    if (!formData.teamId.trim()) {
      errors.teamId = 'Team ID is required';
    }

    if (!formData.teamLeaderName.trim()) {
      errors.teamLeaderName = 'Team leader name is required';
    } else if (formData.teamLeaderName.trim().length < 2) {
      errors.teamLeaderName = 'Name must be at least 2 characters';
    }

   /* if (!formData.teamSize) {
      errors.teamSize = 'Please select team size';
    }

    if (formData.teamSize && parseInt(formData.teamSize) >= 2) {
      if (!formData.teamMember2Name.trim()) {
        errors.teamMember2Name = 'Second team member name is required';
      } else if (formData.teamMember2Name.trim().length < 2) {
        errors.teamMember2Name = 'Name must be at least 2 characters';
      }
    }

    if (formData.teamSize && parseInt(formData.teamSize) === 3) {
      if (!formData.teamMember3Name.trim()) {
        errors.teamMember3Name = 'Third team member name is required';
      } else if (formData.teamMember3Name.trim().length < 2) {
        errors.teamMember3Name = 'Name must be at least 2 characters';
      }
    }*/

    if (!formData.transactionId.trim()) {
      errors.transactionId = 'Transaction ID is required';
    } else if (formData.transactionId.trim().length < 6) {
      errors.transactionId = 'Please enter a valid transaction ID';
    }

    if (!screenshot) {
      errors.screenshot = 'Payment screenshot is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
  /*  if (name === 'teamSize') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        teamMember2Name: '',
        teamMember3Name: ''
      }));
      
      setValidationErrors(prevErrors => {
        const { teamMember2Name, teamMember3Name, ...rest } = prevErrors;
        return rest;
      });
      return;
    }*/

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setValidationErrors(prev => ({
          ...prev,
          screenshot: 'File size should be less than 5MB'
        }));
        return;
      }

      if (!file.type.startsWith('image/')) {
        setValidationErrors(prev => ({
          ...prev,
          screenshot: 'Please upload an image file'
        }));
        return;
      }

      setScreenshot(file);
      setScreenshotPreview(URL.createObjectURL(file));
      
      if (validationErrors.screenshot) {
        setValidationErrors(prev => ({
          ...prev,
          screenshot: ''
        }));
      }
    }
  };

  const handleApplyCoupon = async () => {
    if (!formData.couponCode.trim()) {
      setValidationErrors(prev => ({
        ...prev,
        couponCode: 'Please enter a coupon code'
      }));
      return;
    }

    setCouponChecking(true);

    // Hardcoded valid coupons for testing
    const validCoupons = ['IEEE2025', 'ACM2025', 'OMNITRIX100', 'MEMBER2025', 'HACKATHON25'];
    const enteredCoupon = formData.couponCode.trim().toUpperCase();

    // Simulate API delay
    setTimeout(() => {
      if (validCoupons.includes(enteredCoupon)) {
        setCouponApplied(true);
        setPaymentAmount(500);
        setMessageType('success');
        setMessageContent({
          title: 'Coupon Applied Successfully!',
          description: 'IEEE/ACM member discount applied! Your payment amount is now ₹500.'
        });
        setShowMessage(true);
        setCouponChecking(false);
      } else {
        setValidationErrors(prev => ({
          ...prev,
          couponCode: 'Invalid or already used coupon code'
        }));
        setCouponChecking(false);
      }
    }, 1000);

    /* Original API call - commented out for now
    try {
      const response = await fetch('https://omnitrix-backend-1.onrender.com/api/coupon/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          couponCode: formData.couponCode.trim(),
          teamId: formData.teamId.trim()
        })
      });

      const data = await response.json();

      if (data.success) {
        setCouponApplied(true);
        setPaymentAmount(500);
        setMessageType('success');
        setMessageContent({
          title: 'Coupon Applied Successfully!',
          description: '🎉 IEEE/ACM member discount applied! Your payment amount is now ₹500.'
        });
        setShowMessage(true);
      } else {
        setValidationErrors(prev => ({
          ...prev,
          couponCode: data.message || 'Invalid or already used coupon code'
        }));
      }
    } catch (err) {
      console.error('Error validating coupon:', err);
      setValidationErrors(prev => ({
        ...prev,
        couponCode: 'Error validating coupon. Please try again.'
      }));
    } finally {
      setCouponChecking(false);
    }
    */
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setMessageType('error');
      setMessageContent({
        title: 'Validation Error',
        description: 'Please fill in all required fields correctly before submitting.'
      });
      setShowMessage(true);
      return;
    }

    setIsLoading(true);

    const paymentData = new FormData();
    paymentData.append('teamId', formData.teamId.trim());
    paymentData.append('teamLeaderName', formData.teamLeaderName.trim());
    paymentData.append('transactionId', formData.transactionId.trim());
    paymentData.append('paymentAmount', paymentAmount);
    paymentData.append('couponApplied', couponApplied);
    if (couponApplied) {
      paymentData.append('couponCode', formData.couponCode.trim());
    }
    paymentData.append('screenshot', screenshot);

    console.log('Submitting payment data...');

    try {
      const response = await fetch('https://omnitrix-backend-1.onrender.com/api/payment/submit', {
        method: 'POST',
        body: paymentData
      });

      const data = await response.json();

      if (data.success) {
        console.log('✅ Payment submitted successfully:', data);
        setMessageType('success');
        setMessageContent({
          title: 'Payment Submitted Successfully!',
          description: 'Hey Alien 👽, your payment has been submitted! You will receive a confirmation email shortly. Check your Spam/Promotions folder if you don\'t see it.'
        });
        setShowMessage(true);
        
        setFormData({
          teamId: '',
          teamLeaderName: '',
          couponCode: '',
          transactionId: '',
          screenshot: null
        });
        setScreenshot(null);
        setScreenshotPreview(null);
        setCouponApplied(false);
        setPaymentAmount(600);
        setValidationErrors({});
      } else {
        console.error('❌ Payment submission failed:', data.error);
        setMessageType('error');
        setMessageContent({
          title: 'Submission Failed',
          description: data.message || 'Please check your information and try again.'
        });
        setShowMessage(true);
      }
    } catch (err) {
      console.error('❌ Error submitting payment:', err);
      setMessageType('error');
      setMessageContent({
        title: 'Connection Error',
        description: 'Please check your internet connection and try again later.'
      });
      setShowMessage(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackClick = () => {
    window.location.href = '/';
  };

  const closeMessage = () => {
    setShowMessage(false);
  };

  const isFormValid = () => {
    const baseValid = formData.teamId.trim() &&
                      formData.teamLeaderName.trim() &&
                      formData.transactionId.trim() &&
                      screenshot;

    if (!baseValid) return false;

  /*  if (parseInt(formData.teamSize) >= 2) {
      if (!formData.teamMember2Name.trim()) {
        return false;
      }
    }

    if (parseInt(formData.teamSize) === 3) {
      if (!formData.teamMember3Name.trim()) {
        return false;
      }
    }*/

    return true;
  };

  const Ben10Loading = () => (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="relative">
        <img 
          src={omnitrix}
          alt="Ben 10 Omnitrix Watch" 
          className="w-24 h-24 object-contain animate-spin"
          style={{ animationDuration: '2s' }}
        />
        <div className="absolute inset-0 rounded-full border-2 border-green-400/50 animate-ping"></div>
        <div className="absolute inset-2 rounded-full border border-green-300/30 animate-pulse"></div>
      </div>
      
      <div className="text-green-400 font-semibold animate-pulse text-lg">
        Processing Payment...
      </div>
      
      <div className="text-green-300/60 text-sm">
        Activating Omnitrix...
      </div>
      
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-transparent text-white p-4 sm:p-8">
      {isLoading && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-transparent border-2 border-green-400/60 rounded-xl p-8 shadow-2xl shadow-green-400/20">
            <Ben10Loading />
          </div>
        </div>
      )}

      {showMessage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`bg-transparent border-2 rounded-xl p-8 shadow-2xl max-w-md w-full ${
            messageType === 'success' 
              ? 'border-green-400/60 shadow-green-400/20' 
              : 'border-red-400/60 shadow-red-400/20'
          }`}>
            <div className="text-center space-y-4">
              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                messageType === 'success' ? 'bg-green-400/20' : 'bg-red-400/20'
              }`}>
                {messageType === 'success' ? (
                  <Check className="w-8 h-8 text-green-400" />
                ) : (
                  <X className="w-8 h-8 text-red-400" />
                )}
              </div>

              <h3 className={`text-2xl font-bold ${
                messageType === 'success' ? 'text-green-400' : 'text-red-400'
              }`}>
                {messageContent.title}
              </h3>

              <p className="text-gray-300 text-lg leading-relaxed">
                {messageContent.description}
              </p>

              <button
                onClick={closeMessage}
                className={`w-full font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] ${
                  messageType === 'success' 
                    ? 'bg-transparent border-2 border-green-400/60 text-green-400 hover:bg-green-400/10 hover:border-green-400 hover:text-green-300 shadow-lg hover:shadow-green-400/30' 
                    : 'bg-transparent border-2 border-red-400/60 text-red-400 hover:bg-red-400/10 hover:border-red-400 hover:text-red-300 shadow-lg hover:shadow-red-400/30'
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <button
          onClick={handleBackClick}
          className="flex items-center space-x-2 bg-transparent border-2 border-green-400/30 text-green-400 hover:border-green-400/60 hover:text-green-300 transition-all duration-300 px-4 py-2 rounded-lg cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back to Home</span>
        </button>
      </div>

      <div className={`text-center mb-8 transition-all duration-1000 ${
        titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
      }`}>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Payment for Omnitrix</h1>
        <p className="text-green-400/80 text-lg">Complete your payment for Omnitrix Hackathon 2025</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-transparent border-2 border-green-400/30 rounded-xl p-8 hover:border-green-400/60 hover:shadow-lg hover:shadow-green-400/20 transition-all duration-300">
          <div className="space-y-8">
            
            <div className="space-y-2">
              <label className="block text-white font-semibold text-lg">
                Team ID <span className="text-green-400">*</span>
              </label>
              <input
                type="text"
                name="teamId"
                value={formData.teamId}
                onChange={handleInputChange}
                required
                className={`w-full bg-transparent border-2 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                  validationErrors.teamId 
                    ? 'border-red-400/60 focus:border-red-400' 
                    : 'border-green-400/30 focus:border-green-400/60'
                }`}
                placeholder="Enter your team ID"
              />
              {validationErrors.teamId && (
                <p className="text-red-400 text-sm mt-1">{validationErrors.teamId}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-white font-semibold text-lg">
                Team Leader Name <span className="text-green-400">*</span>
              </label>
              <input
                type="text"
                name="teamLeaderName"
                value={formData.teamLeaderName}
                onChange={handleInputChange}
                required
                className={`w-full bg-transparent border-2 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                  validationErrors.teamLeaderName 
                    ? 'border-red-400/60 focus:border-red-400' 
                    : 'border-green-400/30 focus:border-green-400/60'
                }`}
                placeholder="Enter team leader's full name"
              />
              {validationErrors.teamLeaderName && (
                <p className="text-red-400 text-sm mt-1">{validationErrors.teamLeaderName}</p>
              )}
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
                    setFormData(prev => ({ ...prev, couponCode: '' }));
                    setCouponApplied(false);
                    setPaymentAmount(600);
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
                    setFormData(prev => ({ ...prev, couponCode: '' }));
                    setCouponApplied(false);
                    setPaymentAmount(600);
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
                <div className="space-y-2 mt-6 pt-6 border-t border-green-400/20">
                  <p className="text-green-400 font-semibold mb-3">Great! Apply your coupon code to get ₹100 discount!</p>
                  <label className="block text-white font-semibold">
                    Coupon Code
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      name="couponCode"
                      value={formData.couponCode}
                      onChange={handleInputChange}
                      disabled={couponApplied}
                      className={`flex-1 bg-transparent border-2 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                        couponApplied 
                          ? 'border-green-400/60 bg-green-400/5' 
                          : validationErrors.couponCode 
                          ? 'border-red-400/60 focus:border-red-400' 
                          : 'border-green-400/30 focus:border-green-400/60'
                      }`}
                      placeholder="Enter coupon code"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      disabled={couponApplied || couponChecking || !formData.couponCode.trim()}
                      className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 whitespace-nowrap ${
                        couponApplied 
                          ? 'bg-green-400/20 border-2 border-green-400 text-green-400 cursor-not-allowed'
                          : couponChecking
                          ? 'bg-green-400/20 border-2 border-green-400 text-green-400 cursor-wait'
                          : !formData.couponCode.trim()
                          ? 'opacity-50 cursor-not-allowed bg-transparent border-2 border-gray-500/30 text-gray-500'
                          : 'bg-transparent border-2 border-green-400/60 text-green-400 hover:bg-green-400/10 hover:border-green-400 cursor-pointer'
                      }`}
                    >
                      {couponApplied ? (
                        <span className="flex items-center space-x-2">
                          <Check className="w-5 h-5" />
                          <span>Applied</span>
                        </span>
                      ) : couponChecking ? (
                        'Checking...'
                      ) : (
                        'Apply'
                      )}
                    </button>
                  </div>
                  {validationErrors.couponCode && (
                    <p className="text-red-400 text-sm mt-1">{validationErrors.couponCode}</p>
                  )}
                  {couponApplied && (
                    <p className="text-green-400 text-sm mt-1 flex items-center space-x-1">
                      <Check className="w-4 h-4" />
                      <span>Coupon applied successfully! ₹100 discount added.</span>
                    </p>
                  )}
                </div>
              )}

              {hasIEEEACM === 'no' && (
                <div className="bg-green-400/5 border border-green-400/20 rounded-lg p-4 mt-4">
                  <p className="text-gray-300 text-sm">
                    No problem! Your registration fee is ₹600.
                  </p>
                </div>
              )}
            </div>

            {/* QR Code Display */}
            <div className="bg-green-400/5 border-2 border-green-400/30 rounded-xl p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-green-400 mb-6 text-center">
                Scan QR Code to Pay
              </h3>
              <div className="flex justify-center mb-6">
                <div className="relative w-full max-w-sm">
                  <div className="aspect-square w-full bg-white rounded-2xl overflow-hidden shadow-2xl shadow-green-400/20 border-4 border-green-400/40">
                    <img 
                      src={couponApplied ? payment2 : payment1}
                      alt="Payment QR Code"
                      className="w-full h-full object-cover"
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
                Transaction ID / UTR Number <span className="text-green-400">*</span>
              </label>
              <input
                type="text"
                name="transactionId"
                value={formData.transactionId}
                onChange={handleInputChange}
                required
                className={`w-full bg-transparent border-2 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                  validationErrors.transactionId 
                    ? 'border-red-400/60 focus:border-red-400' 
                    : 'border-green-400/30 focus:border-green-400/60'
                }`}
                placeholder="Enter transaction ID from payment receipt"
              />
              {validationErrors.transactionId && (
                <p className="text-red-400 text-sm mt-1">{validationErrors.transactionId}</p>
              )}
            </div>

            {/* Screenshot Upload */}
            <div className="space-y-2">
              <label className="block text-white font-semibold text-lg">
                Payment Screenshot <span className="text-green-400">*</span>
              </label>
              <div className="space-y-4">
                <label className={`w-full bg-transparent border-2 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-all duration-300 cursor-pointer flex items-center justify-between ${
                  validationErrors.screenshot 
                    ? 'border-red-400/60' 
                    : screenshotPreview 
                    ? 'border-green-400/60' 
                    : 'border-green-400/30 hover:border-green-400/60'
                }`}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <span className={screenshotPreview ? 'text-green-400' : 'text-gray-400'}>
                    {screenshotPreview ? screenshot.name : 'Choose payment screenshot'}
                  </span>
                  <Upload className={`w-5 h-5 ${screenshotPreview ? 'text-green-400' : 'text-gray-400'}`} />
                </label>
                
                {screenshotPreview && (
                  <div className="space-y-2">
                    <img 
                      src={screenshotPreview} 
                      alt="Payment Screenshot Preview" 
                      className="max-h-48 mx-auto rounded-lg border-2 border-green-400/40"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setScreenshot(null);
                        setScreenshotPreview(null);
                      }}
                      className="text-green-400 hover:text-green-300 text-sm underline block mx-auto"
                    >
                      Remove screenshot
                    </button>
                  </div>
                )}
                
                {validationErrors.screenshot && (
                  <p className="text-red-400 text-sm">{validationErrors.screenshot}</p>
                )}
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={handleSubmit}
                disabled={isLoading || !isFormValid()}
                className={`w-full border-2 font-bold py-4 px-8 rounded-lg transition-all duration-300 transform shadow-lg ${
                  isLoading || !isFormValid()
                    ? 'opacity-50 cursor-not-allowed bg-transparent border-gray-500/30 text-gray-500' 
                    : 'bg-transparent border-green-400/60 text-green-400 hover:scale-[1.02] hover:bg-green-400/10 hover:border-green-400 hover:text-green-300 hover:shadow-green-400/30 cursor-pointer'
                }`}
              >
                {isLoading ? 'Submitting Payment...' : 'Submit Payment'}
              </button>
              
              {!isFormValid() && !isLoading && (
                <p className="text-green-400/60 text-sm mt-2 text-center">
                  Please fill in all required fields to submit payment
                </p>
              )}
            </div>

          </div>
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
};

export default PaymentComponent;