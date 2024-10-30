
export const metadata = {
    title: "ShopEase Admin",
    description: "ShopEase Admin Dashboard"
}

const AdminLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div>
            <div>Nav</div>
            {children}
        </div>
    );
};

export default AdminLayout;