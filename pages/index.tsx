import type {NextPage} from 'next'
import Head from 'next/head'
import Header from "../components/Header";
import Banner from "../components/Banner";

const Home: NextPage = () => {
    return (
        <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
            <Head>
                <title>Netflix Clone App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Header/>
            <main>
                <Banner/>
                <section>
                    {/* Row */}
                    {/* Row */}
                    {/* Row */}
                    {/* Row */}
                    {/* Row */}
                    {/* Row */}
                </section>
            </main>
            {/* Modal */}
        </div>
    )
}

export default Home
