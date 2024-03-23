
import React from "react";
import AdminNav from "../components/admin/AdminNav";

export const metadata = {
 title: 'Frame of Fame Admin',
 description: 'Frame of Fame Admin Dashboard'
}

const AdminLayout = ({children}: {children: React.ReactNode})=> {
 return (
   <div>
    <AdminNav/>
    {children}
   </div>
 );
};

export default AdminLayout;