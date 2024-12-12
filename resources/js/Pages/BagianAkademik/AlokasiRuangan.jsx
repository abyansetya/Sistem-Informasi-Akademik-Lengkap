import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout1';
import { Head } from '@inertiajs/react';
import Swal from 'sweetalert2';

function AlokasiRuangan({ programStudiData, ruangKelasData }) {
  // State untuk manajemen data
  const [selectProgram, setSelectedProgram] = useState('');
  // const [selectStatus, seSelectedStatus] =useSatae('');
  const [selectRooms, setSelectedRooms] = useState([]);
  const [selectedGedung, setSelectedGedung] = useState('all');
  const [openedAccordion, setOpenedAccordion] = useState(null);
  const [processedProdi, setProcessedProdi] = useState([]);

  // Hook form untuk submit data
  const { data, setData, post, delete: destroy, put } = useForm({
    kode_prodi: '',
    ruang_id: [],
    status: '',
  });

  // Update kode_prodi ketika program studi berubah
  useEffect(() => {
    setData('kode_prodi', selectProgram);
  }, [selectProgram]);

  // Fungsi toggle accordion
  const handleAccordionToggle = (kodeProdi) => {
    setOpenedAccordion((prev) => (prev === kodeProdi ? null : kodeProdi));
  };

  // Filter ruangan berdasarkan gedung
  const filteredRooms = selectedGedung === 'all'
    ? ruangKelasData
    : ruangKelasData.filter((ruang) => ruang.gedung === selectedGedung);

  // Status alokasi ruangan
  const getRuangStatus = (ruang) => {
    return ruang.kode_prodi ? 'Sudah Dialokasikan' : 'Belum Dialokasikan';
  };

  // Handler checkbox ruangan
  const handleCheckboxChange = (ruangid, checked) => {
    const updatedRooms = checked
      ? [...selectRooms, ruangid]
      : selectRooms.filter((id) => id !== ruangid);

    setSelectedRooms(updatedRooms);
    setData('ruang_id', updatedRooms);
  };


  // Submit alokasi ruangan
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectProgram) {
      Swal.fire({
        icon: 'warning',
        title: 'Peringatan',
        text: 'Pilih program studi terlebih dahulu.',
      });
      return;
    }
    if (selectRooms.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Peringatan',
        text: 'Pilih setidaknya satu ruangan.',
      });
      return;
    }

    post(route('bagianakademik.storeAlokasi'), {
      onSuccess: () => {
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Alokasi berhasil ditambahkan.',
        });
        setSelectedRooms([]);
        setSelectedProgram('');
      },
      onError: (error) => {
        console.error('Terjadi kesalahan:', error);
        Swal.fire({
          icon: 'error',
          title: 'Kesalahan',
          text: 'Gagal menambahkan alokasi.',
        });
      },
    });
  };

// Hapus alokasi ruangan
// Hapus alokasi ruangan
const handleDelete = (ruangId, ruangStatus) => {
  if (processedProdi.includes(ruangId)) {
    Swal.fire({
      icon: 'warning',
      title: 'Peringatan',
      text: 'Tidak dapat menghapus alokasi karena sudah diproses.',
    });
    return;
  }

  if (["onprocess", "approved", "rejected"].includes(ruangStatus)) {
    Swal.fire({
      icon: 'warning',
      title: 'Peringatan',
      text: 'Tidak dapat menghapus ruangan dengan status onprocess, approved, atau rejected.',
    });
    return;
  }

  Swal.fire({
    title: 'Konfirmasi',
    text: 'Apakah Anda yakin ingin menghapus alokasi ruangan ini?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Ya, Hapus',
    cancelButtonText: 'Batal',
  }).then((result) => {
    if (result.isConfirmed) {
      destroy(route('bagianakademik.destroyAlokasi', ruangId), {
        onSuccess: () => {
          Swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: 'Alokasi berhasil dihapus.',
          });
        },
        onError: (error) => {
          console.error('Terjadi kesalahan:', error);
          Swal.fire({
            icon: 'error',
            title: 'Kesalahan',
            text: 'Gagal menghapus alokasi.',
          });
        },
      });
    }
  });
};




  const handleAjukanProses = async (kodeProdi) => {
    try {
      if (!kodeProdi) {
        Swal.fire({
          icon: 'warning',
          title: 'Peringatan',
          text: 'Kode Prodi tidak boleh kosong.',
        });
        return;
      }
  
      console.log('Mengirim kodeProdi:', kodeProdi);
  
      // Konfirmasi sebelum melanjutkan proses
      const result = await Swal.fire({
        title: 'Konfirmasi',
        text: `Apakah Anda yakin ingin mengajukan ruangan?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Ya, Lanjutkan',
        cancelButtonText: 'Batal',
      });
  
      if (result.isConfirmed) {
        // Kirim request ke endpoint Laravel
        const response = await axios.post(`/BagianAkademik/updateStatus/${kodeProdi}`);
  
        // Tampilkan pesan sukses jika berhasil
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: response.data.message || 'Status berhasil diubah menjadi "On Process".',
          confirmButtonText: 'OK',
        }).then(() => {
          // Refresh halaman setelah notifikasi
          window.location.reload();
        });
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Dibatalkan',
          text: 'Proses pembaruan status dibatalkan.',
        });
      }
    } catch (error) {
      // Tampilkan pesan error
      console.error('Kesalahan:', error.response || error.message);
      Swal.fire({
        icon: 'error',
        title: 'Kesalahan',
        text: error.response?.data.message || 'Gagal mengubah status. Periksa log server untuk detail lebih lanjut.',
      });
    }
  };

  // Reset status ruangan ke awal
  const handleResetProdi = async (kodeProdi) => {
    try {
      const result = await Swal.fire({
        title: 'Konfirmasi',
        text: `Apakah Anda yakin ingin mereset semua ruangan pada prodi ini?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, Batalkan',
        cancelButtonText: 'Batal',
      });

      if (result.isConfirmed) {
        const response = await axios.post(`/BagianAkademik/resetAlokasiStatus/${kodeProdi}`);

        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: response.data.message || 'Status berhasil direset.',
          confirmButtonText: 'OK',
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      console.error('Kesalahan:', error.response || error.message);
      Swal.fire({
        icon: 'error',
        title: 'Kesalahan',
        text: error.response?.data.message || 'Gagal mereset status. Periksa log server untuk detail lebih lanjut.',
      });
    }
  };

  
  

  // Filter ruangan untuk program studi
  const getAlokasiForProgram = (kodeProdi) => {
    return ruangKelasData.filter((ruang) => ruang.kode_prodi === kodeProdi);
  };

  const isAllOnProcess = (ruangList) => {
    return ruangList.every((ruang) => ruang.status === 'onprocess');
  };

  const isAllApproved = (ruangList) => {
    return ruangList.every((ruang) => ruang.status == 'approved' )
  }

  return (
    <AuthenticatedLayout role="Bagian Akademik">
      <Head title="Alokasi Ruangan" />

      <div className="container mx-auto p-6 max-w-7xl">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Alokasi Ruangan</h1>

        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 mb-10">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Pilih Program Studi</label>
            <select
              onChange={(e) => setSelectedProgram(e.target.value)}
              value={selectProgram || ''}
              className="block w-full border-gray-300 rounded-lg p-2"
            >
              <option value="">Pilih Program Studi</option>
              {programStudiData.map((studi) => (
                <option key={studi.kode_prodi} value={studi.kode_prodi}>
                  {studi.nama_prodi}
                </option>
              ))}
            </select>
          </div>

          {selectProgram && (
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Filter Gedung</label>
              <select
                onChange={(e) => setSelectedGedung(e.target.value)}
                value={selectedGedung}
                className="block w-full border-gray-300 rounded-lg p-2"
              >
                <option value="all">Semua Gedung</option>
                {[...new Set(ruangKelasData.map((ruang) => ruang.gedung))].map((gedung) => (
                  <option key={gedung} value={gedung}>
                    Gedung {gedung}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectProgram && (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase leading-normal">
                    <th className="py-2 px-4 border border-gray-300 text-center">Nama Ruangan</th>
                    <th className="py-2 px-4 border border-gray-300 text-center">Gedung</th>
                    <th className="py-2 px-4 border border-gray-300 text-center">Kapasitas</th>
                    <th className="py-2 px-4 border border-gray-300 text-center">Status</th>
                    <th className="py-2 px-4 border border-gray-300 text-center">Alokasi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRooms.map((ruang) => (
                    <tr key={ruang.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4 border border-gray-300 text-center">{ruang.nama_ruang}</td>
                      <td className="py-2 px-4 border border-gray-300 text-center">{ruang.gedung}</td>
                      <td className="py-2 px-4 border border-gray-300 text-center">{ruang.kuota}</td>
                      <td className="py-2 px-4 border border-gray-300 text-center">{getRuangStatus(ruang)}</td>
                      <td className="py-2 px-4 border border-gray-300 text-center">
                        <input
                          type="checkbox"
                          disabled={ruang.kode_prodi !== null}
                          checked={selectRooms.includes(ruang.id)}
                          onChange={(e) => handleCheckboxChange(ruang.id, e.target.checked)}
                          className="form-checkbox h-5 w-5 text-blue-600"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <button
            type="submit"
            disabled={!selectProgram || selectRooms.length === 0}
            className="w-full mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Tambah Alokasi
          </button>
        </form>

        <div>
          {programStudiData.map((studi) => {
            const alokasiForProgram = getAlokasiForProgram(studi.kode_prodi);
            const isProcessed = processedProdi.includes(studi.kode_prodi);
            const allOnProcess = isAllOnProcess(alokasiForProgram);
            const allOnApproved = isAllApproved(alokasiForProgram);

            return (
              <div key={studi.kode_prodi} className="mb-4 border rounded-lg shadow-md">
                <div className="flex justify-between items-center bg-gray-200 px-4 py-2">
                  <button
                    onClick={() => handleAccordionToggle(studi.kode_prodi)}
                    className="text-left font-semibold hover:bg-gray-300 transition flex-grow"
                  >
                    {studi.nama_prodi} <span className="float-right">({alokasiForProgram.length} Ruangan)</span>
                  </button>
                  {alokasiForProgram.length > 0 && (
                    allOnProcess ? (
                      <button
                        onClick={() => handleResetProdi(studi.kode_prodi)}
                        className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Batalkan
                      </button>
                    ) : allOnApproved ? (
                      <span
                       
                        className="ml-4 bg-cgrey-1 hover:cursor-not-allowed text-white px-3 py-1 rounded transition"
                      >
                        Sudah disetujui
                      </span>
                    ) : (
                      <button
                        onClick={() => handleAjukanProses(studi.kode_prodi)}
                        className="ml-4 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                      >
                        Ajukan
                      </button>
                    )
                  )}
                </div>

                {openedAccordion === studi.kode_prodi && (
                  <div className="bg-white p-4 border border-t-0">
                    {alokasiForProgram.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border border-gray-300 text-sm">
                          <thead>
                            <tr className="bg-gray-100 text-gray-600 uppercase leading-normal">
                              <th className="py-2 px-4 border border-gray-300 text-center">Nama Ruangan</th>
                              <th className="py-2 px-4 border border-gray-300 text-center">Gedung</th>
                              <th className="py-2 px-4 border border-gray-300 text-center">Kapasitas</th>
                              <th className="py-2 px-4 border border-gray-300 text-center">Status</th>
                              <th className="py-2 px-4 border border-gray-300 text-center">Aksi</th>
                            </tr>
                          </thead>
                          <tbody>
                            {alokasiForProgram.map((ruang) => (
                              <tr key={ruang.id} className="border-b hover:bg-gray-50">
                                <td className="py-2 px-4 border border-gray-300 text-center">{ruang.nama_ruang}</td>
                                <td className="py-2 px-4 border border-gray-300 text-center">{ruang.gedung}</td>
                                <td className="py-2 px-4 border border-gray-300 text-center">{ruang.kuota}</td>
                                <td className="py-2 px-4 border border-gray-300 text-center">{ruang.status}</td>
                                <td className="py-2 px-4 border border-gray-300 text-center">
                                  <button
                                    onClick={() => handleDelete(ruang.id, ruang.status)}
                                    disabled={isProcessed}
                                    className={`text-red-500 hover:underline ${isProcessed ? 'opacity-50 cursor-not-allowed' : ''}`}
                                  >
                                    Hapus
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-gray-500">Belum ada ruangan yang dialokasikan untuk program studi ini.</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default AlokasiRuangan;
