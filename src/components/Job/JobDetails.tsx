"use client";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../utils/api";

interface JobDetails {
  annualSalary?: { currency?: string; min?: number; max?: number };
  candidateIndustry?: string;
  companyDetails?: {
    established?: number;
    image?: string;
    locatedAt?: string;
    name?: string;
    sector?: string;
  };
  companyIndustry?: string;
  department?: string;
  designation?: string;
  diversityHiring?: {
    differentlyAbled?: boolean;
    exDefence?: boolean;
    women?: boolean;
    womenReturning?: boolean;
  };
  educationQualification?: string;
  employmentType?: string;
  jobDescription?: string;
  keySkills?: string[];
  location?: string[];
  roleCategory?: string;
  skills?: string[];
  vacancy?: number;
  willingToRelocate?: boolean;
  workExperience?: { min?: number; max?: number };
  workMode?: string;
}

export default function JobDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<JobDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showResumePopup, setShowResumePopup] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/job/get/${id}`);
        setJob(res.data.job);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load job");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = () => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      alert("Please login first");
      return;
    }

    const user = JSON.parse(userStr);
    if (!user.resume) {
      setShowResumePopup(true);
      return;
    }

    // ✅ Proceed with apply (replace with API call later)
    alert("Application submitted successfully!");
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!job) return <p className="text-center mt-10">No job found</p>;

  return (
    <div className="p-4 max-w-md mx-auto mb-24">
      {/* Company Info */}
      <button onClick={() => history.back()} className="px-5 py-1.5 bg-primary text-white rounded-lg font-semibold">Back</button>
      <div className="bg-white rounded-2xl shadow-md p-4 mb-4">
        <div className="flex items-center gap-3">
          {job.companyDetails?.image ? (
            <img
              src={job.companyDetails?.image}
              alt={job.companyDetails?.name ?? "Company Logo"}
              className="w-14 h-14 rounded-lg object-cover"
            />
          ) : (
            <div className="w-14 h-14 rounded-lg bg-primary text-white font-bold flex items-center justify-center text-xl">
              {job.companyDetails?.name?.[0]}
            </div>
          )}
          <div>
            <h2 className="text-lg font-semibold">
              {job.companyDetails?.name ?? "Unknown"}
            </h2>
            <p className="text-sm text-gray-500">
              {job.companyDetails?.locatedAt ?? "Unknown"} •{" "}
              {job.companyDetails?.sector ?? "Unknown"}
            </p>
            <p className="text-xs text-gray-400">
              Est. {job.companyDetails?.established ?? "Unknown"}
            </p>
          </div>
        </div>
      </div>

      {/* Job Info */}
      <div className="bg-white rounded-2xl shadow-md p-4 mb-4">
        <h3 className="text-lg font-bold mb-2">
          {job.designation ?? "Unknown"}
        </h3>
        <p className="text-gray-600 text-sm mb-1">
          {job.department ?? "Unknown"}
        </p>
        <p className="text-gray-600 text-sm mb-1">
          {job.employmentType ?? "Unknown"} • {job.workMode ?? "Unknown"}
        </p>
        <p className="text-gray-600 text-sm mb-1">
          {job.location?.length ? job.location.join(", ") : "Unknown"}{" "}
          {job.willingToRelocate ? "(Relocation OK)" : ""}
        </p>
        <p className="text-gray-800 text-base font-semibold mt-2">
          {job.annualSalary?.currency ?? ""}{" "}
          {job.annualSalary?.min ?? "Unknown"} -{" "}
          {job.annualSalary?.max ?? "Unknown"}
        </p>
        <p className="text-sm text-gray-500">
          Exp: {job.workExperience?.min ?? "Unknown"}-
          {job.workExperience?.max ?? "Unknown"} yrs
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Vacancies: {job.vacancy ?? "Unknown"}
        </p>
      </div>

      {/* Job Description */}
      <div className="bg-white rounded-2xl shadow-md p-4 mb-4">
        <h3 className="font-semibold mb-1">Job Description</h3>
        <p className="text-sm text-gray-600">
          {job.jobDescription ?? "Unknown"}
        </p>
      </div>

      {/* Skills */}
      <div className="bg-white rounded-2xl shadow-md p-4 mb-4">
        <h3 className="font-semibold mb-2">Skills Required</h3>
        <div className="flex flex-wrap gap-2">
          {job.keySkills?.length || job.skills?.length ? (
            job.keySkills?.concat(job.skills ?? []).map((skill, i) => (
              <span
                key={i}
                className="bg-gray-100 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-sm text-gray-500">Unknown</p>
          )}
        </div>
      </div>

      {/* Diversity Hiring */}
      <div className="bg-white rounded-2xl shadow-md p-4 mb-4">
        <h3 className="font-semibold mb-2">Diversity Hiring</h3>
        <ul className="text-sm text-gray-600 list-disc list-inside">
          {job.diversityHiring?.women && <li>Women Candidates</li>}
          {job.diversityHiring?.womenReturning && (
            <li>Women Returning to Workforce</li>
          )}
          {job.diversityHiring?.differentlyAbled && <li>Differently Abled</li>}
          {job.diversityHiring?.exDefence && <li>Ex-Defence Personnel</li>}
          {!job.diversityHiring?.women &&
            !job.diversityHiring?.womenReturning &&
            !job.diversityHiring?.differentlyAbled &&
            !job.diversityHiring?.exDefence && <li>Unknown</li>}
        </ul>
      </div>

      {/* Education */}
      <div className="bg-white rounded-2xl shadow-md p-4 mb-8">
        <h3 className="font-semibold mb-1">Education</h3>
        <p className="text-sm text-gray-600">
          {job.educationQualification ?? "Unknown"}
        </p>
      </div>

      {/* Apply Now Button */}
      <button
        onClick={handleApply}
        className="bg-primary text-white font-semibold py-3 rounded-xl shadow-lg w-full transition"
      >
        Apply Now
      </button>

      {/* Resume Missing Popup */}
      {showResumePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 bg-opacity-50 z-50 px-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-3">Resume Required</h2>
            <p className="text-sm text-gray-600 mb-6">
              No Resume has been added. Please contact admins to add your resume.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowResumePopup(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowResumePopup(false);
                  window.location.href = "https://job-three-ashen.vercel.app/contact";
                }}
                className="px-4 py-2 rounded-lg bg-primary text-white transition"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
