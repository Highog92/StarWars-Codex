import { useQuery } from "@tanstack/react-query"
import { getAllFilms } from "../Queries/GetFilms"
import { request } from 'graphql-request'
import { BarLoader } from 'React-spinners'
import { useState } from "react"
import Modal from 'react-modal'
import spaceBackground from '../Images/star-wars-space-background.jpg'


export function Main() {

    Modal.setAppElement('#root');

    // Modal style
    const customStyles = {
        content: {
            color: '#1A1A1A',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            // marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const [modalIsOpen, setIsOpen] = useState(false);

    const [singleFilmResult, setsingleFilmResult] = useState([])


    function openModal(id) {
        setIsOpen(true);

        let result = data.allFilms.films.filter(item => item.id == id)
        setsingleFilmResult(result)
        console.log(result);
    }

    function closeModal() {
        setIsOpen(false);
    }

    // Modal----------------------------------

    const { data, isLoading, error } = useQuery({
        queryKey: ['getStarWarsFilms'],
        queryFn: async () => request(`https://swapi-graphql.netlify.app/.netlify/functions/index`, getAllFilms)
    })

    console.log(data);

    if (isLoading) return <BarLoader color="#36d7b7" />
    if (error) return <p>Error.... {error.message}</p>

    return (
        <section>
            <h1>Star Wars Codex</h1>
            {data.allFilms.films.map((item, i) => {
                return <button key={i} onClick={() => openModal(item.id)}> {item.title}</button>
            })}

            <Modal isOpen={modalIsOpen} style={customStyles}  >
                <button onClick={closeModal}>Back</button>
                <h2>{singleFilmResult[0]?.title}</h2>
                <p>{singleFilmResult[0]?.releaseDate}</p>
                <p>{singleFilmResult[0]?.director}</p>
                <p>{singleFilmResult[0]?.producers}</p>
                <p>{singleFilmResult[0]?.openingCrawl}</p>
            </Modal>
        </section>
    )
}


