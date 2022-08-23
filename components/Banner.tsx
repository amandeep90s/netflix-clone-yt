import Image from 'next/image';
import { useEffect, useState } from 'react';
import { baseUrl } from '../constants/movie';
import { Movie } from '../typings';
import { FaPlay } from 'react-icons/fa';
import { InformationCircleIcon } from '@heroicons/react/solid';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';

interface Props {
	netflixOriginals: Movie[];
}

const Banner = ({ netflixOriginals }: Props) => {
	const [movie, setMovie] = useState<Movie | null>(null);
	const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
	const [showModal, setShowModal] = useRecoilState(modalState);

	useEffect(() => {
		setMovie(
			netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
		);
	}, [netflixOriginals]);

	return (
		<div className='flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[75vh] lg:justify-end lg:pb-12'>
			<div className='absolute top-0 left-0 right-0 -z-10 h-[95vh]'>
				{(movie?.backdrop_path || movie?.poster_path) && (
					<Image
						src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
						layout='fill'
						objectFit='cover'
						priority
					/>
				)}
			</div>

			<h1 className='text-2xl md:text-3xl lg:text-5xl'>
				{movie?.title || movie?.name || movie?.original_name}
			</h1>
			<p className='max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-4xl lg:text-2xl'>
				{movie?.overview}
			</p>

			<div className='flex space-x-3'>
				<button className='text-black bg-white bannerButton'>
					<FaPlay className='w-4 h-4 text-black md:h-7 md:w-7' /> Play
				</button>
				<button
					className='bannerButton bg-[gray]/70'
					onClick={() => {
						setCurrentMovie(movie);
						setShowModal(true);
					}}
				>
					More Info <InformationCircleIcon className='w-5 h-5 md:h-8 md:w-8' />
				</button>
			</div>
		</div>
	);
};

export default Banner;
