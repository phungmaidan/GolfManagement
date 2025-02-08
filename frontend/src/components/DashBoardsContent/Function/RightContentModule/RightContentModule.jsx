import Box from "@mui/material/Box";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { getItemAPI, setSelectedItem } from "~/redux/module/moduleSlice";
import { useNavigate } from "react-router-dom";
// Giả sử hàm slugify đã được export từ '~/utils/formatter'
import { slugify } from "~/utils/formatter";
import Typography from "@mui/material/Typography";

const RightContentModule = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, selectedItem } = useSelector((state) => state.module);

    const handleFunctionClick = (item) => {
        // Cập nhật selectedItem trong Redux
        dispatch(setSelectedItem(item));
        // Sử dụng hàm slugify để chuyển đổi tên item thành dạng slug
        const pathName = slugify(item.ItemName);
        // Chuyển hướng đến trang tương ứng, ví dụ: /dashboards/daily-operation
        navigate(`/dashboards/${pathName}`);
    };

    // Gọi API khi component mount
    useEffect(() => {
        dispatch(getItemAPI());
    }, [dispatch]);

    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
            }}
        >
            <Box
                sx={{
                    height: "50%",
                    width: "90%",
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)", // 2 cột
                    flexWrap: "wrap",
                }}
            >
                {items.map((item) => (
                    <Button
                        key={item.ItemID}
                        variant="outlined" // Sử dụng variant cố định cho tất cả các Button
                        sx={{
                            height: 50,
                            m: 1,
                            bgcolor: "background.paper",
                            color: "primary.main",
                            borderColor: "secondary.light",
                        }}
                        onClick={() => handleFunctionClick(item)}
                    >
                        <Typography variant="h6"> {item.ItemName}</Typography>
                    </Button>
                ))}
            </Box>
        </Box>
    );
};

export default RightContentModule;
