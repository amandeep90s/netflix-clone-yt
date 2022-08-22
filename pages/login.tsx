import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import useAuth from '../hooks/useAuth';

interface Inputs {
	email: string;
	password: string;
}

const Login = () => {
	const [login, setLogin] = useState(false);
	const { signIn, signUp } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
		console.log(data);
		if (login) {
			await signIn(data.email, data.password);
		} else {
			await signUp(data.email, data.password);
		}
	};

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
				onSubmit={handleSubmit(onSubmit)}
				className='relative px-6 py-10 mt-24 space-y-8 rounded bg-black/75 md:mt-0 md:max-w-md md:px-14'
			>
				<h1 className='text-4xl font-semibold'>Sign In</h1>
				<div className='flex flex-col space-y-4'>
					<label className='inline-block w-full' htmlFor='email'>
						<input
							type='email'
							id='email'
							placeholder='Email'
							className='input'
							autoComplete='off'
							{...register('email', { required: true })}
						/>
						{errors.email && (
							<p className='p-1 text-[13px] font-light text-orange-500'>
								Please enter a valid email.
							</p>
						)}
					</label>
					<label className='inline-block w-full' htmlFor='password'>
						<input
							type='password'
							id='password'
							placeholder='Password'
							className='input'
							autoComplete='off'
							{...register('password', { required: true })}
						/>
						{errors.password && (
							<p className='p-1 text-[13px] font-light text-orange-500'>
								Your password must contain between 4 and 60 characters.
							</p>
						)}
					</label>
				</div>
				<button
					type='submit'
					className='w-full rounded bg-[#e50914] py-3 font-semibold'
					onClick={() => setLogin(true)}
				>
					Sign In
				</button>

				<div className='text-[gray]'>
					New to Netflix?{' '}
					<button
						type='submit'
						className='text-white hover:underline'
						onClick={() => setLogin(false)}
					>
						Sign up now
					</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
