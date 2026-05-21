import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, ArrowLeft, ArrowRight } from "lucide-react"
import { getAllIzin, createIzin, updateIzin, deleteIzin } from "../services/IzinService";
import FormModal from "./FormModal";
import "../css/Izin.css"

export default function Izin() {

    // State
    const [dataIzin, setDataIzin] = useState([]);
    const [editItem, setEditItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 15;
    const totalItems = dataIzin.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = dataIzin.slice(startIndex, endIndex);

    // Get Handle
    const reloadData = async () => {
        try {
            const data = await getAllIzin();
            setDataIzin(data);
            setCurrentPage(1);
        }
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await reloadData();
        };

        fetchData();
    }, []);

    // Save Handle
    const handleSave = async (formData) => {
        try {
            // Update
            if (formData.id) {
                await updateIzin(formData.id, formData);
            }
            // Create
            else {
                await createIzin(formData);
            }

            await reloadData();
            setIsModalOpen(false);
            setEditItem(null);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    };

    // Delete Handle
    const handleDelete = async (id) => {
        try {
            await deleteIzin(id);
            await reloadData();
        }
        catch (error) {
            console.error(error);
        }
    };

    // Close Handle
    const handleCancelEdit = () => {
        setIsModalOpen(false);
        setEditItem(null);
    };

    // Date Format
    const formatDate = (date) => {
        const d = new Date(date);

        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();

        return `${day}/${month}/${year}`;
    };

    return (
        <div className="page-header">
            <div className="header-top">
                <div>
                    <h1 className="page-title">
                        Izin
                    </h1>

                    <p className="page-desc">
                        Data izin karyawan.
                    </p>
                </div>
            </div>

            <div className="header-action">
                <button
                    onClick={() => {
                      setEditItem(null);
                      setIsModalOpen(true);
                    }}
                    className="create-btn"
                >
                    <Plus size={16} />
                    <span>Tambah Izin</span>
                </button>
            </div>

            {/* Table */}
            <div className="table-container">
                <table className="table-izin">
                    <thead>
                        <tr className="table-header-row">

                            <th className="table-header-cell-no">
                                <span>No</span>
                            </th>

                            <th className="table-header-cell">
                                <span>Jenis</span>
                            </th>

                            <th className="table-header-cell">
                                <span>Tanggal Izin</span>
                            </th>

                            <th className="table-header-cell">
                                <span>Tanggal Masuk</span>
                            </th>

                            <th className="table-header-cell-actions">
                                <span>Actions</span>
                            </th>
                        </tr>
                    </thead>

                    <tbody className="table-body">
                        {dataIzin.length === 0 ? 
                            <tr>
                                <td
                                    colSpan="5"
                                    className="table-empty"
                                >
                                    Tidak ada data
                                </td>
                            </tr>
                            :
                            null
                        }

                        {currentData.map((item, index) => (
                            <tr
                                key={item.id}
                                className="table-row"
                            >

                                <td className="table-cell-no">
                                    {startIndex + index + 1}
                                </td>

                                <td className="table-cell">
                                    {item.jenis}
                                </td>

                                <td className="table-cell">
                                    {formatDate(item.tanggalIzin)}
                                </td>

                                <td className="table-cell">
                                    {formatDate(item.tanggalMasuk)}
                                </td>

                                <td className="table-cell-actions">
                                    <div className="actions-container">

                                        <button
                                            onClick={() => {
                                                setEditItem(item);
                                                setIsModalOpen(true);
                                            }}
                                            className="btn-edit"
                                        >
                                            <Pencil size={16} />
                                            <span>Edit</span>
                                        </button>

                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="btn-delete"
                                        >
                                            <Trash2 size={16} />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination-container">
                <p className="pagination-info">
                    {totalItems === 0 ? 
                        'Menampilkan 0 dari 0 total data'
                        : 
                        `Menampilkan ${startIndex + 1} - ${Math.min(endIndex, totalItems)} dari ${totalItems} total data`}
                </p>

                {totalPages > 1 ?
                    <div className="pagination-btn-wrapper">

                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className={`pagination-btn ${ currentPage === 1 ? 
                                'disabled' 
                                : 
                                ''
                            }`}
                        >
                            <ArrowLeft size={14} />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                            <button
                                key={pageNumber}
                                onClick={() => setCurrentPage(pageNumber)}
                                className={`pagination-btn pagination-page-btn ${ pageNumber === currentPage ? 
                                    'active'
                                    : 
                                    ''
                                }`}
                            >
                                {pageNumber}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className={`pagination-btn ${ currentPage === totalPages ? 
                                'disabled' 
                                : 
                                ''
                            }`}
                        >
                           <ArrowRight size={14} />
                        </button>
                    </div>
                    :
                    null
                }
            </div>

            {/* Modal */}
            {isModalOpen ?
                <div className="modal-overlay">
                    <div className="modal-container">
                        <FormModal
                            editItem={editItem}
                            onSave={handleSave}
                            onCancelEdit={handleCancelEdit}
                        />
                    </div>
                </div>
                :
                null
            }
        </div>
    );
}
