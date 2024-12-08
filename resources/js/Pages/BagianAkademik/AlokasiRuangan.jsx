import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout1';
import { Head } from '@inertiajs/react';

function AlokasiRuangan({ programStudiData, ruangKelasData, initialAlokasiData = [] }) {
  const [selectProgram, setSelectedProgram] = useState('');
  const [selectRooms, setSelectedRooms] = useState([]);
  const [selectedGedung, setSelectedGedung] = useState('all');
  const [alokasiData, setAlokasiData] = useState(initialAlokasiData);
  const [editId, setEditId] = useState(null);

  const { data, setData, post, put } = useForm({
    kode_prodi: '',
    ruang_id: [],
  });

  useEffect(() => {
    setData('kode_prodi', selectProgram);
  }, [selectProgram]);

  const filteredRooms = selectedGedung === 'all'
    ? ruangKelasData
    : ruangKelasData.filter((ruang) => ruang.gedung === selectedGedung);

  const handleCheckboxChange = (ruangid, checked) => {
    const updatedRooms = checked
      ? [...selectRooms, ruangid]
      : selectRooms.filter((id) => id !== ruangid);

    setSelectedRooms(updatedRooms);
    setData('ruang_id', updatedRooms);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectProgram) {
      alert('Pilih program studi terlebih dahulu.');
      return;
    }
    if (selectRooms.length === 0) {
      alert('Pilih setidaknya satu ruangan.');
      return;
    }

    setData('kode_prodi', selectProgram);

    if (editId) {
      put(route('bagianakademik.updateAlokasi', editId), {
        onSuccess: ({ props }) => {
          const newAlokasi = props.alokasi_baru || {};
          setAlokasiData((prev) =>
            prev.map((item) => (item.id === editId ? newAlokasi : item))
          );
          resetForm();
          alert('Alokasi berhasil diupdate');
        },
        onError: (error) => {
          console.error('Error saat mengupdate:', error);
          alert('Terjadi kesalahan saat mengupdate alokasi');
        },
      });
    } else {
      post(route('bagianakademik.storeAlokasi'), {
        onSuccess: ({ props }) => {
          const newAlokasi = props.alokasi_baru || {};
          setAlokasiData((prev) => [...prev, newAlokasi]);
          resetForm();
          alert('Alokasi berhasil ditambahkan');
        },
        onError: (error) => {
          console.error('Error saat menambahkan:', error);
          alert('Terjadi kesalahan saat menambahkan alokasi');
        },
      });
    }
  };

  const resetForm = () => {
    setEditId(null);
    setSelectedProgram('');
    setSelectedRooms([]);
    setSelectedGedung('all');
    setData({
      kode_prodi: '',
      ruang_id: [],
    });
  };

  return (
    <AuthenticatedLayout role="Bagian Akademik">
      <Head title="Alokasi Ruangan" />

      <div className="container mx-auto p-6 max-w-7xl">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Alokasi Ruangan</h1>

        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 mb-10">
          {/* Program Studi Select */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Pilih Program Studi</label>
            <select
              onChange={(e) => {
                setSelectedProgram(e.target.value);
                setData('kode_prodi', e.target.value);
              }}
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

          {/* Gedung Select */}
          {selectProgram && (
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Filter Gedung</label>
              <select
                onChange={(e) => setSelectedGedung(e.target.value)}
                value={selectedGedung}
                className="block w-full border-gray-300 rounded-lg p-2"
              >
                <option value="all">Semua Gedung</option>
                {['A', 'B', 'C', 'D', 'E'].map((gedung) => (
                  <option key={gedung} value={gedung}>
                    Gedung {gedung}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Ruang Kelas Table */}
          {selectProgram && (
            <>
              <h2 className="text-lg font-medium text-gray-700 mb-4">Pilih Ruangan</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto bg-white border border-gray-300 shadow-md text-sm">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase leading-normal">
                      <th className="py-2 px-2 border border-gray-300 text-center">Nama Ruangan</th>
                      <th className="py-2 px-2 border border-gray-300 text-center">Gedung</th>
                      <th className="py-2 px-2 border border-gray-300 text-center">Kapasitas</th>
                      <th className="py-2 px-2 border border-gray-300 text-center">Alokasi</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 font-light">
                    {filteredRooms.map((ruang) => (
                      <tr key={ruang.id} className="border-b border-gray-300 hover:bg-gray-50">
                        <td className="py-1 px-2 border border-gray-300 text-center">{ruang.nama_ruang}</td>
                        <td className="py-1 px-2 border border-gray-300 text-center">{ruang.gedung}</td>
                        <td className="py-1 px-2 border border-gray-300 text-center">{ruang.kuota}</td>
                        <td className="py-1 px-2 border border-gray-300 text-center">
                          <input
                            type="checkbox"
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
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            {editId ? 'Update Alokasi' : 'Tambah Alokasi'}
          </button>
        </form>

        {/* Accordion for Alokasi Data */}
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Data Alokasi</h2>
        <div className="accordion">
          {programStudiData.map((studi) => {
            const alokasiForProgram = alokasiData.filter(
              (alokasi) => alokasi.kode_prodi === studi.kode_prodi
            );

            if (alokasiForProgram.length === 0) return null;

            return (
              <div key={studi.kode_prodi} className="mb-4">
                <div className="bg-gray-100 p-4 rounded-t-lg font-semibold text-xl">
                  {studi.nama_prodi}
                </div>
                <div className="bg-white p-4 border border-t-0 border-gray-300 rounded-b-lg">
                  {alokasiForProgram.map((alokasi) => (
                    <div key={alokasi.id} className="mb-4">
                      <div className="flex justify-between items-center">
                        <span>{alokasi.ruang_ids.join(', ')}</span>
                        <button
                          onClick={() => handleAjukan(alokasi.id)}
                          className="bg-yellow-500 text-white py-1 px-2 rounded-md hover:bg-yellow-600"
                        >
                          Ajukan
                        </button>
                      </div>
                      <div>Status: {alokasi.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default AlokasiRuangan;
