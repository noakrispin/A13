// Import AdminNav component from '../components/admin/AdminNav'
import AdminNav from "../components/admin/AdminNav";

// Define metadata for the AdminLayout component
export const metadata = {
 title: 'Frame of Fame Admin', // Title for the admin dashboard
 description: 'Frame of Fame Admin Dashboard' // Description for the admin dashboard
}

// Define AdminLayout component
const AdminLayout = ({children}: {children: React.ReactNode})=> {
  return (
    <div>
      {/* Render AdminNav component */}
      <AdminNav/>
      {/* Render children components */}
      {children}
    </div>
 );
};

export default AdminLayout;// Export AdminLayout component