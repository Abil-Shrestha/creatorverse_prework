import {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../client'
import { AiFillYoutube, AiFillInstagram, AiFillTwitterCircle } from 'react-icons/ai'
import Modal from 'react-modal'

import './Modal.css'
import './ViewCreator.css'

const ViewCreator = () => {
    const {id} = useParams()
    const [modalIsOpen, setIsOpen] = useState(false)


    function openModal() {
        setIsOpen(true)
    }
    
    function closeModal() {
        setIsOpen(false)
    }

    const goToYouTube = () => {
        window.open("https://www.youtube.com/@" + creator.youtube, "_blank")
    }

    const goToTwitter = () => {
        window.open("https://www.twitter.com/" + creator.twitter, "_blank")
    }

    const goToInstagram = () => {
        window.open("https://www.instagram.com/" + creator.instagram, "_blank")
    }

    const [creator, setCreator] = useState({})

    useEffect(() => {
        console.log(id)
        const fetchCreators = async () => {
            const { data, error } = await supabase
            .from('creators')
            .select('*')
            .eq('id', id);
            if (error) {
              console.log(error)
            }
            setCreator(data[0])
          }
      
        fetchCreators()
        
    }, [])
    

    const deleteCreator = async (event) => {
        event.preventDefault();
        const { error } = await supabase
        .from('creators')
        .delete()
        .eq('id', id) 

        if (error) {
            console.log(error);
        }

        window.location = "/"
    }

    return (
        <div className="">
            <section >
                {creator.image !== undefined ? <img src={creator.image} alt={creator.name} width="300px" style={{ cursor: 'default' }} />:<h3>No Image</h3>}
            </section>

            <section className="creator-info">
                <h2>{creator.name}</h2>
                <p>{creator.description}</p>

                <div className="creator-icons">
                    {creator.youtube !== null && creator.youtube !== '' ? (
                        <button onClick={goToYouTube} className="button-container"><AiFillYoutube color="#FF0000" size = '30px' />@{creator.youtube}</button>
                    ) : "" }

                    {creator.twitter !== null && creator.twitter !== '' ? (
                        <button onClick={goToTwitter} className="button-container"><AiFillTwitterCircle color="#1DA1F2" size = '30px'/>@{creator.twitter}</button>
                    ) : "" }

                    {creator.instagram !== null && creator.instagram !== '' ? (
                        <button  onClick={goToInstagram} className="button-container"><AiFillInstagram color='#F56040'  size = '30px' />@{creator.instagram}</button>
                    ) : "" }
                </div>
            </section>

            <section className="modify-creator">
                <Link to={'/edit/' + creator.id}><button onClick={() => window.scrollTo({top: 600, behavior: 'smooth'})} style={{ paddingleft: 'default' }}>Edit</button></Link>
                <button onClick={openModal} className="delete-button">Delete</button>
            </section>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Delete"
                ariaHideApp={false}
                className="Modal"
                overlayClassName="overlay"
            >
                <div className="modal-content">
                <h2>Are you sure you want to delete {creator.name}???</h2>
                <div className="modal-buttons">
                    <button onClick={closeModal}>NOOOOOOOOOOO! </button>
                    <button onClick={deleteCreator}>YESSSSSSSSSS!</button>
                </div>
                </div>
            </Modal>
            
        </div>
    )
}

export default ViewCreator