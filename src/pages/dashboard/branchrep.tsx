import { NextPage } from "next";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

import EventList from "~/components/general/dashboard/branchrep/eventList";
import Dashboard from "~/components/layout/dashboard";
import Spinner from "~/components/spinner";
import { Role } from "~/generated/generated";
import { useAuth } from "~/hooks/useAuth";

const BranchRep: NextPage = () => {
  const router = useRouter();
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex h-screen w-screen justify-center">
        <Spinner />
      </div>
    );

  // 1. Redirect to login if user is not logged in
  if (!user) {
    void router.push("/login");
    return <div>Redirecting...</div>;
  }

  // 2. Redirect to profile if user is not a branch rep
  if (user && user.role !== Role.BranchRep) void router.push("/profile");

  return (
    <Dashboard>
      <Toaster />
      {/* Welcome Header */}
      <h1 className="mb-3 text-4xl">
        Hello <span className="font-semibold">{user?.name}</span>!
      </h1>
      <div className="mt-3">
        <EventList branchRepId={user.id} />
      </div>
    </Dashboard>
  );
};

export default BranchRep;
