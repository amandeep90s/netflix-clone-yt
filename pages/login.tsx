import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

const Login = () => {
	const [login, setLogin] = useState(false);

	return (
		<div className='relative flex flex-col w-screen h-screen bg-black md:items-center md:justify-center md:bg-transparent'>
			<Head>
				<title>Netflix Login</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Image
				src='https://rb.gy/p2hphi'
				layout='fill'
				className='-z-10 !hidden opacity-60 sm:!inline'
				objectFit='cover'
			/>

			<img
				src='https://rb.gy/ulxxee'
				className='absolute object-contain cursor-pointer left-4 top-4 md:left-10 md:top-6'
				width={150}
				height={150}
			/>

			<form
				method='post'
				className='relative px-6 py-10 mt-24 space-y-8 rounded bg-black/75 md:mt-0 md:max-w-md md:px-14'
			>
				<h1 className='text-4xl font-semibold'>Sign In</h1>
				<div className='flex flex-col space-y-4'>
					<label className='inline-block w-full' htmlFor='email'>
						<input
							type='email'
							name='email'
							id='email'
							placeholder='Email'
							className='input'
							autoComplete='off'
						/>
					</label>
					<label className='inline-block w-full' htmlFor='password'>
						<input
							type='password'
							name='password'
							id='password'
							placeholder='Password'
							className='input'
							autoComplete='off'
						/>
					</label>
				</div>
				<button
					type='submit'
					className='w-full rounded bg-[#e50914] py-3 font-semibold'
				>
					Sign In
				</button>

				<div className='text-[gray]'>
					New to Netflix?{' '}
					<button className='text-white hover:underline'>Sign up now</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
