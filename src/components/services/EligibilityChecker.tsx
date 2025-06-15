
import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const questions = [
  { id: "vendorCert", label: "Do you have a street vendor certificate?" },
  { id: "loanBefore", label: "Have you availed a loan before?" },
  { id: "aadhar", label: "Are you Aadhaar-linked?" }
];

type Answers = Record<string, string>;

export const EligibilityChecker: React.FC = () => {
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const isEligible =
    answers.vendorCert === "yes" && answers.aadhar === "yes";

  const uninformed = questions.some(q => !answers[q.id]);

  return (
    <Card className="bg-slate-800/70 border-cyan-400/10 rounded-xl shadow">
      <CardContent className="p-6">
        <CardTitle className="mb-2 text-white">
          <span className="mr-2" role="img">📋</span>Eligibility Checker
        </CardTitle>
        <form
          className="space-y-4"
          onSubmit={e => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          {questions.map(q => (
            <div key={q.id}>
              <label className="block mb-2 text-slate-200 font-medium">{q.label}</label>
              <RadioGroup
                className="flex gap-8"
                value={answers[q.id] || ""}
                onValueChange={val => handleChange(q.id, val)}
              >
                <RadioGroupItem value="yes" id={q.id + "-yes"} />
                <label htmlFor={q.id + "-yes"} className="text-green-300 ml-2 mr-6 cursor-pointer">Yes</label>
                <RadioGroupItem value="no" id={q.id + "-no"} />
                <label htmlFor={q.id + "-no"} className="text-red-300 ml-2 cursor-pointer">No</label>
              </RadioGroup>
            </div>
          ))}
          <Button
            type="submit"
            className="mt-2 bg-green-500 hover:bg-green-400 transition"
            disabled={uninformed}
          >
            Check Eligibility
          </Button>
        </form>
        {submitted && (
          <div className="mt-4">
            {isEligible ? (
              <Badge className="bg-green-700 text-green-100 text-lg" variant="secondary">
                ✅ Eligible!
              </Badge>
            ) : (
              <Badge className="bg-yellow-700 text-yellow-200 text-lg" variant="destructive">
                ⚠️ May Not Qualify – Fix These
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

