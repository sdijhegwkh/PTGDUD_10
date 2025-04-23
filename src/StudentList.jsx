import React, { useState } from "react";

const StudentList = () => {
  const [students, setStudents] = useState([
    { id: 1, name: "Nguyễn Văn A", class: "12A1", age: 18 },
    { id: 2, name: "Trần Thị B", class: "11B2", age: 17 },
  ]);

  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [age, setAge] = useState("");

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editClass, setEditClass] = useState("");
  const [editAge, setEditAge] = useState("");

  const handleDelete = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

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
          {students.map((student) => (
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
          ))}
          {students.length === 0 && (
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
