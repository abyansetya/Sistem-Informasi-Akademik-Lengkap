import React, {useState} from 'react'
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout1";
import { Head, Link, useForm } from "@inertiajs/react";
import { router } from '@inertiajs/react';

function KelolaProgramStudi({ programStudi }) {
  // State untuk form input
  const {data, setData, post,put,reset} = useForm({
    id: '',
    kode_program_studi: '',
    nama_program_studi: '',
    fakultas: ''
  });

  // Handler untuk form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if(data.id){
      // Update data Program Studi
      put(route('bagianakademik.updateProgramStudi', data.id),{
        onSuccess: () => reset()
      });
    }else{
      // Tambah data Program Studi baru
      post(route('bagianakademik.storeProgramStudi'),{
        onSuccess: () => reset()
      });
    }
  };
// handle untuk mengedit data program studi (memuat data ke form)
  const handleEdit = (programstudi) => {
    setData({
      id: programstudi.id,
      kode_program_studi: programstudi.kode_program_studi,
      nama_program_studi: programstudi.nama_program_studi,
      fakultas: programstudi.fakultas
    });
  };
// handle untuk menghapus program studi
  const handleDelete = (id) => {
    if(confirm('Apakah Anda yakin ingin menghapus program studi ini?')){
      router.delete(route('bagianakademik.destroyProgramStudi',id));
    }
  };

  const handleResetToInsert = () => {
    reset();
  };

  return (
    <AuthenticatedLayout role="Bagian Akademik">
      <Head title='Kelola Program Studi' />

      <div className="container mx-auto p-6 max-w-7xl">
        <h1 className="text-2xl font-bold mb-4">Kelola Program Studi</h1>
        <button 
            type='button' 
            onClick={handleResetToInsert} 
            className='mt-4 mb-4 px-4 py-2 bg-gray-500 text-white rounded'>
            {" "}
            + Tambah Program Studi
          </button>
          {/* Form Input Program Studi Baru */}
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input 
                type="text" 
                placeholder='Kode Program Studi' 
                value={data.kode_program_studi} 
                onChange={(e) =>
                  setData("kode_program_studi",e.target.value)
                }
                className='p-2 border border-gray-300 rounded' 
                required 
              />
              <input 
                type="text" 
                placeholder='Nama Program Studi' 
                value={data.nama_program_studi}
                onChange={(e) =>
                  setData("nama_program_studi",e.target.value)
                } 
                className='p-2 border border-gray-300 rounded' 
                required 
              />
              <input 
                type="text" 
                placeholder='Fakultas Program Studi' 
                value={data.fakultas}
                onChange={(e) =>
                  setData("fakultas",e.target.value)
                } 
                className='p-2 border border-gray-300 rounded' 
                required 
              />
            </div>
            <button 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            type='submit'
            >
            {data.id ? "Update Program Studi" :"Submit Program Studi"}
            </button>
          </form>

          {/* tabel daftar program studi */}
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
              Daftar Program Studi
            </h1>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto bg-white border border-gray-300 shadow-md text-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase leading-normal">
                    <th className="py-2 px-2 border border-gray-300 text-center">
                      ID
                    </th>
                    <th className="py-2 px-2 border border-gray-300 text-center">
                      Kode Program Studi
                    </th>
                    <th className="py-2 px-2 border border-gray-300 text-center">
                      Nama Program Studi
                    </th>
                    <th className="py-2 px-2 border border-gray-300 text-center">
                      Fakultas
                    </th>
                    <th className="py-2 px-2 border border-gray-300 text-center">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 font-light">
                  {programStudi.map((programstudi) =>(
                    <tr
                      key={programstudi.id}
                      className='border-b border-gray-300 hover:bg-gray-50'
                    >
                      <td className="py-1 px-2 border border-gray-300 text-center">
                        {programstudi.id}
                      </td>
                      <td className="py-1 px-2 border border-gray-300 text-center">
                        {programstudi.kode_program_studi}
                      </td>
                      <td className="py-1 px-2 border border-gray-300 text-center">
                        {programstudi.nama_program_studi}
                      </td>
                      <td className="py-1 px-2 border border-gray-300 text-center">
                        {programstudi.fakultas}
                      </td>
                      <td className="py-1 px-2 border border-gray-300 text-center">
                        <button
                        onClick={() =>
                          handleEdit(programstudi)
                        }
                        className='px-2 py-1 bg-yellow-500 text-white rounded mr-2'>
                          Edit
                        </button>
                        <button
                        onClick={() =>
                          handleDelete(programstudi.id)
                        }
                        className='px-2 py-1 bg-red-500 text-white rounded'
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default KelolaProgramStudi