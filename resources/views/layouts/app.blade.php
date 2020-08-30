<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>
    
    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
    {{-- <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet"> --}}
    
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>

    <script
    src="https://www.paypal.com/sdk/js?client-id=AcHZpn7A2SH1e9lhTO4K-cecfoQs0FnXi-HnJoqdIQs_JC8iaJKhC5REJMEm1vVpXSTX-KecuCXVPwFO"
  >
    // Required. Replace SB_CLIENT_ID with your sandbox client ID.
  </script>

    {{-- REACT --}}
    <div id="app">
    </div>

    {{-- TESTING --}}
    {{-- <div id="test">
        @yield('content')
    </div> --}}
</body>
</html>
