import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SocialJoinBox from "../components/SocialJoinBox";


const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(
          `https://jobwebserver.onrender.com/api/jobs/${id}`
        );
        setJob(res.data.data?.job);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading)
    return <div className="text-center py-16">Loading job details...</div>;

  if (!job)
    return <div className="text-center py-16">Job not found</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">


        <div className="lg:col-span-2 space-y-6">


          <div className="bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {job.title}
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Department: <span className="font-medium">{job.department}</span>
            </p>
          </div>


          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">
              Job Overview
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <p><strong>Category:</strong> {job.category}</p>
              <p><strong>State:</strong> {job.state}</p>
              <p><strong>Qualification:</strong> {job.qualification}</p>
              <p><strong>Total Vacancies:</strong> {job.totalVacancies}</p>
              <p><strong>Application Mode:</strong> {job.applicationMode}</p>
              <p>
                <strong>Salary:</strong>{" "}
                {job.salary?.min && job.salary?.max
                  ? `₹${job.salary.min} – ₹${job.salary.max}`
                  : "As per rules"}
              </p>
              {job.ageLimit && (
                <p>
                  <strong>Age Limit:</strong>{" "}
                  {job.ageLimit.min} – {job.ageLimit.max} years
                </p>
              )}
            </div>
          </div>


          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">
              Important Dates
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Application Start:</strong>{" "}
                {new Date(job.applicationStartDate).toLocaleDateString()}
              </li>
              <li>
                <strong>Application End:</strong>{" "}
                {new Date(job.applicationEndDate).toLocaleDateString()}
              </li>
            </ul>
          </div>


          {job.description && (<div>


            <div className="">
           
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">
                  Official Notification Details
                </h2>

                <p className="text-sm text-gray-700 leading-relaxed">
                  <strong>{job.department}</strong> has released an official recruitment
                  notification for the post of <strong>{job.title}</strong>. A total of{" "}
                  <strong>{job.totalVacancies}</strong> vacancy/vacancies have been announced
                  under this recruitment drive.
                </p>

                <p className="text-sm text-gray-700 leading-relaxed mt-3">
                  Candidates who have completed <strong>{job.qualification}</strong> are
                  eligible to apply for this recruitment. The selection process will be
                  conducted as per the guidelines mentioned in the official notification.
                </p>

                <p className="text-sm text-gray-700 leading-relaxed mt-3">
                  The application process for <strong>{job.title}</strong> is{" "}
                  <strong>{job.applicationMode}</strong>. Interested candidates are advised to
                  submit their applications before{" "}
                  <strong>
                    {new Date(job.applicationEndDate).toLocaleDateString()}
                  </strong>.
                </p>

                <p className="text-sm text-gray-700 leading-relaxed mt-3">
                  Applicants must carefully read the official notification to understand the
                  eligibility criteria, age limit, selection process, and other important
                  instructions before applying.
                </p>

                <a
                  href={job.officialNotificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-blue-600 font-medium hover:underline"
                >
                  ➜ Click here to view the official notification
                </a>
              </div>


            </div>

            <div className="bg-white p-6 rounded-lg shadow mt-6">
              <h2 className="text-lg font-semibold mb-4">
                How to Apply for {job.title}
              </h2>

              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>
                  Visit the official website related to the <strong>{job.title}</strong>.
                </li>
                <li>
                  Open the official notification for <strong>{job.title}</strong>.
                </li>
                <li>
                  Read the instructions carefully and ensure that you meet the
                  eligibility criteria.
                </li>
                <li>
                  If eligible, gather all the required documents as mentioned in the
                  notification.
                </li>
                <li>
                  Attach the required documents along with your resume (if applicable).
                </li>
                <li>
                  Submit the application to the address or mode specified in the official
                  notification.
                </li>
              </ol>
            </div>
          </div>

          )}
        </div>





        {/* RIGHT SIDEBAR */}
        <div className="space-y-4 lg:sticky lg:top-6 h-fit">


          <div className="bg-white p-5 rounded-lg shadow border-l-4 border-blue-600">
            <h3 className="font-semibold mb-4">
              Application Links
            </h3>

            <a
              href={job.officialNotificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-gray-800 text-white py-2 rounded mb-3 hover:bg-gray-900"
            >
              View Official Notification
            </a>

            <a
              href={job.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Apply Online / Offline
            </a>
          </div>


          <div className="space-y-4 lg:sticky lg:top-6 h-fit">


            <SocialJoinBox />


          </div>


          {/* DISCLAIMER */}
          {/* <div className="bg-yellow-50 p-4 rounded text-xs text-gray-700 border border-yellow-200">
            <strong>Disclaimer:</strong>  
            We are not affiliated with any government organization.
            Applicants are advised to verify details from the official website.
          </div> */}
        </div>

      </div>
    </div>
  );
};

export default JobDetails;
