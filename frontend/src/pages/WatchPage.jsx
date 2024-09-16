import { useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ReactPlayer from "react-player"

import { useContentStore } from "../store/content"
import Navbar from "../components/Navbar"
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants"
import { formatReleaseDate } from "../utils/dateFunction"
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton"

const WatchPage = () => {

    const { id } = useParams()

    const [trailers, setTrailers] = useState([])
    const [currentTrailerIndex, setCurrentTrailerIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const [content, setContent] = useState(null)
    const [similarContent, setSimilarContent] = useState([])

    const sliderRef = useRef(null)

    const { contentType } = useContentStore()

    useEffect(() => {
        const getTrailers = async () => {
            try {
                const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`)
                setTrailers(res.data.trailers)
            } catch (error) {
                if (error.response?.status === 404) {
                    setTrailers([])
                }
            }
        }

        const getSimilarContent = async () => {
            try {
                const res = await axios.get(`/api/v1/${contentType}/${id}/similar`)
                setSimilarContent(res.data.similar)
            } catch (error) {
                if (error.response?.status === 404) {
                    setSimilarContent([])
                }
            }
        }

        const getContentDetails = async () => {
            try {
                const res = await axios.get(`/api/v1/${contentType}/${id}/details`)
                setContent(res.data.content)
            } catch (error) {
                if (error.response?.status === 404) {
                    setContent(null)
                }
            } finally {
                setLoading(false)
            }
        }

        window.scrollTo(0, 0)
        Promise.all([getTrailers(), getSimilarContent(), getContentDetails()])
        // getTrailers()
        // getSimilarContent()
        // getContentDetails()

    }, [contentType, id])

    const handlePrevTrailer = () => {
        if (currentTrailerIndex > 0) {
            setCurrentTrailerIndex(prev => prev - 1)
        }
    }
    const handleNextTrailer = () => {
        if (currentTrailerIndex < trailers.length - 1) {
            setCurrentTrailerIndex(prev => prev + 1)
        }
    }

    const scrollLeft = () => {
        if (sliderRef.current)
            sliderRef.current.scrollBy({ left: - sliderRef.current.offsetWidth, behavior: 'smooth' })
    }
    const scrollRight = () => {
        if (sliderRef.current)
            sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: 'smooth' })
    }

    const resetStates = () => {
        setLoading(true)
    }

    // console.log('Trailers:', trailers)
    // console.log('Similar:', similarContent)
    // console.log('Content:', content)

    if (loading) {
        return (
            <div className="min-h-screen bg-black p-10">
                <WatchPageSkeleton />
            </div>
        )
    }

    if (!content) {
        return (
            <div className='bg-black text-white h-screen'>
                <div className='max-w-6xl mx-auto'>
                    <Navbar />
                    <div className='text-center mx-auto px-4 py-8 h-full mt-40'>
                        <h2 className='text-2xl sm:text-5xl font-bold text-balance'>Content not found 😥</h2>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-black min-h-screen text-white ">
            <div className="mx-auto container px-4 py-8 h-full">
                <Navbar />

                {trailers.length > 0 && (
                    <div className="flex justify-between items-center mb-4">
                        <button
                            className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerIndex === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
                            disabled={currentTrailerIndex === 0}
                            onClick={handlePrevTrailer}
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <button
                            className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerIndex === trailers.length - 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                            disabled={currentTrailerIndex === trailers.length - 1}
                            onClick={handleNextTrailer}
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                )}
                <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
                    {trailers.length > 0 ? (
                        <ReactPlayer
                            controls
                            width={'100%'}
                            height={'70vh'}
                            className='mx-auto overflow-hidden rounded-lg'
                            url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIndex].key}`}
                        />
                    ) : (
                        <h2 className="text-xl text-center mt-5">
                            No trailers available for {" "}
                            <span className="font-bold text-red-600">{content?.title || content?.name}</span> 😢
                        </h2>
                    )}
                </div>

                {/* movie details */}

                <div className="flex flex-col md:flex-row items-center justify-center gap-20 max-w-6xl mx-auto">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-5xl font-bold text-balance">{content?.title || content?.name}</h2>
                        <p className="mt-2 text-lg">
                            {formatReleaseDate(content?.release_date || content?.first_air_date)} | {" "}
                            {content?.adult ? (
                                <span className="text-red-600">18+</span>
                            ) : (
                                <span className="text-green-600">PG-13</span>
                            )}{" "}
                        </p>
                        <p className="mt-4 text-lg">{content?.overview}</p>
                    </div>
                    <img
                        src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
                        alt="Poster image"
                        className="max-h-[600px] rounded-md"
                    />
                </div>
                {similarContent.length > 0 && (
                    <div className="mt-12 max-w-5xl mx-auto relative">
                        <h3 className="text-3xl font-bold mb-4">
                            Similar Movies/Tv Shows
                        </h3>
                        <div className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group" ref={sliderRef}>
                            {similarContent.map((content) => {
                                if (!content.poster_path) return null
                                return (
                                    <Link key={content.id} to={`/watch/${content.id}`} onClick={resetStates} className="w-52 flex-none">
                                        <img
                                            src={SMALL_IMG_BASE_URL + content?.poster_path}
                                            alt="Similar content"
                                            className="w-full h-auto rounded-md"
                                        />
                                        <h4 className="text-lg mt-2 font-semibold">{content.title || content.name}</h4>
                                    </Link>
                                )
                            })}

                            <ChevronRight
                                onClick={scrollRight}
                                className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full"
                            />
                            <ChevronLeft
                                onClick={scrollLeft}
                                className="absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default WatchPage