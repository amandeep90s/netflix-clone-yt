import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';
import { baseUrlThumbnail } from '../constants/movie';
import { Movie } from '../typings';

interface Props {
	// TODO when using firebase
	// movie: Movie | DocumentData
	movie: Movie;
}

const Thumbnail = ({ movie }: Props) => {
	const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
	const [showModal, setShowModal] = useRecoilState(modalState);

	return (
		<div
			className='relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105'
			onClick={() => {
				setCurrentMovie(movie);
				setShowModal(true);
			}}
		>
			<Image
				src={`${baseUrlThumbnail}${movie.backdrop_path || movie.poster_path}`}
				className='object-cover rounded-sm md:rounded'
				layout='fill'
			/>
		</div>
	);
};

export default Thumbnail;
