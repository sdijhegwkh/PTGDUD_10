import React, { useState } from "react";

const StudentItem = ({
  student,
  onDelete,
  onEdit,
  onSave,
  onCancel,
  isEditing,
  editName,
  editClass,
  editAge,
  setEditName,
  setEditClass,
  setEditAge,
}) => {
  return (
    <tr className="text-center">
      {isEditing ? (
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
              onClick={() => onSave(student.id)}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Lưu
            </button>
            <button
              onClick={() => onCancel()}
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
              onClick={() => onEdit(student)}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
            >
              Sửa
            </button>
            <button
              onClick={() => onDelete(student.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Xoá
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default StudentItem;
