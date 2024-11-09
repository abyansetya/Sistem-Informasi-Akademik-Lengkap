import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

export const COLORS = ["#697DEE", "#FF8787", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export function Chart({ data, width = 350, height = 350 }) {
    return (
        <PieChart width={width} height={height}>
            <Pie
                data={data}
                cx={width / 2}
                cy={height / 2}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={Math.min(width, height) * 0.4}
                fill="#8884d8"
                dataKey="value"
            >
                {data.map((entry, index) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                    />
                ))}
            </Pie>
            <Tooltip />
        </PieChart>
    );
}
