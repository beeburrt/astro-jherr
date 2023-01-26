import { useState, useEffect } from "preact/hooks";

import { CollectionEntry } from "astro:content";

import VideoGrid from "./VideoGrid";

type VideoData = CollectionEntry<"videos">;

export default function SearchPage() {
  const [search, setSearch] = useState("");
  const [videos, setVideos] = useState<VideoData[]>([]);

  useEffect(() => {
    fetch(`/search.json?q=${encodeURI(encodedURIComponent(search))}`)
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
      });
  }, [search]);

  return (
    <div class="flex flex-col">
      <input
        type="text"
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent mb-2"
        placeholder="Search"
        value={search}
        onInput={(evt) => setSearch(evt.currentTarget.value)}
      />
      <VideoGrid videos={videos} />
    </div>
  );
}
