import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import PercentageCard from "@/components/cards/PercentageCard";
import { 
  MapPin, Clock, Calendar, DollarSign, Award, GraduationCap, Briefcase, 
  Linkedin, Mail, Globe, X
} from "lucide-react";

interface Props {
  opportunity: any;
  onClose: () => void;
}

const OpportunityDetailPanel: React.FC<Props> = ({ opportunity, onClose }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'job':
        return <Briefcase className="w-5 h-5" />;
      case 'scholarship':
        return <Award className="w-5 h-5" />;
      case 'internship':
        return <GraduationCap className="w-5 h-5" />;
      default:
        return <Briefcase className="w-5 h-5" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const badges: Record<string, { label: string; color: string }> = {
      job: { label: 'Job', color: 'bg-blue-100 text-blue-800' },
      scholarship: { label: 'Scholarship', color: 'bg-green-100 text-green-800' },
      internship: { label: 'Internship', color: 'bg-purple-100 text-purple-800' }
    };
    return badges[type] || badges.job;
  };

  return (
    <div className="w-full h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-5">
        <div className={`w-12 h-12 ${opportunity.avatarBg} rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
          {opportunity.avatar}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Badge className={`${getTypeBadge(opportunity.type).color} text-xs`}>
              {getTypeIcon(opportunity.type)}
              <span className="ml-1">{getTypeBadge(opportunity.type).label}</span>
            </Badge>
            <span className="text-sm text-gray-500">{opportunity.postedTime}</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{opportunity.title}</h2>
          <p className="text-gray-600">{opportunity.company} / {opportunity.industry}</p>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 rounded-lg p-2">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className=" bg-red-00 flex gap-6 h-full px-5 pb-5">
        {/* Left content (scrollable) */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="  pr-4">
            <div className="space-y-6">
              {/* Meta row */}
              <div className="grid grid-cols-4 gap-4 text-xs">
                <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /><span>United States</span></div>
                <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /><span>{opportunity.workType}</span></div>
                <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /><span>Remote</span></div>
                <div className="flex items-center gap-2"><DollarSign className="w-3.5 h-3.5" /><span>{opportunity.salary || opportunity.amount}</span></div>
              </div>

              {/* Green bar */}
              <div className="bg-gradient-to-r from-[#306C6A] to-emerald-500 rounded-xl px-4 py-3 flex items-center justify-between text-white">
                <div className="text-sm font-medium">Maximize your interview chances</div>
                <Button className="bg-white text-green-700 hover:bg-gray-100 text-xs font-semibold">Generate Custom Resume</Button>
              </div>

              {/* Overview */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Overview</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {opportunity.companyDescription || `${opportunity.company} is a leader in its industry.`}
                </p>
              </div>

              {/* Insider connection */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-semibold text-gray-900">Insider Connection @{opportunity.company}</span>
                  <span className="ml-auto text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">5 email credits available today</span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="rounded-xl border p-3">
                    <p className="font-medium text-gray-900 mb-1">Beyond Your Network</p>
                    <Button variant="outline" className="w-full text-xs">Find More Connections</Button>
                  </div>
                  <div className="rounded-xl border p-3">
                    <p className="font-medium text-gray-900 mb-1">From Your Previous Company</p>
                    <Button variant="outline" className="w-full text-xs">Find More Connections</Button>
                  </div>
                  <div className="rounded-xl border p-3">
                    <p className="font-medium text-gray-900 mb-1">From Your School</p>
                    <Button variant="outline" className="w-full text-xs">Find More Connections</Button>
                  </div>
                </div>
                <div className="mt-3">
                  <Input placeholder="Paste any LinkedIn profile URL to find work emails instantly..." className="text-xs" />
                </div>
              </div>

              {/* Responsibilities */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Responsibilities</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  {opportunity.responsibilities?.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Qualification */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-base font-semibold text-gray-900">Qualification</h3>
                  <span className="text-[11px] text-gray-500">Represents the skills you have</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {(opportunity.requiredSkills || []).concat(opportunity.preferredSkills || []).slice(0, 12).map((skill: string, i: number) => (
                    <Badge key={i} variant="secondary" className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px]">{skill}</Badge>
                  ))}
                </div>
                <div className="space-y-3 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold mb-1">Required</p>
                    <ul className="list-disc ml-5 space-y-1">
                      <li>2+ years of related experience; multi-platform experience required.</li>
                      <li>Experience with React / Single Page Applications.</li>
                      <li>Excellent skills in building interactive-facing mobile and web applications.</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Preferred</p>
                    <ul className="list-disc ml-5 space-y-1">
                      <li>Experience with micro-frontend architecture.</li>
                      <li>Security best practices.</li>
                      <li>Experience with Mobile frameworks (React Native, Flutter, Android, iOS).</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              {opportunity.benefits && (
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">Benefits</h3>
                  <ul className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                    {opportunity.benefits.map((b: string, i: number) => (
                      <li key={i}>• {b}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Company */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Company</h3>
                <div className="rounded-xl border p-4 text-sm grid grid-cols-3 gap-4 items-center">
                  <div>
                    <p className="font-semibold">{opportunity.company}</p>
                    <div className="flex gap-2 mt-1 text-gray-500">
                      <Linkedin className="w-4 h-4" />
                      <Mail className="w-4 h-4" />
                      <Globe className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p><span className="font-medium">Founded:</span> {opportunity.founded || '—'}</p>
                    <p><span className="font-medium">Headquarters:</span> {opportunity.headquarters || '—'}</p>
                  </div>
                  <div className="space-y-1">
                    <p><span className="font-medium">Employees:</span> {opportunity.employees || '—'}</p>
                    <p><span className="font-medium">Website:</span> {opportunity.website || '—'}</p>
                  </div>
                </div>
              </div>

              {/* H1B Sponsorship */}
              {opportunity.h1bInfo && (
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">H1B Sponsorship</h3>
                  <div className="grid grid-cols-2 gap-4 items-center">
                    <div className="rounded-xl border p-4 text-center">
                      <div className="w-16 h-16 rounded-full border-4 border-emerald-500 mx-auto flex items-center justify-center font-bold text-emerald-600">100</div>
                      <p className="mt-2 text-xs text-gray-600">Represents jobs similar to this role</p>
                    </div>
                    <div className="rounded-xl border p-4">
                      <p className="text-xs text-gray-600 mb-2">Trends of Total Sponsorship</p>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-emerald-500"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Funding */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Funding</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="rounded-xl border p-3"><p className="font-medium">Current Stage</p><p className="text-gray-600">Late Stage</p></div>
                  <div className="rounded-xl border p-3"><p className="font-medium">Key Investors</p><p className="text-gray-600">ClearLake Capital Group</p></div>
                  <div className="rounded-xl border p-3"><p className="font-medium">Date</p><p className="text-gray-600">2022-07-14</p></div>
                </div>
              </div>

              {/* Leadership */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Leadership Team</h3>
                <div className="rounded-xl border p-4 w-64 text-sm">
                  <p className="font-semibold">Seth Ingal</p>
                  <p className="text-gray-600">CLO</p>
                </div>
              </div>

              {/* Recent News */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Recent News</h3>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="rounded-xl border p-3"><p className="font-medium">Research and Markets</p><p className="text-gray-600">Automotive Collision Repair Market...</p></div>
                  <div className="rounded-xl border p-3"><p className="font-medium">PR Newswire</p><p className="text-gray-600">Crash Champions Founder Matt...</p></div>
                  <div className="rounded-xl border p-3"><p className="font-medium">PR Newswire</p><p className="text-gray-600">Crash Champions Partners with...</p></div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Right column */}
        {/* <div className="w-64 flex-shrink-0">
          <PercentageCard
            percentage={opportunity.matchScore || 98}
            title="STRONG MATCH"
            features={["Experience", "Skills", "Industry"]}
            glowColor="teal"
            size="md"
          />
          <div className="mt-4 grid gap-2">
            <Button className="w-full bg-[#306C6A] hover:bg-[#285856]">Apply with Autofill</Button>
            <Button variant="outline" className="w-full">Save</Button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default OpportunityDetailPanel;


