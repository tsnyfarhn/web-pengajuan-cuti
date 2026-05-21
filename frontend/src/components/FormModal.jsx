import { useEffect, useState } from 'react';
import { Plus, Check, X, Calendar, Type, FilePlusCorner, FilePenLine  } from 'lucide-react';
import { getMinimumTanggalIzinRule } from '../services/IzinService';
import {
    MINIMUM_IZIN_WORKING_DAYS,
    formatDisplayDate,
    getMinimumTanggalIzin as getFallbackMinimumTanggalIzin
} from '../utils/izinDateRules';
import '../css/FormModal.css'

export default function FormModal({ editItem, onSave, onCancelEdit }) {

    // State
    const emptyForm = {
        jenis: '',
        tanggalIzin: '',
        tanggalMasuk: '',
    };
    const [formData, setFormData] = useState(() => ({
        jenis: editItem?.jenis || '',
        tanggalIzin: editItem?.tanggalIzin?.split('T')[0] || '',
        tanggalMasuk: editItem?.tanggalMasuk?.split('T')[0] || '',
    }));
    const [error, setError] = useState('');
    const [tanggalRule, setTanggalRule] = useState(() => ({
        minimumTanggalIzin: getFallbackMinimumTanggalIzin(),
        minimumHariKerja: MINIMUM_IZIN_WORKING_DAYS
    }));
    const minimumTanggalIzin = tanggalRule.minimumTanggalIzin;
    const minimumTanggalIzinLabel = formatDisplayDate(minimumTanggalIzin);

    useEffect(() => {
        let isActive = true;

        const fetchTanggalRule = async () => {
            try {
                const rule = await getMinimumTanggalIzinRule();

                if (!isActive) {
                    return;
                }

                setTanggalRule({
                    minimumTanggalIzin: rule.minimumTanggalIzin?.split('T')[0] || getFallbackMinimumTanggalIzin(),
                    minimumHariKerja: rule.minimumHariKerja || MINIMUM_IZIN_WORKING_DAYS
                });
            }
            catch (error) {
                console.error(error);
            }
        };

        fetchTanggalRule();

        return () => {
            isActive = false;
        };
    }, []);

    // Edit
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            const nextData = {
                ...prev,
                [name]: value
            };

            if ( name === 'tanggalIzin' && nextData.tanggalMasuk && nextData.tanggalMasuk < value ) {
                nextData.tanggalMasuk = '';
            }

            return nextData;
        });
    };

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.jenis.trim()) {
            setError('Jenis izin wajib diisi');
            return;
        }

        if (!formData.tanggalIzin) {
            setError('Tanggal izin wajib dipilih');
            return;
        }

        if (!formData.tanggalMasuk) {
            setError('Tanggal masuk wajib dipilih');
            return;
        }

        if (formData.tanggalMasuk < formData.tanggalIzin) {
            setError('Tanggal masuk tidak boleh lebih awal dari tanggal izin')
        }

        if (formData.tanggalIzin < minimumTanggalIzin) {
            setError('Tanggal izin minimal ${minimumHariKerja} hari kerja dari hari ini. Pilih tanggal mulai ${minimumTanggalIzinLabel}');
            return;
        }

        try {
            await onSave({
                id: editItem?.id,
                jenis: formData.jenis.trim(),
                tanggalIzin: formData.tanggalIzin,
                tanggalMasuk: formData.tanggalMasuk
            });

            if (!editItem) {
                setFormData(emptyForm);
            }

            setError('');
        }
        catch (error) {
            setError(error.message || 'Gagal menyimpan data izin');
        }
    };

    return (
        <div className="modal-content">
            <h3 className="modal-title-container">
                <span className="modal-title-label">
                    {editItem ? (
                        <FilePenLine size={16} />
                    ) : (
                        <FilePlusCorner size={16} />
                    )}

                    {editItem ? (
                        <span>Edit Data Terpilih</span>
                    ) : (
                        <span>Tambah Data Baru</span>
                    )}
                </span>
                
                <button
                    type="button"
                    onClick={onCancelEdit}
                    className="modal-close-btn"
                    title="Tutup Form"
                >
                    <X size={16} />
                </button>
            </h3>
            
            <form
              onSubmit={handleSubmit}
              className="form-container"
              noValidate
            >
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
    
                <div className="form-field">
                    <label
                        htmlFor="jenis-input"
                        className="form-label"
                    >
                        <Type size={12} />
                        Jenis Izin
                    </label>

                    <input
                        id="jenis-input"
                        name="jenis"
                        type="text"
                        placeholder="Cth: Sakit"
                        value={formData.jenis}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
            
                <div className="form-field">
                    <label
                        htmlFor="tanggal-izin-input"
                        className="form-label"
                    >
                        <Calendar size={12} />
                        Tanggal Izin
                    </label>

                    <input
                        id="tanggal-izin-input"
                        name="tanggalIzin"
                        type="date"
                        min={minimumTanggalIzin}
                        value={formData.tanggalIzin}
                        onChange={handleChange}
                        className="form-input-izin"
                    />

                    <p className="form-hint">
                        Paling cepat {minimumTanggalIzinLabel}
                    </p>
                </div>
            
                <div className="form-field">
                    <label
                        htmlFor="tanggal-masuk-input"
                        className="form-label"
                    >
                        <Calendar size={12} />
                        Tanggal Masuk
                    </label>

                    <input
                        id="tanggal-masuk-input"
                        name="tanggalMasuk"
                        type="date"
                        min={formData.tanggalIzin}
                        value={formData.tanggalMasuk}
                        onChange={handleChange}
                        className="form-input-masuk"
                    />
                </div>
        
                {/* Actions */}
                <div className="modal-actions">
                    {editItem ? (
                        <>
                            <button
                                type="submit"
                                id="btn-update-submit"
                                className="modal-btn btn-submit"
                            >
                                <Check size={14} />
                                Simpan
                            </button>

                            <button
                                type="button"
                                id="btn-cancel-edit"
                                onClick={onCancelEdit}
                                className="modal-btn btn-cancel"
                            >
                                <X size={14} />
                                Batal
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                type="submit"
                                id="btn-add-submit"
                                className="modal-btn btn-submit add"
                            >
                                <Plus size={14} />
                                Tambah Data
                            </button>

                            <button
                                type="button"
                                id="btn-cancel-add"
                                onClick={onCancelEdit}
                                className="modal-btn btn-cancel add"
                            >
                                <X size={14} />
                                Batal
                            </button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
}
