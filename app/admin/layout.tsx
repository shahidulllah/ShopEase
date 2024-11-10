import AdminNav from "../Components/admin/AdminNav";

export const metadata = {
    title: "ShopEase Admin",
    description: "ShopEase Admin Dashboard"
}

const AdminLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div>
            <AdminNav/>
            {children}
        </div>
    );
};

export default AdminLayout;