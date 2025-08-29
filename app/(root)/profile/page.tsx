'use client';

import { User, Mail, Shield, Save, Upload, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { updateProfile } from 'firebase/auth';
import { auth } from '@/firebase/client';
import { toast } from 'sonner';

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState<{uid: string; email: string; name: string; photoURL?: string} | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const response = await fetch('/api/auth/current-user');
      if (response.ok) {
        const user = await response.json();
        setCurrentUser(user);
        
        // Split name into first and last name
        const nameParts = user.name?.split(' ') || [''];
        setFirstName(nameParts[0] || '');
        setLastName(nameParts.slice(1).join(' ') || '');
        
        // Set profile image if exists
        if (user.photoURL) {
          setProfileImage(user.photoURL);
        }
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }

      setImageFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSave = async () => {
    if (!currentUser) return;
    
    setIsUpdating(true);
    try {
      const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
      
      let photoURL = profileImage;
      
      // If there's a new image file, convert to base64 for storage
      if (imageFile) {
        photoURL = profileImage; // This is already the base64 string from the FileReader
      }

      // Update user profile in the database
      const response = await fetch('/api/auth/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: currentUser.uid,
          displayName: fullName,
          photoURL: photoURL
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      // Update Firebase profile
      const user = auth.currentUser;
      if (user) {
        await updateProfile(user, {
          displayName: fullName,
          photoURL: photoURL || undefined
        });
      }

      // Force refresh of current user data
      await getCurrentUser();

      // Trigger a refresh in the navigation
      window.dispatchEvent(new CustomEvent('profileUpdated'));

      toast.success('Profile updated successfully!');

      // Force page refresh after a short delay to ensure changes are reflected
      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Profile
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
          Manage your account information and preferences
        </p>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800/50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
              
              <div className="space-y-6">
                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                {/* Email (Read-only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={currentUser?.email || ''}
                    disabled
                    className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    disabled={isUpdating}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {isUpdating ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Picture Section */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Profile Picture</h3>
              
              <div className="flex flex-col items-center space-y-4">
                {/* Profile Image Display */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
                    {profileImage ? (
                      <img 
                        src={profileImage} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-16 h-16 text-gray-400" />
                    )}
                  </div>
                  
                  {/* Remove Image Button */}
                  {profileImage && (
                    <button
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  )}
                </div>

                {/* Upload Button */}
                <div className="w-full">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Photo
                  </button>
                </div>

                <p className="text-xs text-gray-400 text-center">
                  Supported formats: JPG, PNG, GIF<br />
                  Max size: 5MB
                </p>
              </div>
            </div>

            {/* Account Security */}
            <div className="bg-gray-800/50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">
                <Shield className="w-5 h-5 inline mr-2" />
                Account Security
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <div>
                    <p className="text-white font-medium">Password</p>
                    <p className="text-sm text-gray-400">Last updated 30 days ago</p>
                  </div>
                  <button className="text-blue-400 hover:text-blue-300 text-sm">
                    Change
                  </button>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <div>
                    <p className="text-white font-medium">Two-Factor Auth</p>
                    <p className="text-sm text-gray-400">Not enabled</p>
                  </div>
                  <button className="text-blue-400 hover:text-blue-300 text-sm">
                    Enable
                  </button>
                </div>
                
                <div className="flex justify-between items-center py-3">
                  <div>
                    <p className="text-white font-medium">Login Sessions</p>
                    <p className="text-sm text-gray-400">Manage active sessions</p>
                  </div>
                  <button className="text-blue-400 hover:text-blue-300 text-sm">
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
