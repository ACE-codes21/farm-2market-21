
import { applications } from "@/data/services";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, X } from "lucide-react";

const statusIcons = {
  done: <Check className="h-5 w-5 text-green-400"/>,
  active: <Clock className="h-5 w-5 text-yellow-400 animate-pulse" />,
  pending: <Clock className="h-5 w-5 text-gray-200" />,
  fail: <X className="h-5 w-5 text-red-400" />
};
const statusBadges = {
  done: "bg-green-800 text-green-200",
  active: "bg-yellow-900 text-yellow-200 animate-pulse",
  pending: "bg-gray-700 text-slate-200",
  fail: "bg-red-900 text-red-200"
};

export const ApplicationTracker = () => (
  <Card className="bg-slate-800/70 border-cyan-400/10 rounded-xl shadow">
    <CardContent className="p-6">
      <CardTitle className="mb-4 text-white flex gap-2 items-center">
        <span role="img" aria-label="timeline">🚦</span>
        Application Tracker
      </CardTitle>
      <div className="flex flex-col gap-7">
        {applications.map(app => (
          <div key={app.id} className="mb-2 px-2">
            <div className="font-bold text-slate-200 mb-1">{app.type}</div>
            <ol className="flex flex-row flex-wrap gap-6 justify-start ml-2">
              {app.stages.map((stage, i) => (
                <li key={stage.label}
                  className="flex flex-col items-center">
                  <div className={`rounded-full p-2 ${statusBadges[stage.status]} shadow-md`}>
                    {statusIcons[stage.status]}
                  </div>
                  <div className="mt-2 text-xs font-semibold text-slate-200">{stage.label}</div>
                  {stage.date && (
                    <span className="text-[10px] text-slate-400">{stage.date}</span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

