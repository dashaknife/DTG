<!DOCTYPE html>
<html lang="{{ Config::get('app.locale') }}">
	
	<head>
		@include('inc.head')
		@yield('head')

		{{-- @yield('convertor') --}}
		%convertor%
		
	</head>

	<body style="--width: 0;">


		@yield('content')

		
		@yield('javascript')

	</body>
</html>