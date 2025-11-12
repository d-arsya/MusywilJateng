<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>Musyawarah Wilayah Hidayatullah Jateng Bagsel</title>
    <meta name="google-site-verification" content="_gfwvrZhNoRxi_gwxHoCu_q9dLkzPyeBrBGijWTYSh4" />

    <link rel="icon" href="/logo.png" sizes="any">
    <link rel="icon" href="/logo.png" type="image/svg+xml">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="theme-color" content="#009966">
    <!-- Essential Meta Tags -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description"
        content="Sistem Manajemen Munas VI Hidayatullah 2025 - Platform digital untuk pendaftaran peserta, verifikasi pembayaran, manajemen penginapan, jadwal kegiatan, dan presensi real-time.">
    <meta name="keywords"
        content="Munas Hidayatullah, Musyawarah Nasional Hidayatullah,Musyawarah Wilayah Hidayatullah, Hidayatullah 2025, Munas VI, Sistem Manajemen Event Islam">
    <meta name="author" content="Panitia Musyawarah Wilayah VI Hidayatullah DIY - Jateng Bagian Selatan">
    <meta name="robots" content="index, follow">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://muswildiyjatengbagsel.site/">
    <meta property="og:title" content="Musyawarah Wilayah VI Hidayatullah 2025 - Sistem Manajemen Terintegrasi">
    <meta property="og:description"
        content="Platform digital untuk pengelolaan Musyawarah Wilayah VI Hidayatullah dengan fitur lengkap: registrasi, pembayaran, penginapan, jadwal, dan presensi.">
    <meta property="og:image" content="https://muswildiyjatengbagsel.site/assets/img/jumbotron.png">
    <meta property="og:locale" content="id_ID">
    <meta property="og:site_name" content="Musyawarah Wilayah VI Hidayatullah DIY - Jateng Bagian Selatan">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="https://munashidayatullah.id/">
    <meta name="twitter:title" content="Munas VI Hidayatullah 2025">
    <meta name="twitter:description" content="Sistem Manajemen Terintegrasi untuk Musyawarah Wilayah VI Hidayatullah">
    <meta name="twitter:image" content="https://muswildiyjatengbagsel.site/assets/img/jumbotron.png">


    <!-- Canonical URL -->
    <link rel="canonical" href="https://munashidayatullah.id/">
    <link rel="canonical" href="https://www.dpwhidayatullahdiyjatengbagsel.org/">
    <link rel="canonical" href="https://hidayatullah.or.id/">

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.jsx"])
    @inertiaHead
    @csrf
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>
