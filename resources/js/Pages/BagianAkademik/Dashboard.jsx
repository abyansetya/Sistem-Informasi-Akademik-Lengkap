import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout1";
import { Head } from "@inertiajs/react";
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    PieChart, 
    Pie, 
    Cell 
  } from 'recharts';

  function Dashboard({ 
    user, 
    roles, 
    dosen, 
    prodiCount, 
    ruanganTotal, 
    ruanganStatus 
  }) {
    // Warna untuk chart
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
    // Persiapan data untuk pie chart status ruangan
    const statusRuanganData = ruanganStatus ? ruanganStatus.map(item => ({
      name: item.status,
      value: item.count
    })) : [];
  
    // Statistik overview
    const overviewData = [
      { name: 'Prodi', value: prodiCount || 0 },
      { name: 'Total Ruangan', value: ruanganTotal || 0 }
    ];
  
    return (
        <AuthenticatedLayout role="Bagian Akademik">
            <Head title="Dashboard" />
            <div className="py-12 bg-gray-50">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Informasi Personal */}
<div className="mt-6 bg-white rounded-xl shadow-md overflow-hidden p-6">
  <h2 className="text-xl font-semibold mb-4 text-gray-800">
    Informasi Personal
  </h2>
  <div className="grid grid-cols-2 gap-4 items-center">
    <div>
      <p className="text-gray-600 mb-2">
        <span className="font-medium">Nama:</span> {dosen?.Name || 'Tidak tersedia'}
      </p>
      <p className="text-gray-600 mb-2">
        <span className="font-medium">Role:</span> {roles || 'Tidak tersedia'}
      </p>
      <p className="text-gray-600">
        <span className="font-medium">NIP:</span> {dosen?.NIP || 'Tidak tersedia'}
      </p>
    </div>
    {dosen && (
      <div className="flex flex-col items-center justify-between">
        <img
          src="../fotoprofil.svg"
          alt="Foto Bagian Akademik"
          className="w-32 h-32 object-cover rounded-full shadow-md"
        />
      </div>
    )}
  </div>
</div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kartu Informasi Overview */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Statistik Overview
            </h2>
            <div className="flex justify-center">
              <BarChart width={400} height={250} data={overviewData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </div>
          </div>

          {/* Kartu Status Ruangan */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Status Ruangan
            </h2>
            <div className="flex justify-center">
              <PieChart width={400} height={250}>
                <Pie
                  data={statusRuanganData}
                  cx={200}
                  cy={125}
                  labelLine={false}
                  outerRadius={80}
                  fill="#3B82F6"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {statusRuanganData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>
        </div>

      </div>
    </div>
        </AuthenticatedLayout>
    );
}

export default Dashboard;