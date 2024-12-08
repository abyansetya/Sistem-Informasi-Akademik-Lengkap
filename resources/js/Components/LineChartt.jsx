import React from "react";
import {
    CartesianGrid,
    Legend,
    Line,
    Tooltip,
    XAxis,
    YAxis,
    LineChart,
} from "recharts";

export default function LineChartt({ data }) {
    return (
        <>
            <LineChart
                width={1200}
                height={400}
                data={data}
                margin={{ top: 5, right: 60, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 4]} />
                <Tooltip />
                {/* <Legend /> */}
                <Line
                    type="linear"
                    dataKey="IPs"
                    stroke="#8884d8"
                    strokeWidth={4}
                />
            </LineChart>
        </>
    );
}
