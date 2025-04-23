import React, { useState } from "react";

const StudentList = () => {
  const [students, setStudents] = useState([
    { id: 1, name: "Nguyễn Văn A", class: "12A1", age: 18 },
    { id: 2, name: "Trần Thị B", class: "11B2", age: 17 },
    { id: 3, name: "Lê Văn C", class: "10C3", age: 16 },
  ]);

  const handleDelete = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Danh sách sinh viên</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border">Tên</th>
            <th className="py-2 px-4 border">Lớp</th>
            <th className="py-2 px-4 border">Tuổi</th>
            <th className="py-2 px-4 border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="text-center">
              <td className="py-2 px-4 border">{student.name}</td>
              <td className="py-2 px-4 border">{student.class}</td>
              <td className="py-2 px-4 border">{student.age}</td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => handleDelete(student.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Xoá
                </button>
              </td>
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
