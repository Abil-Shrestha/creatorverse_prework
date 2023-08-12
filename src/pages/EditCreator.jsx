import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../client'
import Modal from 'react-modal'
import './Modal.css'

const EditCreator = (creatorData) => {
    const {id} = useParams()
    const [modalIsOpen, setIsOpen] = useState(false)


    function openModal() {
        setIsOpen(true)
    }
    
    function closeModal() {
        setIsOpen(false)
    }
   
    const [creator, setCreator] = useState({})

    useEffect(() => {
        //filter id from creatorData
        const result = creatorData.data.filter(item => String(item.id) === id)
        setCreator(result)
    }, [creatorData, id])


    const handleChange = (event) => {
        const {name, value} = event.target;
        setCreator( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }
    
    const updateCreator = async (event) => {
        event.preventDefault();
        const { error } = await supabase
        .from('creators')
        .update({ name: creator.name, youtube: creator.youtube, twitter: creator.twitter, instagram: creator.instagram,  description: creator.description, image: creator.image})
        .eq('id', id)

        if (error) {
            console.log(error)
        }

        window.location = "/"
    }

    const deleteCreator = async (event) => {
        console.log('deleting')
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
        <section id="form" className="AddEditCreator">
               {creator[0] ? <h3>You are Editing properties for {(creator[0].name)} </h3> : ''}
            <form>
                <label htmlFor="Name">Name </label>
                <input type="text" className="input" name="name" value={creator.name} onChange={handleChange} required placeholder="Type Any Name Here" /><br/>
                <label>
                    Image
                    <p>Provide a link to an image of your creator. Be sure to include the http://</p>
                </label>
                <input type="text"  name="image" value={creator.image} onChange={handleChange} required placeholder="Past Image link here" />
                <label>
                    Description
                    <p>Provide a description of the creator. Who are they? What makes them interesting?</p>
                </label>
                <textarea name="description" rows="3" cols="50"  value={creator.description} onChange={handleChange} required></textarea>

                <h3>Social Media Links</h3>
                <p>Provide at least one of the creator&apos;s social media links.</p>

                <label>
                    <span className="fa-brands fa-youtube"></span> YouTube
                    <p>The creator&apos;s YouTube handle (without the @)</p>
                </label>
                <input type="text"  name="youtube" value ={creator.youtube} onChange={handleChange} />

                <label>
                    <span className="fa-brands fa-twitter"></span> Twitter
                    <p>The creator&apos;s Twitter handle (without the @)</p>
                </label>
                <input type="text" name="twitter" value ={creator.twitter} onChange={handleChange} />

                <label>
                    <span className="fa-brands fa-instagram"></span> Instagram
                    <p>The creator&apos;s Instagram handle (without the @)</p>
                </label>
                <input type="text"  name="instagram" value ={creator.instagram} onChange={handleChange} />

            </form>

            <div className="submit-or-delete">
                <button type="submit" onClick={updateCreator}>Submit</button>
                <button className="delete-button" onClick={openModal}>Delete</button>

            </div>

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

        </section>
    )
}

export default EditCreator