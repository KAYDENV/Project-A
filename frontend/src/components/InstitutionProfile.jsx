import React, { useState } from 'react';

function InstitutionProfile({ institution, account, setInstitution }) {
    const [isEditing, setIsEditing] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [sentCode, setSentCode] = useState('');
    const [formData, setFormData] = useState({
        institutionName: institution?.institutionName || '',
        institutionId: institution?.institutionId || '',
        address: institution?.address || '',
        contactInfo: institution?.contactInfo || '',
        email: institution?.email || ''
    });
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRequestVerification = () => {
        // In real app, send verification code to email
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setSentCode(code);
        setIsVerifying(true);
        console.log(`Verification code sent to ${formData.email}: ${code}`);
        alert(`Verification code sent to ${formData.email}. For prototype, the code is: ${code}`);
    };

    const handleVerifyCode = () => {
        if (verificationCode === sentCode) {
            setIsVerifying(false);
            setIsEditing(true);
            setError('');
        } else {
            setError('Invalid verification code');
        }
    };

    const handleSaveChanges = () => {
        setInstitution({ ...institution, ...formData });
        setIsEditing(false);
        setVerificationCode('');
        setSentCode('');
    };

    const handleCancel = () => {
        setFormData({
            institutionName: institution?.institutionName || '',
            institutionId: institution?.institutionId || '',
            address: institution?.address || '',
            contactInfo: institution?.contactInfo || '',
            email: institution?.email || ''
        });
        setIsEditing(false);
        setIsVerifying(false);
        setVerificationCode('');
        setSentCode('');
        setError('');
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-white">Institution Information</h2>
                    {!isEditing && !isVerifying && (
                        <button
                            onClick={handleRequestVerification}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
                        >
                            Edit Information
                        </button>
                    )}
                </div>

                {/* Email Verification Modal */}
                {isVerifying && (
                    <div className="mb-6 p-4 bg-purple-900/20 border border-purple-700 rounded-xl">
                        <h3 className="text-lg font-semibold text-white mb-2">Email Verification Required</h3>
                        <p className="text-sm text-slate-400 mb-4">
                            A verification code has been sent to {formData.email}
                        </p>
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                placeholder="Enter 6-digit code"
                                className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-center tracking-widest focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                maxLength={6}
                            />
                            <button
                                onClick={handleVerifyCode}
                                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
                            >
                                Verify
                            </button>
                            <button
                                onClick={handleCancel}
                                className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                    </div>
                )}

                {/* Institution Information */}
                <div className="space-y-6">
                    {/* Institution Name */}
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Institution Name</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="institutionName"
                                value={formData.institutionName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                            />
                        ) : (
                            <p className="text-white text-lg">{institution?.institutionName || 'Not set'}</p>
                        )}
                    </div>

                    {/* Institution ID */}
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Institution ID</label>
                        <p className="text-white text-lg font-mono">{institution?.institutionId || 'Not set'}</p>
                        <p className="text-xs text-slate-500 mt-1">Institution ID cannot be changed</p>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
                        {isEditing ? (
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                            />
                        ) : (
                            <p className="text-white text-lg">{institution?.email || 'Not set'}</p>
                        )}
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Address</label>
                        {isEditing ? (
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
                            />
                        ) : (
                            <p className="text-white text-lg">{institution?.address || 'Not set'}</p>
                        )}
                    </div>

                    {/* Contact Info */}
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Contact Information</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="contactInfo"
                                value={formData.contactInfo}
                                onChange={handleInputChange}
                                placeholder="Phone number, fax, etc."
                                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                            />
                        ) : (
                            <p className="text-white text-lg">{institution?.contactInfo || 'Not set'}</p>
                        )}
                    </div>

                    {/* Wallet Address */}
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Wallet Address</label>
                        <p className="text-white text-lg font-mono break-all">{account}</p>
                    </div>

                    {/* Action Buttons */}
                    {isEditing && (
                        <div className="flex space-x-4 pt-4">
                            <button
                                onClick={handleSaveChanges}
                                className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={handleCancel}
                                className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default InstitutionProfile;
