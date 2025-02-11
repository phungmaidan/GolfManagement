/**
 * Utility function: pick
 * -------------------------
 * Lấy ra các thuộc tính chỉ định từ một đối tượng.
 */
function pick(obj, keys = []) {
    if (!Array.isArray(keys)) {
        console.warn("Tham số keys phải là một mảng, nhận được:", keys);
        return {};
    }
    return keys.reduce((result, key) => {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            result[key] = obj[key];
        }
        return result;
    }, {});
}

/**
 * Utility function: pickInfoUser
 * -------------------------------
 * Lọc thông tin từ một đối tượng theo cấu hình cho trước.
 * Có thể lấy các thuộc tính cấp cao và (nếu cần) các thuộc tính nested (ví dụ như trong mảng "details").
 */
const pickInfoUser = (data, options) => {
    const fields = Array.isArray(options.fields) ? options.fields : [];
    const result = pick(data, fields);

    if (options.nested) {
        Object.keys(options.nested).forEach(nestedKey => {
            if (Array.isArray(data[nestedKey])) {
                result[nestedKey] = data[nestedKey].map(item => pick(item, options.nested[nestedKey]));
            }
        });
    }
    return result;
}

/**
 * Utility function: splitByField
 * -------------------------------
 * Tách (nhóm) một mảng các đối tượng dựa theo giá trị của một trường cụ thể.
 *
 * @param {Array<Object>} dataArray - Mảng dữ liệu cần nhóm.
 * @param {string} groupField - Tên trường dùng để nhóm (ví dụ: "Session").
 * @param {Object} [pickOptions] - (Tùy chọn) Cấu hình dùng để lọc thông tin trong mỗi đối tượng.
 *
 * Ví dụ sử dụng:
 *   const groupedData = splitByField(bookings, "Session", {
 *     fields: ["BookingID", "EntryDate", "BookingDate", "CourseID", "TeeTime", "TeeBox", "RecordStatus", "details"],
 *     nested: {
 *       details: ["Counter", "GuestType", "MemberNo", "Name"]
 *     }
 *   });
 */
const splitByField = (dataArray, groupField, pickOptions) => {
    return dataArray.reduce((result, item) => {
        const groupKey = item[groupField]; // Lấy giá trị của trường dùng để nhóm
        // Nếu có cấu hình pickOptions, sử dụng pickInfoUser để lọc các trường cần thiết
        const processedItem = pickOptions ? pickInfoUser(item, pickOptions) : item;
        if (!result[groupKey]) {
            result[groupKey] = [];
        }
        result[groupKey].push(processedItem);
        return result;
    }, {});
}

export {pickInfoUser, splitByField}