"use client";
import { Upload, FileText, Star, Briefcase, Download, Eye } from "lucide-react";
import { useState } from "react";

export default function ResumePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [desiredRole, setDesiredRole] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleGenerateResume = async () => {
    if (!selectedFile && !desiredRole) {
      alert("Please upload a resume or enter a desired role");
      return;
    }
    
    setIsGenerating(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsGenerating(false);
      alert("Resume generated successfully!");
    }, 3000);
  };

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-purple-600/20 text-purple-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              beta
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Resume Builder
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Create an ATS-friendly resume instantly with our AI-powered resume builder. 
              Tailor your resume to the role with a single click.
            </p>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="bg-gray-800/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {/* Step 1 */}
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-600 text-white rounded-full font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="text-white font-semibold">Upload Resume</h3>
                <p className="text-gray-400 text-sm">or start from scratch</p>
              </div>
            </div>

            <div className="hidden md:block text-gray-600">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-600 text-white rounded-full font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="text-gray-300 font-semibold">Edit Resume</h3>
                <p className="text-gray-400 text-sm">AI-powered optimization</p>
              </div>
            </div>

            <div className="hidden md:block text-gray-600">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-600 text-white rounded-full font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="text-gray-300 font-semibold">Resume Download</h3>
                <p className="text-gray-400 text-sm">ATS-friendly format</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Upload and Role Section - Side by Side */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Upload Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Upload Resume</h2>
              <p className="text-gray-400">Upload your existing resume to get started</p>
            </div>

            <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-purple-500 transition-colors">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">
                {selectedFile ? selectedFile.name : "Drag & drop your resume or click to browse"}
              </p>
              <p className="text-gray-500 text-sm mb-4">Supported formats: PDF, DOC, DOCX</p>
              <label className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer inline-block">
                {selectedFile ? "Change File" : "Upload Resume"}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Desired Role Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Desired Role</h2>
              <p className="text-gray-400">Enter the job title you&apos;re targeting</p>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="e.g., Software Engineer, Product Manager, Data Scientist"
                value={desiredRole}
                onChange={(e) => setDesiredRole(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
              
              <div className="text-sm text-gray-400">
                <p className="mb-2">Popular roles:</p>
                <div className="flex flex-wrap gap-2">
                  {["Software Engineer", "Product Manager", "Data Scientist", "UX Designer", "Marketing Manager"].map((role) => (
                    <button
                      key={role}
                      onClick={() => setDesiredRole(role)}
                      className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-full text-xs transition-colors"
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Templates Section - Full Width Row */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Choose Your Template</h2>
            <p className="text-gray-400">Select from our professionally designed, ATS-friendly templates</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Template 1 - Angel Taylor */}
            <div 
              className={`bg-gray-800 rounded-xl p-4 transition-all cursor-pointer ${
                selectedTemplate === 'template1' ? 'ring-2 ring-purple-500 bg-gray-700' : 'hover:bg-gray-700'
              }`}
              onClick={() => setSelectedTemplate('template1')}
            >
              <div className="bg-white rounded-lg p-4 mb-4 aspect-[3/4] overflow-hidden">
                <div className="text-black text-xs leading-tight">
                  <div className="font-bold text-sm mb-1">ANGEL TAYLOR</div>
                  <div className="text-blue-600 font-medium mb-2 text-xs">UX DESIGNER</div>
                  <div className="text-xs mb-2 opacity-70">123 Anywhere St., Any City</div>
                  
                  <div className="mb-2">
                    <div className="font-bold text-xs mb-1">SUMMARY</div>
                    <div className="text-xs leading-relaxed opacity-80">
                      UX Designer with focus on delivering impactful results...
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <div className="font-bold text-xs mb-1">SKILLS</div>
                    <div className="grid grid-cols-2 gap-1 text-xs opacity-80">
                      <div>• Prototyping</div>
                      <div>• Visual Design</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-white font-medium mb-1">Modern Template</h3>
                <p className="text-gray-400 text-sm">Clean and professional</p>
              </div>
            </div>

            {/* Template 2 - Jwalant Patel */}
            <div 
              className={`bg-gray-800 rounded-xl p-4 transition-all cursor-pointer ${
                selectedTemplate === 'template2' ? 'ring-2 ring-purple-500 bg-gray-700' : 'hover:bg-gray-700'
              }`}
              onClick={() => setSelectedTemplate('template2')}
            >
              <div className="bg-white rounded-lg p-4 mb-4 aspect-[3/4] overflow-hidden">
                <div className="text-black text-xs leading-tight">
                  <div className="font-bold text-sm mb-1">JWALANT PATEL</div>
                  <div className="text-green-600 font-medium mb-2 text-xs">SOFTWARE ENGINEER</div>
                  <div className="text-xs mb-2 opacity-70">456 Tech Ave, Silicon Valley</div>
                  
                  <div className="mb-2">
                    <div className="font-bold text-xs mb-1">EXPERIENCE</div>
                    <div className="text-xs leading-relaxed opacity-80">
                      Senior Developer at Tech Corp...
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <div className="font-bold text-xs mb-1">TECHNOLOGIES</div>
                    <div className="grid grid-cols-2 gap-1 text-xs opacity-80">
                      <div>• React.js</div>
                      <div>• Node.js</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-white font-medium mb-1">Technical Template</h3>
                <p className="text-gray-400 text-sm">Perfect for developers</p>
              </div>
            </div>

            {/* Template 3 - Kevin Smith */}
            <div 
              className={`bg-gray-800 rounded-xl p-4 transition-all cursor-pointer ${
                selectedTemplate === 'template3' ? 'ring-2 ring-purple-500 bg-gray-700' : 'hover:bg-gray-700'
              }`}
              onClick={() => setSelectedTemplate('template3')}
            >
              <div className="bg-white rounded-lg p-4 mb-4 aspect-[3/4] overflow-hidden">
                <div className="text-black text-xs leading-tight">
                  <div className="font-bold text-sm mb-1">KEVIN SMITH</div>
                  <div className="text-purple-600 font-medium mb-2 text-xs">PRODUCT MANAGER</div>
                  <div className="text-xs mb-2 opacity-70">789 Business St, New York</div>
                  
                  <div className="mb-2">
                    <div className="font-bold text-xs mb-1">ACHIEVEMENTS</div>
                    <div className="text-xs leading-relaxed opacity-80">
                      Led product strategy for 50M+ users...
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <div className="font-bold text-xs mb-1">EXPERTISE</div>
                    <div className="grid grid-cols-2 gap-1 text-xs opacity-80">
                      <div>• Strategy</div>
                      <div>• Analytics</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-white font-medium mb-1">Executive Template</h3>
                <p className="text-gray-400 text-sm">Business focused</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <button
              onClick={handleGenerateResume}
              disabled={isGenerating || (!selectedFile && !desiredRole)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 text-white px-8 py-3 rounded-lg font-medium transition-all flex items-center gap-2 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Generating Resume...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  Generate Resume
                </>
              )}
            </button>
            
            <button className="border border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white px-8 py-3 rounded-lg font-medium transition-all flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Preview Template
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-semibold mb-2">ATS-Friendly</h3>
            <p className="text-gray-400 text-sm">Optimized to pass Applicant Tracking Systems</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-semibold mb-2">Role-Specific</h3>
            <p className="text-gray-400 text-sm">Tailored content based on your target role</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Download className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-semibold mb-2">Instant Download</h3>
            <p className="text-gray-400 text-sm">Get your resume in PDF format immediately</p>
          </div>
        </div>
      </div>
    </>
  );
}
