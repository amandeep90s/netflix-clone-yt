import Head from 'next/head';
import Header from '../components/Header';
import Banner from '../components/Banner';
import requests from '../utils/requests';
import { Props } from '../typings';
import Row from '../components/Row';
import useAuth from '../hooks/useAuth';
import { useRecoilValue } from 'recoil';
import { modalState } from '../atoms/modalAtom';
import Modal from '../components/Modal';
import Plans from '../components/Plans';
import { getProducts } from '@stripe/firestore-stripe-payments';
import payments from '../lib/stripe';

const Home = ({
	netflixOriginals,
	actionMovies,
	comedyMovies,
	documentaries,
	horrorMovies,
	romanceMovies,
	topRated,
	trendingNow,
	products,
}: Props) => {
	const { loading } = useAuth();
	const showModal = useRecoilValue(modalState);
	const subscription = false;

	if (loading) return 'Loading..';

	if (!subscription) return <Plans products={products} />;

	return (
		<div
			className={`relative h-screen bg-gradient-to-b lg:h-[140vh] ${
				showModal && '!h-screen overflow-hidden'
			}`}
		>
			<Head>
				<title>Netflix Clone App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Header />
			<main className='relative pb-24 pl-4 lg:space-y-24 lg:pl-16'>
				<Banner netflixOriginals={netflixOriginals} />
				<section className='md:space-y-20'>
					<Row title='Trending Now' movies={trendingNow} />
					<Row title='Top Rated' movies={topRated} />
					<Row title='Action  Thrillers' movies={actionMovies} />
					{/* My List */}
					<Row title='Comedies' movies={comedyMovies} />
					<Row title='Scary Movies' movies={horrorMovies} />
					<Row title='Romance Movies' movies={romanceMovies} />
					<Row title='Documentaries' movies={documentaries} />
				</section>
			</main>
			{showModal && <Modal />}
		</div>
	);
};

export default Home;

export const getServerSideProps = async () => {
	const products = await getProducts(payments, {
		activeOnly: true,
		includePrices: true,
	})
		.then((response) => response)
		.catch((err) => console.log(err.message));

	const [
		netflixOriginals,
		trendingNow,
		topRated,
		actionMovies,
		comedyMovies,
		horrorMovies,
		romanceMovies,
		documentaries,
	] = await Promise.all([
		fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
		fetch(requests.fetchTrending).then((res) => res.json()),
		fetch(requests.fetchTopRated).then((res) => res.json()),
		fetch(requests.fetchActionMovies).then((res) => res.json()),
		fetch(requests.fetchComedyMovies).then((res) => res.json()),
		fetch(requests.fetchHorrorMovies).then((res) => res.json()),
		fetch(requests.fetchRomanceMovies).then((res) => res.json()),
		fetch(requests.fetchDocumentaries).then((res) => res.json()),
	]);

	return {
		props: {
			netflixOriginals: netflixOriginals.results,
			trendingNow: trendingNow.results,
			topRated: topRated.results,
			actionMovies: actionMovies.results,
			comedyMovies: comedyMovies.results,
			horrorMovies: horrorMovies.results,
			romanceMovies: romanceMovies.results,
			documentaries: documentaries.results,
			products,
		},
	};
};
