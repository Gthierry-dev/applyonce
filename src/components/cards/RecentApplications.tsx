import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Dropdown } from "../forms/Dropdown";

const dataSets = {
  "7": [
    { day: "Sat 26", amount: 1000 },
    { day: "Sun 27", amount: 2000 },
    { day: "Mon 28", amount: 11000 },
    { day: "Tue 29", amount: 11039 },
    { day: "Wed 30", amount: 14000 },
    { day: "Thu 31", amount: 11000 },
    { day: "Fri 01", amount: 16000 },
  ],
  "30": [
    { day: "Sat 19", amount: 203200 },
    { day: "Sun 20", amount: 35000 },
    { day: "Mon 21", amount: 103000 },
    { day: "Tue 22", amount: 120000 },
    { day: "Wed 23", amount: 130000 },
    { day: "Thu 24", amount: 135000 },
    { day: "Fri 25", amount: 170300 },
    { day: "Sat 26", amount: 203000 },
    { day: "Sun 27", amount: 150300 },
    { day: "Mon 28", amount: 130300 },
    { day: "Tue 29", amount: 123000 },
    { day: "Wed 30", amount: 132000 },
    { day: "Thu 31", amount: 150200 },
    { day: "Fri 01", amount: 170030 },
  ],
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any[];
  label?: string;
}) => {
  if (!active || !payload || !payload.length) return null;

  const value = payload[0].value;
  const formatted = new Intl.NumberFormat("rw-RW", {
    style: "currency",
    currency: "RWF",
  }).format(value);

  return (
    <>
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e4e4e4",
          padding: "10px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.17)",
        }}
      >
        <p className="text-sm pb-1 font-medium text-text-color-black/70">
          On {label}
        </p>
        <p className="text-sm flex items-center justify-start gap-1 pb-1">
          <div className="h-[20px] w-[4px] rounded-md bg-[#8bc129]"></div>
          <div>
            Total: <span className="font-semibold">{formatted}</span>
          </div>
        </p>
      </div>
    </>
  );
};

function RecentApplications() {
  const [range, setRange] = useState<"7" | "30">("7");
  const data = dataSets[range];
  const format = (v: number) =>
    new Intl.NumberFormat("rw-RW", {
      style: "currency",
      currency: "RWF",
    }).format(v);
  const formatK = (v: number) => (v >= 1000 ? `${v / 1000}k` : `${v}`);

  return (
    <div className="p-5  ">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium text-text-color-black/80 pr-5">
          RecentApplications
        </h2>
        <Dropdown
          options={[
            { label: "Last 7 Days", value: "7" },
            { label: "Last 30 Days", value: "30" },
          ]}
          label=""
          placeholder=""
          size=""
          value={`Last ${range} Days`}
          onChange={(e) => setRange(e as "7" | "30")}
        />
      </div>
      <div className="text-base font-NotoSansJP font-semibold text-text-color-black mb-6">
        {format(data.reduce((sum, d) => sum + d.amount, 0))}
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ left: 5, right: 10, top: 10, bottom: 0 }}
        >
          <XAxis
            dataKey="day"
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
            tickMargin={10}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatK}
            tick={{ fontSize: 12 }}
            tickMargin={10}
            axisLine={false}
            tickLine={false}
          />
          <CartesianGrid stroke="#aaaaaa50" strokeDasharray="5 5" />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="currentColor"
            className="text-[#306c6a]"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RecentApplications;
