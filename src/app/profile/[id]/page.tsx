import React from "react";

type PageProps = {
  params: {
    id: string;
  };
};

const UserProfile = (props: PageProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="mb-6">User Profile</h1>
      <hr />
      <p className="text-4xl">
        User Profile Page{" "}
        <span className="bg-orange-600 text-white p-2 rounded-lg">
          {props.params.id}
        </span>
      </p>
    </div>
  );
};

export default UserProfile;
