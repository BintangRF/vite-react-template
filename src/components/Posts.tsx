import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Post = {
  id: number;
  title: string;
  body: string;
};

export const Posts: React.FC = () => {
  const getPosts = async (): Promise<Post[]> => {
    const res = await axios.get<Post[]>(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return res.data;
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Posts</h1>
        </div>

        {/* Loading */}
        {isPending && (
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center gap-3 text-gray-600">
              <span>Loading posts...</span>
            </div>
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="flex items-center gap-2 bg-red-100 border border-red-300 text-red-700 p-4 rounded-md">
            <span>{error?.message || "Something went wrong"}</span>
          </div>
        )}

        {/* Data */}
        {!isPending && !isError && (
          <div className="grid gap-4 sm:grid-cols-2">
            {data?.map((post) => (
              <div
                key={post.id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
              >
                <div className="flex items-start gap-2 mb-2">
                  <h2 className="font-semibold text-gray-800 line-clamp-1">
                    {post.title}
                  </h2>
                </div>

                <p className="text-sm text-gray-600 line-clamp-3">
                  {post.body}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
