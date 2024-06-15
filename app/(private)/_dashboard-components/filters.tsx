"use client";
import { Button, Input } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

function Filters({ searchParams }: { searchParams: any }) {
  const [fromDate, setFromDate] = React.useState(searchParams?.fromDate || "");
  const [toDate, setToDate] = React.useState(searchParams?.toDate || "");
  const router = useRouter();

  const onFilter = () => {
    router.push(`/?fromDate=${fromDate}&toDate=${toDate}`);
  };
  const onClear = () => {
    setFromDate("");
    setToDate("");
    router.push("/");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5 mt-7 lg:items-end">
      <div className="w-96">
        <h1 className="text-gray-600 text-sm">From Date</h1>
        <Input
          placeholder="From Date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          type="date"
        />
      </div>
      <div className="w-96">
        <h1 className="text-gray-600 text-sm">To Date</h1>
        <Input
          placeholder="To Date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          min={fromDate}
          type="date"
        />
      </div>
      <Button onClick={() => onClear()}>Clear</Button>
      <Button
        onClick={() => onFilter()}
        type="primary"
        disabled={!fromDate || !toDate}
      >
        Filter
      </Button>
    </div>
  );
}

export default Filters;
