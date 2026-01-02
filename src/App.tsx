import { Route, Routes } from "react-router-dom";
import Test from "@/pages/Test";
import Form from "@/pages/Form";
import Table from "@/pages/Table";
import Home from "@/pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<Test />} />
      <Route path="/form" element={<Form />} />
      <Route path="/table" element={<Table />} />
    </Routes>
  );
}

export default App;
