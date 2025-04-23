import React, { useState, useEffect } from "react";

const StudentList = () => {
  // Lấy danh sách sinh viên từ localStorage khi trang load
  const loadStudentsFromLocalStorage = () => {
    const savedStudents = localStorage.getItem("students");
    return savedStudents ? JSON.parse(savedStudents) : [];
  };

  // Khởi tạo state sinh viên từ localStorage
  const [students, setStudents] = useState(loadStudentsFromLocalStorage);

  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [age, setAge] = useState("");

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editClass, setEditClass] = useState("");
  const [editAge, setEditAge] = useState("");

  const [search, setSearch] = useState(""); // State cho tìm kiếm
  const [selectedClass, setSelectedClass] = useState(""); // State cho lớp đã chọn

  // Lưu danh sách sinh viên vào localStorage mỗi khi danh sách thay đổi
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  // Xử lý thêm sinh viên
  const handleAdd = () => {
    if (!name.trim() || !className.trim() || !age.trim()) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name,
      class: className,
      age: parseInt(age),
    };

    setStudents((prev) => [...prev, newStudent]);
    setName("");
    setClassName("");
    setAge("");
  };

  // Xử lý xoá sinh viên
  const handleDelete = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  // Xử lý sửa sinh viên
  const handleEdit = (student) => {
    setEditId(student.id);
    setEditName(student.name);
    setEditClass(student.class);
    setEditAge(student.age);
  };

  const handleSave = () => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === editId
          ? { ...s, name: editName, class: editClass, age: parseInt(editAge) }
          : s
      )
    );
    setEditId(null);
  };

  const handleCancel = () => {
    setEditId(null);
  };

  // Lọc danh sách sinh viên theo tên (không phân biệt hoa/thường)
  const filteredStudents = students
    .filter((student) =>
      student.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((student) =>
      selectedClass ? student.class === selectedClass : true
    ); // Lọc theo lớp

  // Lấy danh sách lớp
  const classList = [...new Set(students.map((student) => student.class))];

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg w-full max-w-3xl">
      <h1 className="text-2xl font-bold mb-4 text-center">Danh sách sinh viên</h1>

      {/* Form thêm sinh viên */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Họ tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Lớp"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="number"
          placeholder="Tuổi"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2"
        >
          Thêm sinh viên
        </button>
      </div>

      {/* Input tìm kiếm */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm sinh viên theo tên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/2"
        />
      </div>

      {/* Dropdown chọn lớp */}
      <div className="mb-4">
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/3"
        >
          <option value="">Tất cả lớp</option>
          {classList.map((cls, index) => (
            <option key={index} value={cls}>
              {cls}
            </option>
          ))}
        </select>
      </div>

      {/* Bảng danh sách */}
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="py-2 px-4 border">Tên</th>
            <th className="py-2 px-4 border">Lớp</th>
            <th className="py-2 px-4 border">Tuổi</th>
            <th className="py-2 px-4 border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <tr key={student.id} className="text-center">
                {editId === student.id ? (
                  <>
                    <td className="py-2 px-2 border">
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="border px-2 py-1 rounded w-full"
                      />
                    </td>
                    <td className="py-2 px-2 border">
                      <input
                        value={editClass}
                        onChange={(e) => setEditClass(e.target.value)}
                        className="border px-2 py-1 rounded w-full"
                      />
                    </td>
                    <td className="py-2 px-2 border">
                      <input
                        type="number"
                        value={editAge}
                        onChange={(e) => setEditAge(e.target.value)}
                        className="border px-2 py-1 rounded w-full"
                      />
                    </td>
                    <td className="py-2 px-2 border space-x-2">
                      <button
                        onClick={handleSave}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Lưu
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                      >
                        Huỷ
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-2 px-4 border">{student.name}</td>
                    <td className="py-2 px-4 border">{student.class}</td>
                    <td className="py-2 px-4 border">{student.age}</td>
                    <td className="py-2 px-4 border space-x-2">
                      <button
                        onClick={() => handleEdit(student)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Xoá
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-4 text-center text-gray-500">
                Không có sinh viên nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
