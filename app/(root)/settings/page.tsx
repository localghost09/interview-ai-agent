"use client";

import { Bell, Shield, Eye, Palette, User, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { updateProfile } from 'firebase/auth';
import { auth } from '@/firebase/client';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [interviewReminders, setInterviewReminders] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [mounted, setMounted] = useState(false);
  
  // Profile states
  const [currentUser, setCurrentUser] = useState<{uid: string; email: string; name: string} | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // Load settings from localStorage on component mount
  useEffect(() => {
    setMounted(true);
    const savedEmailNotifications = localStorage.getItem('emailNotifications');
    const savedInterviewReminders = localStorage.getItem('interviewReminders');
    const savedMarketingEmails = localStorage.getItem('marketingEmails');
    const savedAutoSave = localStorage.getItem('autoSave');

    if (savedEmailNotifications !== null) setEmailNotifications(JSON.parse(savedEmailNotifications));
    if (savedInterviewReminders !== null) setInterviewReminders(JSON.parse(savedInterviewReminders));
    if (savedMarketingEmails !== null) setMarketingEmails(JSON.parse(savedMarketingEmails));
    if (savedAutoSave !== null) setAutoSave(JSON.parse(savedAutoSave));

    // Load current user
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const response = await fetch('/api/auth/current-user');
      if (response.ok) {
        const user = await response.json();
        setCurrentUser(user);
        setDisplayName(user.name);
      }
    } catch (error) {
      console.error('Error getting current user:', error);
    }
  };

  const handleProfileUpdate = async () => {
    if (!displayName.trim()) {
      toast.error('Please enter a valid name');
      return;
    }

    setIsUpdatingProfile(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        toast.error('No user logged in');
        return;
      }

      await updateProfile(user, {
        displayName: displayName.trim()
      });

      // Update the current user state
      if (currentUser) {
        setCurrentUser({ ...currentUser, name: displayName.trim() });
      }

      toast.success('Profile updated successfully! Please refresh the page to see changes.');
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleToggle = (setter: (value: boolean) => void, currentValue: boolean, storageKey: string) => {
    const newValue = !currentValue;
    setter(newValue);
    localStorage.setItem(storageKey, JSON.stringify(newValue));
  };

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }
  return (
    <>
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white dark:text-white text-gray-900 mb-4">
          Settings
        </h1>
        <p className="text-xl text-gray-300 dark:text-gray-300 text-gray-600 leading-relaxed max-w-3xl mx-auto">
          Customize your AI MockPrep experience
        </p>
      </div>

      {/* Settings Content */}
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Settings */}
        <div className="bg-gray-800/50 dark:bg-gray-800/50 bg-white/90 border dark:border-transparent border-gray-200 rounded-2xl p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-bold text-white dark:text-white text-gray-900">Profile</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-white dark:text-white text-gray-900 font-medium">Display Name</h3>
                <p className="text-gray-400 dark:text-gray-400 text-gray-600 text-sm">This will be shown in your profile and navigation</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your full name"
                className="flex-1 bg-gray-700 dark:bg-gray-700 bg-gray-100 text-white dark:text-white text-gray-900 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleProfileUpdate}
                disabled={isUpdatingProfile || !displayName.trim()}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Save className="w-4 h-4" />
                {isUpdatingProfile ? 'Updating...' : 'Update'}
              </button>
            </div>
            
            {currentUser && (
              <div className="text-sm text-gray-400 dark:text-gray-400 text-gray-600">
                Current email: {currentUser.email}
              </div>
            )}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-gray-800/50 dark:bg-gray-800/50 bg-white/90 border dark:border-transparent border-gray-200 rounded-2xl p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white dark:text-white text-gray-900">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white dark:text-white text-gray-900 font-medium">Email Notifications</h3>
                <p className="text-gray-400 dark:text-gray-400 text-gray-600 text-sm">Receive interview reminders and updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={emailNotifications}
                  onChange={() => handleToggle(setEmailNotifications, emailNotifications, 'emailNotifications')}
                />
                <div className="w-11 h-6 bg-gray-600 dark:bg-gray-600 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Interview Reminders</h3>
                <p className="text-gray-400 text-sm">Get notified before scheduled interviews</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={interviewReminders}
                  onChange={() => handleToggle(setInterviewReminders, interviewReminders, 'interviewReminders')}
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Marketing Emails</h3>
                <p className="text-gray-400 text-sm">Receive updates about new features and tips</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={marketingEmails}
                  onChange={() => handleToggle(setMarketingEmails, marketingEmails, 'marketingEmails')}
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-gray-800/50 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-bold text-white">Privacy & Security</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-medium mb-3">Change Password</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="password"
                  placeholder="Current Password"
                  className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>
              <button className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                Update Password
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Two-Factor Authentication</h3>
                <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                Enable 2FA
              </button>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-gray-800/50 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">Appearance</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white dark:text-white text-gray-900 font-medium">Dark Mode</h3>
                <p className="text-gray-400 dark:text-gray-400 text-gray-600 text-sm">Use dark theme across the application</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={theme === 'dark'}
                  onChange={handleThemeToggle}
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div>
              <h3 className="text-white font-medium mb-3">Language</h3>
              <select className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
          </div>
        </div>

        {/* Interview Preferences */}
        <div className="bg-gray-800/50 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Eye className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">Interview Preferences</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-white font-medium mb-3">Default Interview Duration</h3>
              <select className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500">
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>45 minutes</option>
                <option>60 minutes</option>
              </select>
            </div>
            
            <div>
              <h3 className="text-white font-medium mb-3">Difficulty Level</h3>
              <select className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Expert</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Auto-save Interview Progress</h3>
                <p className="text-gray-400 text-sm">Automatically save your progress during interviews</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={autoSave}
                  onChange={() => handleToggle(setAutoSave, autoSave, 'autoSave')}
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-red-900/20 border border-red-500/20 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-red-400 mb-6">Danger Zone</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Delete Account</h3>
                <p className="text-gray-400 text-sm">Permanently delete your account and all data</p>
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex gap-4 justify-end">
          <button className="border border-gray-600 text-gray-300 hover:bg-gray-700 px-6 py-3 rounded-lg font-medium transition-colors">
            Cancel
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Save All Settings
          </button>
        </div>
      </div>
    </>
  );
}
