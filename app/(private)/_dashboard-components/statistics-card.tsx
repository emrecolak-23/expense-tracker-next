import React from "react";

function StatisticsCard({
  title,
  value,
  icon,
  valueColor,
  isCurrency,
}: {
  title: string;
  value: number;
  icon: string;
  valueColor: string;
  isCurrency: boolean;
}) {
  let formattedValue: any = value;

  if (isCurrency) {
    formattedValue = value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }

  return (
    <div className="flex justify-between items-center px-5 py-7 border border-gray-200 rounded-sm border-solid">
      <img src={icon} alt="" className="w-16 h-16" />
      <div className="flex flex-col items-end">
        <span className="text-gray-500 text-sm">{title}</span>
        <h1 className="text-3xl" style={{ color: valueColor }}>
          {formattedValue}
        </h1>
      </div>
    </div>
  );
}

export default StatisticsCard;
