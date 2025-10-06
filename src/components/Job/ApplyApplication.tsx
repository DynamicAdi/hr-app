import React, { useState, useTransition } from 'react';
import { MapPin, Briefcase, Code, Star, Image, Upload, X } from 'lucide-react';
import { api } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { Alert } from '../../pages/Rigester';

export default function JobApplicationForm({title, jobId, Close}) {
  const {user} = useAuth()
  const [pop, setPop] = useState(false)
  const [popMsg, setPopMsg] = useState("")
  const [transition, startTransition] = useTransition()

  const [formData, setFormData] = useState({
    job: jobId,
    userLocation: '',
    yearOfExperience: '0',
    skills: '',
    rating: 5,
    userProfileImage: null,
    resume: null,
    appliedBy: user._id
  });

  const [profilePreview, setProfilePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRating = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, [type]: file }));
      
      if (type === 'profileImage') {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfilePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const removeFile = (type) => {
    setFormData(prev => ({ ...prev, [type]: null }));
    if (type === 'profileImage') {
      setProfilePreview(null);
    }
  };

  const handleSubmit = () => startTransition(async () => {
    if (!formData.appliedBy || !formData.yearOfExperience || !formData.userLocation || !formData.skills || !formData.resume ) {
      setPop(true)
      setPopMsg("Please Full All required Fields")
      return
    }

    const fetch = await api.post(`/user/applications/apply-for-job/${jobId}`, formData, {
      headers: {'Content-Type': 'multipart/form-data'}, 
    });
    
    if (fetch.status === 201) {
      setPop(true)
      setPopMsg("Applied Successfully!")
      Close(false);
    }
    else if (fetch.status === 409) {
      setPop(true)
      setPopMsg("You Have Already Applied For This Job")
    }
    else {
      setPop(true)
      setPopMsg("Something went wrong, please try again later")
    }
    
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-28 mb-12 absolute inset-0 w-screen">
      {pop && 
      <div className="fixed bottom-0 w-screen h-screen ">
      <Alert Close={setPop} message={popMsg} />
      </div>
      }
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">Apply for {title}</h1>
          <button className="text-gray-500 p-2" onClick={() => Close(false)}>
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Form Container */}
      <div className="p-4 space-y-5">
        
        {/* Current Location */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            <MapPin size={16} className="mr-2 text-orange-500" />
            Current Location <span className='text-red-400'>{" "}*</span>
          </label>
          <input
            type="text"
            name="userLocation"
            value={formData.userLocation}
            onChange={handleInputChange}
            placeholder="e.g., Nashik, Maharashtra, India"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-base"
          />
        </div>

        {/* Years of Experience */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            <Briefcase size={16} className="mr-2 text-purple-500" />
            Years of Professional Experience <span className='text-red-400'>{" "} *</span>
          </label>
          <input
            type="number"
            name="yearOfExperience"
            value={formData.yearOfExperience}
            onChange={handleInputChange}
            min="0"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-base"
          />
        </div>

        {/* Key Skills */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            <Code size={16} className="mr-2 text-blue-500" />
            Key Skills (Comma Separated) <span className='text-red-400'>{" "} *</span>
          </label>
          <textarea
            name="skills"
            value={formData.skills}
            onChange={handleInputChange}
            placeholder="e.g., JavaScript, React, Node.js, MongoDB"
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base resize-none"
          />
        </div>

        {/* Rating */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            <Star size={16} className="mr-2 text-yellow-500" />
            Rating (1-5)
          </label>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-semibold text-gray-900 mr-2">
              {formData.rating}/5
            </span>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRating(star)}
                  className="focus:outline-none transition-transform active:scale-95"
                >
                  <Star
                    size={32}
                    className={star <= formData.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Image */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            <Image size={16} className="mr-2 text-orange-500" />
            Profile Image
          </label>
          
          {profilePreview ? (
            <div className="relative">
              <img
                src={profilePreview}
                alt="Profile preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeFile('userProfileImage')}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 transition-colors">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                <Image size={32} className="text-orange-500" />
              </div>
              <p className="text-base font-medium text-gray-900 mb-1">Click to upload profile image</p>
              <p className="text-sm text-gray-500">(.JPG, PNG, GIF - Max 2MB recommended)</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'userProfileImage')}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Resume/CV */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            <Upload size={16} className="mr-2 text-orange-500" />
            Resume / CV <span className='text-red-400'>*</span>
          </label>
          
          {formData.resume ? (
            <div className="border border-gray-300 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Upload size={20} className="text-orange-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{formData.resume.name}</p>
                  <p className="text-xs text-gray-500">
                    {(formData.resume.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile('resume')}
                className="text-red-500 p-2"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 transition-colors">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                <Upload size={32} className="text-orange-500" />
              </div>
              <p className="text-base font-medium text-gray-900 mb-1">Click to upload (PDF or DOCX)</p>
              <p className="text-sm text-gray-500">(Max 5MB file, PDF or DOCX only)</p>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e, 'resume')}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={transition}
          className="w-full mb-16 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 rounded-lg shadow-lg font-sans active:scale-98 transition-all text-base"
        >
          {transition ? "Applying..." : "Submit Application"}
        </button>
      </div>
    </div>
  );
}