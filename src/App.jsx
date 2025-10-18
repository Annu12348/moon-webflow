import React, { useState } from "react";
import Router from "./utils/Router";
import Loading from "./components/Loading";

const App = () => {
  const [loading, setLoading] = useState(true);
  return (
    <div className="w-full min-h-screen  ">
      {loading ? <Loading setLoading={setLoading} /> :<Router />}
    </div>
  );
};

export default App;