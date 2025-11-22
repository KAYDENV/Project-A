import React, { useState, useEffect } from 'react';

function Profile({ user, account, setUser }) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        address: '',
        phone: '',
        bloodType: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                username: user.username || '',
                address: user.address || '',
                phone: user.phone || '',
                bloodType: user.bloodType || ''
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setUser({ ...user, ...formData });
        setIsEditing(false);
    };

    return (
        <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 shadow-xl">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-4xl shadow-lg">
                            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-white">{user?.name || 'User'}</h2>
                            <p className="text-blue-400 font-medium text-lg">@{user?.username || 'guest'}</p>
                            <p className="text-slate-400">{user?.email || 'No email provided'}</p>
                        </div>
                    </div>
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm font-medium"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>

                <div className="space-y-6">
                    {/* Wallet Section */}
                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                        <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">Wallet Connection</h3>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-slate-300 font-mono text-sm">{account}</span>
                            </div>
                        </div>
                    </div>

                    {/* Personal Details Section */}
                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                        <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">Personal Details</h3>

                        <div className="grid gap-6">
                            {/* Name (Always Read-Only in Edit Mode) */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    disabled
                                    className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-400 cursor-not-allowed"
                                />
                                {isEditing && <p className="text-xs text-slate-500 mt-1">Name cannot be changed.</p>}
                            </div>

                            {/* Blood Type (Read-Only if already set) */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Blood Type</label>
                                {isEditing ? (
                                    <select
                                        name="bloodType"
                                        value={formData.bloodType}
                                        onChange={handleInputChange}
                                        disabled={!!user?.bloodType}
                                        className={`w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors ${!!user?.bloodType ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        <option value="">Select Blood Type</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>
                                ) : (
                                    <div className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white min-h-[42px] flex items-center">
                                        {formData.bloodType || 'Not set'}
                                    </div>
                                )}
                                {isEditing && !!user?.bloodType && <p className="text-xs text-slate-500 mt-1">Blood type cannot be changed once set.</p>}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Phone Number</label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                ) : (
                                    <div className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white min-h-[42px] flex items-center">
                                        {formData.phone || 'Not set'}
                                    </div>
                                )}
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Address</label>
                                {isEditing ? (
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        rows="3"
                                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                                        placeholder="Enter your full address"
                                    />
                                ) : (
                                    <div className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white min-h-[84px] flex items-start pt-2 whitespace-pre-wrap">
                                        {formData.address || 'Not set'}
                                    </div>
                                )}
                            </div>
                        </div>

                        {isEditing && (
                            <div className="flex justify-end space-x-4 mt-8">
                                <button
                                    onClick={() => {
                                        setIsEditing(false);
                                        setFormData({
                                            name: user.name || '',
                                            email: user.email || '',
                                            username: user.username || '',
                                            address: user.address || '',
                                            phone: user.phone || '',
                                            bloodType: user.bloodType || ''
                                        });
                                    }}
                                    className="px-6 py-2 text-slate-400 hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-blue-600/20"
                                >
                                    Save Changes
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
