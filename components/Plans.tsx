import { CheckIcon } from '@heroicons/react/outline';
import { Product } from '@stripe/firestore-stripe-payments';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import Table from './Table';
import { loadCheckout } from '../lib/stripe';
import Loader from './Loader';

interface Props {
	products: Product[];
}

const Plans = ({ products }: Props) => {
	const { logout, user } = useAuth();
	const [selectedPlan, setSelectedPlan] = useState<Product | null>(products[2]);
	const [isBillingLoading, setIsBillingLoading] = useState(false);

	const subscribeToPlan = () => {
		if (!user) return;

		loadCheckout(selectedPlan?.prices[0].id!);
		setIsBillingLoading(true);
	};

	return (
		<div>
			<Head>
				<title>Netflix - Plans</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<header className='border-b border-white/10 bg-[#141414]'>
				<Link href='/'>
					<img
						src='https://rb.gy/ulxxee'
						alt='Netflix'
						width={150}
						height={90}
						className='object-contain cursor-pointer'
					/>
				</Link>

				<button
					className='text-lg font-medium hover:underline'
					onClick={logout}
				>
					Sign Out
				</button>
			</header>

			<main className='max-w-5xl px-5 pb-12 mx-auto transition-all pt-28 md:px-10'>
				<h1 className='mb-3 text-3xl font-medium'>
					Choose the plan that's right for you
				</h1>

				<ul>
					<li className='flex items-center text-lg gap-x-2'>
						<CheckIcon className='h-7 w-7 text-[#e50914]' /> Watch all you want.
						Ad-free.
					</li>
					<li className='flex items-center text-lg gap-x-2'>
						<CheckIcon className='h-7 w-7 text-[#e50914]' /> Recommendations
						just for you.
					</li>
					<li className='flex items-center text-lg gap-x-2'>
						<CheckIcon className='h-7 w-7 text-[#e50914]' /> Change or cancel
						your plan anytime.
					</li>
				</ul>

				<div className='flex flex-col mt-4 space-y-4'>
					<div className='flex items-center self-end justify-end w-full md:w-3/5'>
						{products?.map((product) => (
							<div
								key={product.id}
								className={`planBox ${
									selectedPlan?.id === product.id ? 'opacity-100' : 'opacity-60'
								}`}
								onClick={() => setSelectedPlan(product)}
							>
								{product.name}
							</div>
						))}
					</div>

					<Table products={products} selectedPlan={selectedPlan} />
					<button
						disabled={!selectedPlan || isBillingLoading}
						onClick={subscribeToPlan}
						className={`mx-auto w-11/12 rounded bg-[#e50914] py-4 text-xl capitalize shadow hover:bg-[#f6121d] md:w-[420px] ${
							isBillingLoading && 'opacity-60'
						}`}
					>
						{isBillingLoading ? <Loader color='fill-gray-900' /> : 'subscribe'}
					</button>
				</div>
			</main>
		</div>
	);
};

export default Plans;
