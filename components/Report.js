import React from 'react';
import HabitReport from './HabitReport';

const Report = ({ reportData }) => {
    // Check if reportData exists and has the necessary structure
    if (
        !reportData ||
        !reportData.report ||
        !reportData.report.overallProgress ||
        !reportData.report.habits ||
        !reportData.report.summary
    ) {
        console.log(reportData)
        return <h1 className="text-red-500 text-xl font-bold">Error: Report data is not available or incorrect.</h1>;
    }

    const overall = reportData.report.overallProgress;
    const habitReport = reportData.report.habits;
    const summary = reportData.report.summary;

    return (
        <div className="reasons">
            <h1 className="text-2xl font-bold">Report of Habits</h1>
            <div className="bg-black border border-borderColor p-4 rounded-md">
                <div className="overallprogress border-b mt-2 pb-4 mb-6">
                    <h1 className="text-2xl font-bold mb-3">Overall Progress</h1>
                    <div className="p-3 space-y-2">
                        <p>{overall.trend}</p>
                        <h2 className="font-semibold text-lg">Highlights :</h2>
                        <div className="ml-3">
                            <p className="font-semibold">
                                Best day: <span className="text-textColor font-normal">{overall.highlights.bestDay}</span>
                            </p>
                            <p className="font-semibold">
                                Lowest day: <span className="text-textColor font-normal">{overall.highlights.lowestDay}</span>
                            </p>
                        </div>
                        <p className="font-semibold text-lg">
                            Note: <span className="text-textColor text-base font-normal">{overall.note}</span>
                        </p>
                    </div>
                </div>

                <div className="habits-report mb-6 border-b pb-4">
                    <h1 className="text-2xl font-bold mb-3">Habits Analysis</h1>
                    <div className="p-3 flex flex-col gap-4">
                        {habitReport.map((habit, index) => (
                            <HabitReport key={index} habit={habit} />
                        ))}
                    </div>
                </div>

                <div className="summary-section">
                    <h1 className="text-2xl font-bold text-white mb-4">Summary</h1>

                    <div className="mb-6 ml-4">
                        <h2 className="text-xl font-semibold text-gray-300 mb-2">Observations:</h2>
                        <ol className="list-decimal list-inside pl-6 text-gray-400 space-y-2">
                            {summary.observations.map((item, index) => (
                                <li key={index} className="text-base">{item}</li>
                            ))}
                        </ol>
                    </div>

                    <div className="ml-4">
                        <h2 className="text-xl font-semibold text-gray-300 mb-2">Recommendations:</h2>
                        <ol className="list-decimal list-inside pl-6 text-gray-400 space-y-2">
                            {summary.recommendations.map((item, index) => (
                                <li key={index} className="text-base">{item}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Report;
