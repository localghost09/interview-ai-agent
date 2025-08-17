import { Metadata } from "next";
import { User, Mail, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Profile | AI MockPrep",
  description: "Manage your AI MockPrep profile and account information",
};

export default function ProfilePage() {
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
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-gray-300 cursor-not-allowed"
                    placeholder="your@email.com"
                    readOnly
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Email cannot be changed for security reasons
                  </p>
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">
                    Bio
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-vertical"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="flex gap-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Save Changes
                  </button>
                  <button className="border border-gray-600 text-gray-300 hover:bg-gray-700 px-6 py-3 rounded-lg font-medium transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            </div>

            {/* Interview Stats */}
            <div className="bg-gray-800/50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Interview Statistics</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">0</div>
                  <div className="text-gray-300">Interviews Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">0</div>
                  <div className="text-gray-300">Average Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">0</div>
                  <div className="text-gray-300">Hours Practiced</div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Sidebar */}
          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="bg-gray-800/50 rounded-2xl p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                U
              </div>
              <h3 className="text-white font-medium mb-2">Profile Picture</h3>
              <p className="text-gray-400 text-sm mb-4">
                Upload a profile picture to personalize your account
              </p>
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                Upload Image
              </button>
            </div>

            {/* Account Info */}
            <div className="bg-gray-800/50 rounded-2xl p-6">
              <h3 className="text-white font-medium mb-4">Account Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-white text-sm">Member Since</div>
                    <div className="text-gray-400 text-xs">August 2025</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="text-white text-sm">Email Verified</div>
                    <div className="text-gray-400 text-xs">Verified</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="text-white text-sm">Account Type</div>
                    <div className="text-gray-400 text-xs">Free</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
