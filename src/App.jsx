import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SearchPage from "@/components/pages/SearchPage";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
<Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/search/:query?" element={<SearchPage />} />
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ zIndex: 9999 }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;