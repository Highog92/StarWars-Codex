import { useQuery } from "@tanstack/react-query"
import { getAllFilms } from "../Queries/GetFilms"
import { request } from 'graphql-request'
import { BarLoader } from 'React-spinners'
import Modal from 'react-modal'
import { useState } from "react"


export function Main() {

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
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
            <h1>Main page</h1>
            {data.allFilms.films.map((item, i) => {
                return <button key={i} onClick={openModal}> {item.title}</button>
            })}
            <Modal isOpen={modalIsOpen}>
                <p>Yo</p>
            </Modal>
        </section>
    )
}
