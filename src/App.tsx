import { Posts } from "@/components/Posts";
import { Route, Routes } from "react-router-dom";
import Test from "@/pages/Test";
import Form from "./pages/Form";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Posts />} />
      <Route path="/test" element={<Test />} />
      <Route path="/form" element={<Form />} />
    </Routes>
  );
}

export default App;
