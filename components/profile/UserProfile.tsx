import React, { useState } from 'react';

interface UserProfileProps {
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    if (newPassword.length < 8) {
        setMessage({ type: 'error', text: 'Password must be at least 8 characters long.' });
        return;
    }

    // Simulate API call
    console.log('Updating password...');
    setTimeout(() => {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-sans p-4">
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-slate-800">My Profile</h1>
            <button onClick={onClose} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                &larr; Back to Home
            </button>
        </div>

        {/* User Info Section */}
        <div className="space-y-4 mb-8">
            <div>
                <label className="text-sm font-medium text-slate-600">Full Name</label>
                <p className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg mt-1">John Doe</p>
            </div>
             <div>
                <label className="text-sm font-medium text-slate-600">Email Address</label>
                <p className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg mt-1">john.doe@example.com</p>
            </div>
        </div>

        <hr className="my-6 border-slate-200"/>

        {/* Update Password Section */}
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Update Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="current-password" className="text-sm font-medium text-slate-600">Current Password</label>
                <input
                    id="current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition mt-1"
                    placeholder="Enter your current password"
                />
            </div>
             <div>
                <label htmlFor="new-password" className="text-sm font-medium text-slate-600">New Password</label>
                <input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition mt-1"
                    placeholder="Enter a new password"
                />
            </div>
             <div>
                <label htmlFor="confirm-password" className="text-sm font-medium text-slate-600">Confirm New Password</label>
                <input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition mt-1"
                    placeholder="Confirm your new password"
                />
            </div>

            {message && (
              <div className={`text-sm text-center py-2 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message.text}
              </div>
            )}

            <button
                type="submit"
                className="w-full !mt-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 uppercase tracking-wider transition-transform hover:scale-105"
            >
                Save Changes
            </button>
        </form>

      </div>
    </div>
  );
};

export default UserProfile;