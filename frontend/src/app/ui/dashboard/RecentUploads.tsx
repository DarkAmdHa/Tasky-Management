"use client";
import UploadItem from "@/app/ui/UploadItem";
import Title from "../Title";
import { useState, useEffect } from "react";
import { getLatestUploads } from "@/lib/functions";
import UploadItemSkeleton from "../UploadItemSkeleton";
function RecentUploads({ dashboardData }) {
  // const uploadedItems = [
  //   {
  //     name: "Background.png",
  //     date: new Date(),
  //     image: "https://picsum.photos/100",
  //   },
  //   {
  //     name: "Notes(2).pdf",
  //     date: new Date("12/2/2023"),
  //     image: "https://picsum.photos/101",
  //   },
  //   {
  //     name: "Notes.pdf",
  //     date: new Date("9/2/2023"),
  //     image: "https://picsum.photos/102",
  //   },
  // ];
  const { isLoading, latestUploads } = dashboardData;
  return (
    <div className="flex flex-col gap-4">
      <Title title="Recent Uploads" />

      <div className="flex flex-wrap justify-between">
        {isLoading ? (
          <UploadItemSkeleton count={3} />
        ) : latestUploads.length ? (
          latestUploads.map((item) => (
            <UploadItem
              name={item.name}
              key={item.name}
              date={item.date}
              image={item.image}
            />
          ))
        ) : (
          <p>No items uploaded yet.</p>
        )}
      </div>
    </div>
  );
}

export default RecentUploads;
