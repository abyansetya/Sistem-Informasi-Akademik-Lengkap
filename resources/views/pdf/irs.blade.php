<!DOCTYPE html>
<html>
<head>
    <title>IRS Semester {{ $semester }}</title>
    <style>
        /* Reset */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        /* Global Styles */
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f7fb;
            color: #333;
            line-height: 1.6;
            padding: 20px;
        }

        h1, p {
            margin-bottom: 20px;
        }

        /* Table Styles */
        table {
            width: 100%;
            border-collapse: collapse;
            background-color: #fff;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-top: 20px;
        }

        th, td {
            padding: 12px;
            text-align: left;
            font-size: 14px;
        }

        th {
            background-color: #4CAF50;
            color: white;
            font-weight: bold;
        }

        td {
            border-bottom: 1px solid #ddd;
        }

        tr:hover {
            background-color: #f5f5f5;
        }

        /* Row styling */
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        /* Dosen Cell */
        td:last-child {
            text-align: left;
        }

        .dosen-name {
            font-weight: normal;
            color: #666;
        }

        /* Section Header */
        .section-header {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #333;
        }

        /* Additional Styling */
        p {
            font-size: 16px;
            color: #333;
        }

        h1 {
            font-size: 24px;
            color: #333;
            font-weight: bold;
        }

        .no-dosen {
            font-style: italic;
            color: #999;
        }

        .container {
            width: full;
        }

        .atas {
            width: full;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .judul {
            font-size: 15px;
        }
        .nama {
            font-size: 15px;
        }
        . {
            font-size: 15px;
        }

     

    </style>
</head>
<body>
    <div class="container">
        <div class="atas">
            <h1 class="judul">ISIAN RENCANA STUDI</h1>
        </div>
        <div class="">
            <p class="nama">Nama: {{ $mahasiswa->Name }}</p>
            <p class="NIM">NIM: {{ $mahasiswa->NIM }}</p>
        </div>

        <div class="section-header">Daftar Mata Kuliah</div>

        <table>
            <thead>
                <tr>
                    <th>Kode MK</th>
                    <th>Mata Kuliah</th>
                    <th>SKS</th>
                    <th>Dosen</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($irs as $item)
                    <tr>
                        <td>{{ $item->jadwal->mataKuliah->kode_mk }}</td>
                        <td>{{ $item->jadwal->mataKuliah->Name }}</td>
                        <td>{{ $item->jadwal->mataKuliah->sks }}</td>
                        <td>
                            @if ($item->jadwal->mataKuliah->dosen->isNotEmpty())
                                {{ $item->jadwal->mataKuliah->dosen->map(function ($dosen) {
                                    return $dosen->dosen->Name;  // Akses nama dosen dari relasi dosen
                                })->implode(', ') }}
                            @else
                                <span class="no-dosen">Tidak ada dosen</span>
                            @endif
                        </td>                    
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</body>
</html>
