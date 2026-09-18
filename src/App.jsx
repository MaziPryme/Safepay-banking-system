import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast" 

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 30, // 30 seconds
    },
  },
})


export default function App() {
  return (
   <QueryClientProvider client={queryClient}>
      <BrowserRouter>
       <AuthProvider>
        <AppRoutes />
        <Toaster 
        position="top- right"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: "12px",
            fontsize: "14px"
          }
        }}/>
       </AuthProvider>
      </BrowserRouter>
   </QueryClientProvider>
  )
}
